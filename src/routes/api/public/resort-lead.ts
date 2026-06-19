import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const roomTypeSchema = z.object({
  name: z.string().max(200),
  rooms: z.number().nonnegative(),
  guestsPerRoom: z.number().nonnegative(),
});

const leadSchema = z.object({
  resortName: z.string().trim().min(1).max(200),
  contactName: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(60).optional().default(""),
  occupancy: z.number().min(0).max(100).optional(),
  feePerGuestNight: z.number().min(0).max(1000).optional(),
  totalRooms: z.number().min(0).optional(),
  totalCapacity: z.number().min(0).optional(),
  estimatedAnnualRevenue: z.number().min(0).optional(),
  roomTypes: z.array(roomTypeSchema).max(50).optional().default([]),
});

const NOTIFY_EMAIL = "info@magedge.com";

export const Route = createFileRoute("/api/public/resort-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const lead = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error } = await supabaseAdmin.from("resort_leads").insert({
          resort_name: lead.resortName,
          contact_name: lead.contactName || null,
          email: lead.email,
          phone: lead.phone || null,
          occupancy: lead.occupancy ?? null,
          fee_per_guest_night: lead.feePerGuestNight ?? null,
          total_rooms: lead.totalRooms ?? null,
          total_capacity: lead.totalCapacity ?? null,
          estimated_annual_revenue: lead.estimatedAnnualRevenue ?? null,
          room_types: lead.roomTypes ?? [],
        });

        if (error) {
          console.error("[resort-lead] insert error", error);
          return Response.json({ error: "Could not save lead" }, { status: 500 });
        }

        // Best-effort email notification to the MagEdge team.
        try {
          await sendNotification(lead);
        } catch (e) {
          console.error("[resort-lead] notification failed", e);
          // Do not fail the request — the lead is safely stored.
        }

        return Response.json({ ok: true });
      },
    },
  },
});

async function sendNotification(lead: z.infer<typeof leadSchema>) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.warn("[resort-lead] RESEND_API_KEY not set — skipping email");
    return;
  }

  const fmt = (n?: number) =>
    typeof n === "number"
      ? n.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })
      : "—";

  const rows = (lead.roomTypes ?? [])
    .map(
      (r) =>
        `<tr><td>${escapeHtml(r.name)}</td><td>${r.rooms}</td><td>${r.guestsPerRoom}</td></tr>`,
    )
    .join("");

  const html = `
    <h2>💰 Resort Revenue Lead — MagEdge Pricing Calculator</h2>

    <h3>Lead Details</h3>
    <p><strong>Resort:</strong> ${escapeHtml(lead.resortName)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(lead.contactName || "—")}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "—")}</p>

    <hr/>
    <h3>Calculator Data</h3>
    <p><strong>Occupancy:</strong> ${lead.occupancy ?? "—"}%</p>
    <p><strong>Fee / guest / night:</strong> ${fmt(lead.feePerGuestNight)}</p>
    <p><strong>Total rooms:</strong> ${lead.totalRooms ?? "—"}</p>
    <p><strong>Max guest capacity:</strong> ${lead.totalCapacity ?? "—"}</p>
    <p><strong>Estimated annual revenue:</strong> ${fmt(lead.estimatedAnnualRevenue)}</p>
    ${
      rows
        ? `
    <table border="1" cellpadding="6" cellspacing="0">
      <thead><tr><th>Room type</th><th>Rooms</th><th>Guests/room</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`
        : ""
    }
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "MagEdge Leads <technical@magedge.com>",
      to: [NOTIFY_EMAIL],
      reply_to: lead.email,
      subject: `[Resort Lead] New lead: ${lead.resortName}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
