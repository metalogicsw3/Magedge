import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target,
  Eye,
  HeartHandshake,
  ArrowRight,
  Radio,
  MapPin,
  MonitorSmartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import expertTech from "@/assets/expert-tech.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MagEdge" },
      {
        name: "description",
        content:
          "Born out of NGA911's emergency-response and computer-aided dispatch heritage, MagEdge brings geofencing and a purpose-built operations dashboard to resort water safety.",
      },
      { property: "og:title", content: "About MagEdge" },
      {
        property: "og:description",
        content: "Our NGA911 heritage, our technology, and the team building MagEdge.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Target,
    title: "Less hype, more proof",
    text: "We're transparent about our certification status and pilot results, and we don't overstate what the product does.",
  },
  {
    icon: Eye,
    title: "Built with operators",
    text: "Every feature is shaped by feedback from real aquatics and safety teams in the field.",
  },
  {
    icon: HeartHandshake,
    title: "Safety first",
    text: "MagEdge is a response-assist tool that supports — never replaces — trained supervision.",
  },
];

const tech = [
  {
    icon: Radio,
    title: "911-grade alerting heritage",
    text: "Built on NGA911's emergency-response and computer-aided dispatch experience, applied to the water.",
  },
  {
    icon: MapPin,
    title: "Geofencing",
    text: "Define safety zones across pools, beaches and lagoons. The system flags alerts against the zone where they occur for faster, targeted dispatch.",
  },
  {
    icon: MonitorSmartphone,
    title: "Purpose-built dashboard",
    text: "A single operations dashboard surfaces live alerts, device health, signal status and location — designed for safety teams, not generic IoT consoles.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-ocean-deep pt-36 pb-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              About MagEdge
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/85">
              Emergency-response engineering, applied to the water. We bring geofencing and a
              purpose-built operations dashboard to resort safety teams.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <img
              src={expertTech}
              alt="MagEdge team working on safety technology"
              loading="lazy"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-sm"
            />
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our story</h2>
              <p className="mt-4 text-muted-foreground">
                MagEdge grew out of <strong>NGA911</strong>, a next-generation emergency-response
                and computer-aided dispatch (CAD) company. Building 911-grade alerting and dispatch
                infrastructure, our team kept seeing the same gap: the moment an incident happens in
                or around the water, the people who need to respond often don't know <em>where</em>{" "}
                — fast enough.
              </p>
              <p className="mt-4 text-muted-foreground">
                Resort water environments are noisy, spread out and frequently lack reliable
                cellular coverage. Radios help, but they don't carry a precise, automatic location.
                We set out to close that gap by combining a rugged waterproof wearable, an on-site
                low-power mesh network, and the dispatch thinking we'd built at NGA911.
              </p>
              <p className="mt-4 text-muted-foreground">
                The result is two things we believe are genuinely differentiated: native{" "}
                <strong>geofencing</strong> that maps alerts to the exact zone they happen in, and a{" "}
                <strong>purpose-built operations dashboard</strong> that turns a raw SOS into an
                actionable, trackable response — from trigger to resolution.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              What makes MagEdge different
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {tech.map((t) => (
                <div key={t.title} className="rounded-2xl border bg-card p-6">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                    <t.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">What we value</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border bg-card p-6 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
                  <v.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
            <p className="mt-4 text-muted-foreground">
              Interested in deploying MagEdge at your property? We'd love to hear from you.
            </p>
            <div className="mt-8">
              <Link to="/contact">
                <Button size="lg" className="rounded-full bg-ocean text-white hover:bg-ocean/90">
                  Talk to us <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
