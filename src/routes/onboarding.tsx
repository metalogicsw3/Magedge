import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ClipboardList,
  Radio,
  FileSignature,
  FlaskConical,
  Wrench,
  GraduationCap,
  Rocket,
  LineChart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Resort Onboarding — MagEdge Deployment Process" },
      {
        name: "description",
        content:
          "From discovery to go-live: MagEdge's structured resort onboarding — qualification, technical survey, contracting, pilot, installation, training and ongoing monitoring.",
      },
      { property: "og:title", content: "MagEdge Resort Onboarding" },
      {
        property: "og:description",
        content:
          "A clear, staged deployment process for resort water-safety. Start with a discovery enquiry.",
      },
    ],
    links: [{ rel: "canonical", href: "/onboarding" }],
  }),
  component: OnboardingPage,
});

const phases = [
  {
    icon: ClipboardList,
    title: "1. Discovery & qualification",
    text: "We capture legal entity details, operational contacts, resort layout and water-risk zones, expected device counts and whether this is a pilot or commercial deployment.",
  },
  {
    icon: Radio,
    title: "2. Technical pre-deployment survey",
    text: "We validate wireless coverage, identify gateway mounting points, confirm power and connectivity, and capture site maps of beach and pool layouts.",
  },
  {
    icon: FileSignature,
    title: "3. Commercial & contract",
    text: "A standard Master Service Agreement plus a customised Order Form, SLA and guest waiver — covering fees, support hours and deployment scope.",
  },
  {
    icon: FlaskConical,
    title: "4. Pilot deployment",
    text: "We validate hardware in real conditions, test SOS and acknowledgement workflows, verify gateway stability and coverage, and refine operating procedures.",
  },
  {
    icon: Wrench,
    title: "5. Installation & setup",
    text: "Gateways are installed and registered, devices are paired and configured with SOS and telemetry parameters, and the cloud environment is provisioned.",
  },
  {
    icon: GraduationCap,
    title: "6. Staff training",
    text: "Operators and responders are trained on the dashboard, alert handling and the guest waiver process before any monitored operation begins.",
  },
  {
    icon: Rocket,
    title: "7. Go-live",
    text: "We activate gateways, validate SOS event handling end to end, confirm dashboard functionality and begin monitored operation.",
  },
  {
    icon: LineChart,
    title: "8. Operational monitoring",
    text: "Ongoing uptime, device battery health and incident-response tracking, with monthly reporting and audit-ready records.",
  },
];

function OnboardingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [deploymentType, setDeploymentType] = useState("Pilot");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/discovery-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resortName: String(data.get("resortName") || ""),
          contactName: String(data.get("contactName") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          location: String(data.get("location") || ""),
          roomCount: data.get("roomCount") ? Number(data.get("roomCount")) : undefined,
          expectedDevices: data.get("expectedDevices")
            ? Number(data.get("expectedDevices"))
            : undefined,
          waterZones: String(data.get("waterZones") || ""),
          networkReadiness: String(data.get("networkReadiness") || ""),
          deploymentType,
          message: String(data.get("message") || ""),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setDeploymentType("Pilot");
      toast.success("Thanks! We'll be in touch to start your discovery.");
    } catch {
      toast.error("Something went wrong. Please email info@magedge.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-ocean-deep pt-36 pb-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Resort onboarding
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/85">
              A clear, staged process — from discovery to go-live and beyond. Every step is
              documented for accountability and a smooth deployment.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20">
          <ol className="space-y-6">
            {phases.map((p, i) => (
              <li key={p.title} className="flex gap-5 rounded-3xl border bg-card p-7 shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                    <p.icon className="size-6" />
                  </span>
                  {i < phases.length - 1 && <span className="mt-2 w-px flex-1 bg-border" />}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{p.title}</h2>
                  <p className="mt-2 text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="discovery" className="bg-muted/40 py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Start a discovery enquiry</h2>
              <p className="mt-4 text-muted-foreground">
                Tell us a little about your property and we'll begin the qualification process. No
                commitment — this just helps us prepare a tailored deployment plan.
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-10 rounded-3xl border bg-card p-8 shadow-sm">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="resortName">Resort name</Label>
                    <Input
                      id="resortName"
                      name="resortName"
                      required
                      placeholder="Resort / property name"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">Your name</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      required
                      placeholder="Full name"
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" placeholder="Optional" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location (island / region / country)</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. North Malé Atoll, Maldives"
                    className="mt-1.5"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="roomCount">Room count</Label>
                    <Input
                      id="roomCount"
                      name="roomCount"
                      type="number"
                      min={0}
                      placeholder="e.g. 120"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedDevices">Expected active devices / day</Label>
                    <Input
                      id="expectedDevices"
                      name="expectedDevices"
                      type="number"
                      min={0}
                      placeholder="e.g. 200"
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="waterZones">Water-risk zones</Label>
                  <Textarea
                    id="waterZones"
                    name="waterZones"
                    rows={2}
                    placeholder="e.g. 3 pools, lagoon beach, kids' splash area"
                    className="mt-1.5"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="networkReadiness">Network & power readiness</Label>
                    <Input
                      id="networkReadiness"
                      name="networkReadiness"
                      placeholder="e.g. reliable Wi-Fi & mains power"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Deployment type</Label>
                    <Select value={deploymentType} onValueChange={setDeploymentType}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pilot">Pilot</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Anything else?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about timelines, goals or specific concerns"
                    className="mt-1.5"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-ocean text-white hover:bg-ocean/90"
                >
                  {submitting ? (
                    "Sending…"
                  ) : (
                    <>
                      Submit discovery enquiry <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
