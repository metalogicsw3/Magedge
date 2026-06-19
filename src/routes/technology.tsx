import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BatteryCharging,
  Droplets,
  Radar,
  BellRing,
  WifiOff,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import dashboard from "@/assets/dashboard.jpg";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology & Specs — MagEdge Wristband" },
      {
        name: "description",
        content:
          "MagEdge technical specifications: battery life, IP68 water resistance, on-site coverage, charging, connectivity, and one-press SOS alerts.",
      },
      { property: "og:title", content: "MagEdge Technology & Specs" },
      { property: "og:description", content: "Battery, water resistance, coverage, charging, connectivity, and alerts." },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: TechnologyPage,
});

const specs = [
  { icon: BatteryCharging, label: "Battery life", value: "Up to 7 days per charge", detail: "Continuous standby with periodic network check-in." },
  { icon: Droplets, label: "Water resistance", value: "IP68, saltwater-tested", detail: "Designed for immersion in pool and ocean conditions." },
  { icon: Radar, label: "Coverage", value: "On-site mesh network", detail: "Site-wide coverage configured per property layout." },
  { icon: BellRing, label: "Alert method", value: "One-press SOS", detail: "Single dedicated button broadcasts to the staff dashboard." },
  { icon: WifiOff, label: "Connectivity", value: "No cellular required", detail: "Operates independently of mobile networks and guest phones." },
  { icon: Clock, label: "Charging", value: "Magnetic dock", detail: "Approximately 2 hours for a full charge; multi-bay docks available." },
];

function TechnologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-ocean-deep py-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Technology &amp; specifications
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/85">
              Engineered for demanding water environments and reliable, around-the-clock resort
              operation.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-6">
                <s.icon className="size-6 text-ocean" />
                <div className="mt-4 text-sm font-semibold text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-lg font-semibold">{s.value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            Specifications are target figures for the current hardware and may vary by deployment,
            site layout, and environmental conditions.
          </p>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">The operations dashboard</h2>
              <p className="mt-4 text-muted-foreground">
                Monitor active alerts, device battery, and signal status from one screen. Configure
                response zones, assign staff, and review response history for continuous improvement.
              </p>
              <Link to="/contact" className="mt-6 inline-block">
                <Button className="rounded-full bg-ocean text-white hover:bg-ocean/90">
                  Request a pilot <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            <div className="overflow-hidden rounded-3xl border bg-card shadow-lg">
              <img
                src={dashboard}
                alt="MagEdge safety operations dashboard"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full object-cover"
              />
              <p className="px-5 py-3 text-xs text-muted-foreground">
                Illustrative dashboard preview — actual interface configured per resort.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
