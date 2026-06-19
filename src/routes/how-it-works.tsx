import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BellRing,
  Radar,
  MapPin,
  Users,
  WifiOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Device360 } from "@/components/Device360";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — MagEdge Water-Safety Alerts" },
      {
        name: "description",
        content:
          "From SOS trigger to staff response: see how the MagEdge wristband alerts your team with precise location, even without cellular coverage.",
      },
      { property: "og:title", content: "How MagEdge Works" },
      {
        property: "og:description",
        content: "Trigger, alert, locate, respond — the MagEdge safety flow.",
      },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const steps = [
  {
    icon: BellRing,
    title: "Trigger the SOS",
    text: "A guest or staff member presses the dedicated SOS button on the waterproof wristband. It's tactile and easy to find, even underwater or in a panic.",
  },
  {
    icon: Radar,
    title: "Alert is broadcast",
    text: "The wristband sends an instant alert across the on-site MagEdge network. No cellular signal, Wi-Fi password, or guest phone is required.",
  },
  {
    icon: MapPin,
    title: "Location appears on the dashboard",
    text: "Your safety team sees the alert and the guest's approximate location on the live operations dashboard in real time.",
  },
  {
    icon: Users,
    title: "Nearest staff responds",
    text: "The closest available responder is dispatched, and the response is tracked from alert to resolution for accountability and review.",
  },
];

/** Reveals children with a fade-up transition when scrolled into view. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-ocean-deep py-24 text-white">
          <div className="absolute -left-24 top-1/2 size-96 -translate-y-1/2 rounded-full bg-ocean/30 blur-3xl" />
          <div className="absolute -right-24 top-0 size-80 rounded-full bg-ocean/20 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <span className="inline-block rounded-full border border-white/25 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                The MagEdge flow
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                How MagEdge works
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-2xl text-white/85">
                A simple, reliable alert flow designed to get the right person to
                the right place, faster — and to support your existing safety
                procedures.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 360 device showcase */}
        <section className="border-b bg-muted/30 py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2">
            <Reveal>
              <Device360 />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-ocean">
                  The device
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                  Built around one button that matters
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Spin the wristband to explore it from every angle. A rugged,
                  waterproof module with a single, unmistakable SOS button —
                  comfortable enough for all-day wear and tough enough for
                  saltwater, sun and sand.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "Waterproof & saltwater-tested housing",
                    "Tactile SOS button, easy to find in a panic",
                    "Soft silicone strap sized for adults and children",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <ShieldCheck className="size-4 shrink-0 text-ocean" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20">
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <li className="group flex gap-5 rounded-3xl border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ocean/40 hover:shadow-lg">
                  <div className="flex flex-col items-center">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ocean/10 text-ocean transition-colors duration-300 group-hover:bg-ocean group-hover:text-white">
                      <s.icon className="size-6" />
                    </span>
                    {i < steps.length - 1 && (
                      <span className="mt-2 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ocean">
                        0{i + 1}
                      </span>
                      <h2 className="text-xl font-semibold">{s.title}</h2>
                    </div>
                    <p className="mt-2 text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border bg-muted/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <WifiOff className="size-6 text-ocean" />
                <h3 className="mt-3 font-semibold">No cellular dependency</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  The on-site network keeps working in areas with poor or no
                  mobile coverage.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-2xl border bg-muted/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <ShieldCheck className="size-6 text-ocean" />
                <h3 className="mt-3 font-semibold">Supports your team</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  MagEdge assists trained staff — it does not replace supervision
                  or lifeguards.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-ocean text-white transition-transform duration-200 hover:scale-105 hover:bg-ocean/90"
                >
                  Book a demo <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
