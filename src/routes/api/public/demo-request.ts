import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const demoRequestSchema = z.object({
  // Contact
  fullName: z.string().trim().min(1).max(200),
  jobTitle: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  mobile: z.string().trim().min(1).max(60),
  // Resort
  resortName: z.string().trim().min(1).max(200),
  location: z.string().trim().min(1).max(200),
  website: z.string().trim().max(255).optional().default(""),
  resortCategory: z.string().trim().max(60).optional().default(""),
  // Operational
  numRooms: z.number().int().nonnegative().nullable().optional(),
  occupancy: z.number().min(0).max(100).nullable().optional(),
  numPools: z.number().int().nonnegative().nullable().optional(),
  houseReef: z.string().trim().max(10).optional().default(""),
  waterVillas: z.string().trim().max(10).optional().default(""),
  excursions: z.string().trim().max(10).optional().default(""),
  diveCentre: z.string().trim().max(10).optional().default(""),
  // Interest / objectives
  interestIn: z.array(z.string().max(100)).max(10).optional().default([]),
  objectives: z.array(z.string().max(100)).max(20).optional().default([]),
  // Safety
  incidents: z.string().trim().max(60).optional().default(""),
  // Meeting
  demoDate: z.string().trim().max(30).optional().default(""),
  demoMethod: z.string().trim().max(100).optional().default(""),
  // Comments
  comments: z.string().trim().max(5000).optional().default(""),
});

const NOTIFY_EMAIL = "info@magedge.com";

export const Route = createFileRoute("/api/public/demo-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = demoRequestSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const data = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error } = await supabaseAdmin.from("demo_requests").insert({
          full_name: data.fullName,
          job_title: data.jobTitle,
          email: data.email,
          mobile: data.mobile,
          resort_name: data.resortName,
          location: data.location,
          website: data.website || null,
          resort_category: data.resortCategory || null,
          num_rooms: data.numRooms ?? null,
          occupancy: data.occupancy ?? null,
          num_pools: data.numPools ?? null,
          house_reef: data.houseReef || null,
          water_villas: data.waterVillas || null,
          excursions: data.excursions || null,
          dive_centre: data.diveCentre || null,
          interest_in: data.interestIn,
          objectives: data.objectives,
          incidents: data.incidents || null,
          demo_date: data.demoDate || null,
          demo_method: data.demoMethod || null,
          comments: data.comments || null,
        });

        if (error) {
          console.error("[demo-request] insert error", error);
          return Response.json({ error: "Could not save request" }, { status: 500 });
        }

        try {
          await sendNotification(data);
        } catch (e) {
          console.error("[demo-request] notification failed", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});

async function sendNotification(data: z.infer<typeof demoRequestSchema>) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.warn("[demo-request] RESEND_API_KEY not set — skipping email");
    return;
  }

  const yesNo = (v: string) => v || "—";
  const list = (arr: string[]) => (arr.length ? arr.join(", ") : "—");

  const html = `
    <h2>🎯 Demo Request — MagEdge Demonstration Request Form</h2>

    <h3>Contact Information</h3>
    <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
    <p><strong>Job Title:</strong> ${escapeHtml(data.jobTitle)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Mobile / WhatsApp:</strong> ${escapeHtml(data.mobile)}</p>

    <hr/>
    <h3>Resort Information</h3>
    <p><strong>Resort Name:</strong> ${escapeHtml(data.resortName)}</p>
    <p><strong>Island / Location:</strong> ${escapeHtml(data.location)}</p>
    <p><strong>Website:</strong> ${escapeHtml(data.website || "—")}</p>
    <p><strong>Resort Category:</strong> ${escapeHtml(data.resortCategory || "—")}</p>

    <hr/>
    <h3>Operational Details</h3>
    <p><strong>Rooms / Villas:</strong> ${data.numRooms ?? "—"}</p>
    <p><strong>Current Occupancy:</strong> ${data.occupancy != null ? `${data.occupancy}%` : "—"}</p>
    <p><strong>Swimming Pools:</strong> ${data.numPools ?? "—"}</p>
    <p><strong>House Reef:</strong> ${yesNo(data.houseReef)}</p>
    <p><strong>Water Villas:</strong> ${yesNo(data.waterVillas)}</p>
    <p><strong>Excursion Activities:</strong> ${yesNo(data.excursions)}</p>
    <p><strong>Dive Centre:</strong> ${yesNo(data.diveCentre)}</p>

    <hr/>
    <h3>Interest &amp; Objectives</h3>
    <p><strong>Interested In:</strong> ${list(data.interestIn)}</p>
    <p><strong>Primary Objectives:</strong> ${list(data.objectives)}</p>

    <hr/>
    <h3>Safety Assessment</h3>
    <p><strong>Incidents / Rescues (last 24 months):</strong> ${escapeHtml(data.incidents || "—")}</p>

    <hr/>
    <h3>Meeting Request</h3>
    <p><strong>Preferred Date:</strong> ${escapeHtml(data.demoDate || "—")}</p>
    <p><strong>Preferred Method:</strong> ${escapeHtml(data.demoMethod || "—")}</p>

    ${data.comments ? `<hr/><h3>Additional Comments</h3><p><strong>Comments:</strong></p><p>${escapeHtml(data.comments).replace(/\n/g, "<br/>")}</p>` : ""}
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "MagEdge Demo Requests <technical@magedge.com>",
      to: [NOTIFY_EMAIL],
      reply_to: data.email,
      subject: `[Demo Request] ${data.resortName} — ${data.fullName} (${data.demoMethod || "Method TBC"})`,
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
