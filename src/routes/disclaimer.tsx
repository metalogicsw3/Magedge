import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — MagEdge" },
      { name: "description", content: "Important safety disclaimer regarding the use of MagEdge water-safety products." },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: () => (
    <LegalLayout title="Disclaimer" updated="June 13, 2026">
      <h2>Safety disclaimer</h2>
      <p>
        MagEdge provides a water-safety alert system designed to help staff respond more quickly to
        incidents. It is a response-assist tool and is <strong>not</strong> a drowning-prevention
        guarantee, a medical device, or a replacement for lifeguards, active supervision, or proper
        safety protocols.
      </p>

      <h2>No guarantee of outcomes</h2>
      <p>
        No safety technology can prevent all incidents. The effectiveness of MagEdge depends on
        correct deployment, staff training, network conditions, and timely human response. We make
        no warranty that the system will prevent injury or loss of life.
      </p>

      <h2>Performance figures</h2>
      <p>
        Specifications, battery life, coverage, and response figures are estimates for current
        hardware and may vary by site, configuration, and environment.
      </p>

      <h2>Certification status</h2>
      <p>
        ISO 9001 certification is in progress (pending). Any certification or testing claims reflect
        our status at the time of publication.
      </p>

      <h2>Your responsibility</h2>
      <p>
        Operators remain fully responsible for maintaining appropriate supervision, signage,
        staffing, and emergency procedures at their property at all times.
      </p>

      <p>
        Questions? Contact <a href="mailto:info@magedge.com">info@magedge.com</a>.
      </p>
    </LegalLayout>
  ),
});
