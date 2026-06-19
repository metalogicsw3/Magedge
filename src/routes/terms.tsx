import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — MagEdge" },
      { name: "description", content: "The terms governing your use of the MagEdge website and products." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalLayout title="Terms of Service" updated="June 13, 2026">
      <p>
        These Terms of Service ("Terms") govern your access to and use of the MagEdge website and
        products provided by MagEdge, Inc. By using our site or services, you agree to these Terms.
      </p>

      <h2>Use of the service</h2>
      <p>
        MagEdge provides water-safety alert hardware and software intended to assist trained staff in
        responding to incidents. You agree to use the service in accordance with applicable laws and
        any deployment agreement between us.
      </p>

      <h2>Not a substitute for supervision</h2>
      <p>
        MagEdge is a response-assist tool. It does not replace lifeguards, active supervision, or
        established safety procedures. You remain responsible for the safety practices at your
        property.
      </p>

      <h2>Pilots and demos</h2>
      <p>
        Pilot programs and demonstrations may be subject to additional written terms. Performance
        figures and specifications are estimates and may vary by deployment.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content, trademarks, and technology on this site are owned by MagEdge or its licensors
        and may not be used without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, MagEdge is not liable for indirect, incidental, or
        consequential damages arising from use of the website or services.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use after changes constitutes
        acceptance of the updated Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Contact <a href="mailto:info@magedge.com">info@magedge.com</a>.
      </p>
    </LegalLayout>
  ),
});
