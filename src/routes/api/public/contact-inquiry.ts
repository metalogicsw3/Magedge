import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(60).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  inquiryType: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

const NOTIFY_EMAIL = "info@magedge.com";

export const Route = createFileRoute("/api/public/contact-inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = inquirySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const lead = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { error } = await supabaseAdmin.from("contact_inquiries").insert({
          name: lead.name,
          email: lead.email,
          phone: lead.phone || null,
          company: lead.company || null,
          inquiry_type: lead.inquiryType || null,
          message: lead.message,
        });

        if (error) {
          console.error("[contact-inquiry] insert error", error);
          return Response.json({ error: "Could not save inquiry" }, { status: 500 });
        }

        try {
          await sendNotification(lead);
        } catch (e) {
          console.error("[contact-inquiry] notification failed", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});

async function sendNotification(lead: z.infer<typeof inquirySchema>) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.warn("[contact-inquiry] RESEND_API_KEY not set — skipping email");
    return;
  }

  const html = `
    <h2>📋 Contact Form Submission — MagEdge Website</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "—")}</p>
    <p><strong>Company:</strong> ${escapeHtml(lead.company || "—")}</p>
    <p><strong>Type:</strong> ${escapeHtml(lead.inquiryType || "—")}</p>
    <hr/>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(lead.message).replace(/\n/g, "<br/>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "MagEdge Website <technical@magedge.com>",
      to: [NOTIFY_EMAIL],
      reply_to: lead.email,
      subject: `[Contact Form] New inquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
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
