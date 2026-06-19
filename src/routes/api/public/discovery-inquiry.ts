import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const discoverySchema = z.object({
  resortName: z.string().trim().min(1).max(200),
  contactName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(60).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  roomCount: z.coerce.number().int().min(0).max(100000).optional(),
  expectedDevices: z.coerce.number().int().min(0).max(100000).optional(),
  waterZones: z.string().trim().max(2000).optional().default(""),
  networkReadiness: z.string().trim().max(200).optional().default(""),
  deploymentType: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
});

const NOTIFY_EMAIL = "info@magedge.com";

export const Route = createFileRoute("/api/public/discovery-inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = discoverySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const lead = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error } = await supabaseAdmin.from("discovery_inquiries").insert({
          resort_name: lead.resortName,
          contact_name: lead.contactName,
          email: lead.email,
          phone: lead.phone || null,
          location: lead.location || null,
          room_count: lead.roomCount ?? null,
          expected_devices: lead.expectedDevices ?? null,
          water_zones: lead.waterZones || null,
          network_readiness: lead.networkReadiness || null,
          deployment_type: lead.deploymentType || null,
          message: lead.message || null,
        });

        if (error) {
          console.error("[discovery-inquiry] insert error", error);
          return Response.json({ error: "Could not save inquiry" }, { status: 500 });
        }

        try {
          await sendNotification(lead);
        } catch (e) {
          console.error("[discovery-inquiry] notification failed", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});

async function sendNotification(lead: z.infer<typeof discoverySchema>) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    console.warn("[discovery-inquiry] email not configured — skipping notification");
    return;
  }

  const html = `
    <h2>New resort discovery enquiry</h2>
    <p><strong>Resort:</strong> ${escapeHtml(lead.resortName)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(lead.contactName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "—")}</p>
    <p><strong>Location:</strong> ${escapeHtml(lead.location || "—")}</p>
    <p><strong>Room count:</strong> ${lead.roomCount ?? "—"}</p>
    <p><strong>Expected active devices/day:</strong> ${lead.expectedDevices ?? "—"}</p>
    <p><strong>Water-risk zones:</strong> ${escapeHtml(lead.waterZones || "—")}</p>
    <p><strong>Network/power readiness:</strong> ${escapeHtml(lead.networkReadiness || "—")}</p>
    <p><strong>Deployment type:</strong> ${escapeHtml(lead.deploymentType || "—")}</p>
    <hr/>
    <p>${escapeHtml(lead.message || "—").replace(/\n/g, "<br/>")}</p>
  `;

  const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: "MagEdge Website <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      reply_to: lead.email,
      subject: `Discovery enquiry: ${lead.resortName}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend gateway ${res.status}: ${text}`);
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
