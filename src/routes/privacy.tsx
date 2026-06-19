import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MagEdge" },
      { name: "description", content: "How MagEdge collects, uses, and protects personal and location data." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalLayout title="Privacy Policy" updated="June 13, 2026">
      <p>
        This Privacy Policy explains how MagEdge, Inc. ("MagEdge", "we", "us") collects, uses, and
        protects information when you use our website and water-safety alert products.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact details you submit through our forms (name, email, phone, company).</li>
        <li>Operational data from deployed devices, such as alert events and approximate device location, used to deliver the safety service.</li>
        <li>Standard website analytics and technical data (e.g. browser type, pages visited).</li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries, demos, and pilot requests.</li>
        <li>To operate, secure, and improve the MagEdge alert service.</li>
        <li>To communicate important updates about products you use.</li>
      </ul>

      <h2>Location data</h2>
      <p>
        MagEdge is designed around data minimization. Device location is processed to enable
        emergency response and is access-controlled to authorized resort staff. We do not sell
        personal or location data.
      </p>

      <h2>Data sharing</h2>
      <p>
        We share data only with service providers who help us operate (e.g. hosting and email
        delivery) under appropriate confidentiality obligations, or when required by law.
      </p>

      <h2>Data retention &amp; security</h2>
      <p>
        We retain information only as long as needed for the purposes above and apply reasonable
        technical and organizational safeguards to protect it.
      </p>

      <h2>Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by
        contacting us at <a href="mailto:info@magedge.com">info@magedge.com</a>.
      </p>

      <h2>Contact</h2>
      <p>
        MagEdge, Inc., 8383 Wilshire Blvd #800, Beverly Hills, CA 90211, US —{" "}
        <a href="mailto:info@magedge.com">info@magedge.com</a>.
      </p>
    </LegalLayout>
  ),
});
