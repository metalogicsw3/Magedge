import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import {
  ArrowRight,
  Waves,
  WifiOff,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  BellRing,
  Radar,
  Users,
  BadgeCheck,
  BatteryCharging,
  Droplets,
  Clock,
  Award,
  FlaskConical,
  Search,
  BatteryFull,
  Navigation,
  RefreshCw,
  X,
  ChevronUp,
  ChevronDown,
  Plus,
  SlidersHorizontal,
  Mail,
  Phone,
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import hero from "@/assets/hero-new.jpeg";
import deviceWristband from "@/assets/watch.png";
import deviceGateway from "@/assets/deviceLoraWan.png";
import geofenceResort from "@/assets/geofence-resort.jpg";
import kidBeach from "@/assets/kid-beach.jpg";
import lifeguard from "@/assets/lifeguard.jpg";
import pool from "@/assets/pool.jpg";
import expertTech from "@/assets/expert-tech.jpg";
import expertItem2 from "@/assets/expert item 2.jpeg";
import expertItem3 from "@/assets/expert item 3.jpg";
import expertItem4 from "@/assets/expert item 4.jpg";
import expertItem5 from "@/assets/expert item 5.jpg";
import expertItem6 from "@/assets/expert item 6.jpg";
import faqsImage from "@/assets/FAQs.jpeg";
import slide1 from "@/assets/slide1.jpeg";
import slide2 from "@/assets/slide2.jpeg";
import slide3 from "@/assets/slide3.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MagEdge — Water-Safety Alert Wristband for Resorts" },
      {
        name: "description",
        content:
          "MagEdge is a waterproof water-safety alert wristband. One press sends an SOS with precise location to resort staff — helping teams respond faster at pools, beaches, and water parks.",
      },
      { property: "og:title", content: "MagEdge — Water-Safety Alert Wristband" },
      {
        property: "og:description",
        content:
          "Waterproof SOS wearable with precise location alerts to resort staff. Faster response when every second counts.",
      },
      { property: "og:type", content: "product" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "MagEdge Water-Safety Alert Wristband",
          description:
            "Waterproof SOS wristband that sends precise location alerts to resort staff.",
          brand: { "@type": "Brand", name: "MagEdge" },
        }),
      },
    ],
  }),
  component: Index,
});

function smoothScrollTo(id: string, duration = 1200) {
  const target = document.getElementById(id);
  if (!target) return;
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY - 80;
  const distance = end - start;
  let startTime: number | null = null;

  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function HeroLetters({
  text,
  baseDelay = 0,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  className?: string;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`hero-char inline-block ${className}`}
          style={{
            animationDelay: `${baseDelay + i * 40}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function HeroBadgeWords({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="hero-word inline-block"
          style={{ animationDelay: `${baseDelay + i * 80}ms` }}
        >
          {word}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen w-full overflow-hidden">
      {/* Background — slow Ken Burns zoom */}
      <img
        src={hero}
        alt="Aerial view of a luxury Maldives resort — MagEdge water safety system"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover animate-hero-zoom"
      />
      {/* Overlay — flat 40% black, same as old site */}
      <div className="absolute inset-0 bg-black/20" />

      {/* ── Centred content ── */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white"
        style={{ minHeight: "100svh" }}
      >
        {/* Badge pill — waves icon + label */}
        <div className="animate-hero-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur-sm">
          <Waves className="size-3.5 shrink-0" />
          Water-safety alert wearable
        </div>

        {/* Main headline — per-letter blur-drop */}
        <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
          <HeroLetters
            text="Help your team respond faster when every second counts."
            baseDelay={200}
          />
        </h1>

        {/* Subtitle */}
        <p className="animate-hero-fade-up-delay mb-10 max-w-xl text-base text-white/80 sm:text-lg">
          MagEdge is a waterproof alert wristband. One press sends an SOS with precise location to
          your safety team - built for resort pools, beaches, and water parks.
        </p>

        {/* Two pill CTAs */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-3">
          <Link to="/demo-request">
            <button
              type="button"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-md transition-opacity hover:opacity-90"
            >
              Book a demo
            </button>
          </Link>
          <button
            type="button"
            onClick={() => smoothScrollTo("contact")}
            className="rounded-full border border-white/50 bg-transparent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to sales
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const ref = useReveal();
  const items = [
    { icon: Clock, label: "Faster staff response" },
    { icon: MapPin, label: "Precise location alerts" },
    { icon: WifiOff, label: "Works without cellular" },
    { icon: Droplets, label: "Waterproof & saltwater-tested" },
  ];
  return (
    <section className="border-b bg-muted/40">
      <div
        ref={ref}
        className="reveal-stagger mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-ocean/10 text-ocean">
              <i.icon className="size-5" />
            </span>
            <span className="text-sm font-medium">{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    icon: BellRing,
    title: "1. Trigger",
    text: "A guest or staff member presses the SOS button on the waterproof wristband.",
  },
  {
    icon: Radar,
    title: "2. Alert",
    text: "An instant alert is broadcast to the resort safety network — no cellular required.",
  },
  {
    icon: MapPin,
    title: "3. Locate",
    text: "The guest's approximate location is shown on the staff dashboard in real time.",
  },
  {
    icon: Users,
    title: "4. Respond",
    text: "The nearest staff member is dispatched and the response is tracked to resolution.",
  },
];

function HowItWorks() {
  const headRef = useReveal();
  const gridRef = useReveal();
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-24">
      <div ref={headRef} className="reveal-up mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How MagEdge works</h2>
        <p className="mt-4 text-muted-foreground">
          A simple alert flow that gets the right person to the right place, fast.
        </p>
      </div>
      <div
        ref={gridRef}
        className="reveal-stagger mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4"
      >
        {steps.map((s) => (
          <div key={s.title} className="rounded-3xl border bg-card p-5 shadow-sm md:p-7">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-ocean/10 text-ocean md:size-12">
              <s.icon className="size-5 md:size-6" />
            </span>
            <h3 className="mt-4 text-base font-semibold md:mt-5 md:text-lg">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center"></div>
    </section>
  );
}

function DashboardPreview() {
  const incidents = [
    {
      status: "SOS",
      deviceId: "MAG-0481-AD",
      zone: "House Reef – East",
      guest: "Villa 214",
      color: "text-orange-400",
      dot: "bg-orange-500",
    },
    {
      status: "DISPATCHED",
      deviceId: "MAG-0339-AD",
      zone: "Snorkel Channel",
      guest: "Day Guest",
      color: "text-amber-300",
      dot: "bg-amber-400",
    },
  ];
  const agents = [
    { name: "Ahmed Naseem", role: "Lead Lifeguard", online: true },
    { name: "Mariyam Shifa", role: "Pool Marshal", online: true },
    { name: "Ibrahim Faraz", role: "Reef Patrol", online: false },
  ];
  const devices = [
    { id: "MAG-0481", label: "Villa 214", battery: 100, sos: true },
    { id: "MAG-0517", label: "Villa 109", battery: 92, sos: true },
    { id: "MAG-0339", label: "Day Guest", battery: 81, sos: false },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0e1a] text-slate-100 shadow-2xl">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1322] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="grid size-7 place-items-center rounded-md bg-orange-500 text-[10px] font-black text-white">
            MG
          </div>
          <div>
            <p className="text-xs font-semibold">MagEdge Ops</p>
            <p className="text-[9px] text-slate-400">Resort Operations · Maldives</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[9px] text-slate-300">
            Geofence zones
          </span>
          <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[9px] font-semibold text-white">
            Live
          </span>
        </div>
      </div>

      <div className="grid gap-3 p-3 md:grid-cols-[1fr_180px]">
        <div className="space-y-3">
          {/* Incidents */}
          <section className="rounded-lg border border-white/10 bg-[#12182b]">
            <header className="flex items-center justify-between border-b border-white/10 px-3 py-2">
              <h2 className="text-[9px] font-semibold tracking-[0.18em] text-slate-300">
                INCIDENTS
              </h2>
              <div className="flex items-center gap-1.5 text-slate-400">
                <div className="flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5">
                  <Search className="size-3" />
                  <span className="text-[9px] text-slate-400">Find…</span>
                </div>
                <SlidersHorizontal className="size-3" />
                <RefreshCw className="size-3 text-emerald-400" />
                <X className="size-3 text-rose-400" />
              </div>
            </header>
            <div className="grid gap-2 p-2 sm:grid-cols-2">
              {incidents.map((inc) => (
                <div
                  key={inc.deviceId}
                  className="rounded-md border border-white/10 bg-[#0d1322] p-2"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`flex items-center gap-1 text-[9px] font-semibold ${inc.color}`}
                    >
                      <span className={`size-1.5 rounded-full ${inc.dot}`} />
                      {inc.status}
                    </span>
                    <span className="flex items-center gap-0.5 text-[8px] text-slate-500">
                      <Navigation className="size-2.5" /> Map
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div>
                      <p className="text-[8px] uppercase tracking-wide text-slate-500">Device ID</p>
                      <p className="text-[10px] text-slate-200">{inc.deviceId}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-wide text-slate-500">Zone</p>
                      <p className="text-[10px] text-slate-200">{inc.zone}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-wide text-slate-500">Guest</p>
                      <p className="text-[10px] text-slate-200">{inc.guest}</p>
                    </div>
                  </div>
                  <button
                    className={`mt-2 w-full rounded border py-1 text-[9px] font-semibold ${inc.status === "SOS" ? "border-orange-500 text-orange-400 hover:bg-orange-500/10" : "border-white/15 text-slate-300 hover:bg-white/5"}`}
                  >
                    {inc.status === "SOS" ? "DISPATCH" : "TRACK"}
                  </button>
                </div>
              ))}
            </div>
            <div className="px-2 pb-2">
              <button className="flex w-full items-center justify-center gap-1 rounded border border-dashed border-white/15 py-1.5 text-[9px] text-slate-400 hover:bg-white/5">
                <Plus className="size-3" /> ADD NEW
              </button>
            </div>
          </section>

          {/* Map */}
          <section className="relative h-40 overflow-hidden rounded-lg border border-white/10 bg-[#12182b]">
            <header className="absolute left-0 top-0 z-10 flex w-full items-center justify-between border-b border-white/10 bg-[#12182b]/90 px-3 py-1.5 backdrop-blur">
              <h2 className="text-[9px] font-semibold tracking-[0.18em] text-slate-300">
                LIVE MAP · SAFE SWIM ZONES
              </h2>
            </header>
            <div className="absolute inset-0 bg-[#0d1322]">
              {/* abstract map tiles */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, #1e293b 0%, transparent 50%), radial-gradient(circle at 80% 70%, #1e293b 0%, transparent 40%)",
                }}
              />
              {/* safe swim geofence */}
              <div className="pointer-events-none absolute left-[30%] top-[35%] size-20 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 animate-ping rounded-full border border-emerald-400/40" />
                <span className="absolute inset-0 rounded-full border-2 border-emerald-400/80 bg-emerald-400/10 backdrop-blur-[1px]" />
              </div>
              <span className="pointer-events-none absolute left-[30%] top-[18%] -translate-x-1/2 rounded bg-emerald-500/90 px-1.5 py-0.5 text-[8px] font-semibold text-white">
                Safe Swim Zone A
              </span>
              {/* no-swim reef */}
              <div className="pointer-events-none absolute right-[18%] bottom-[22%] size-14 rounded-full border-2 border-rose-400/80 bg-rose-500/10 backdrop-blur-[1px]" />
              <span className="pointer-events-none absolute right-[14%] bottom-[14%] rounded bg-rose-500/90 px-1.5 py-0.5 text-[8px] font-semibold text-white">
                Reef – No Swim
              </span>
              {/* SOS marker */}
              <div className="pointer-events-none absolute left-[42%] top-[45%] flex flex-col items-center">
                <span className="absolute -top-1 size-6 animate-ping rounded-full bg-orange-500/40" />
                <span className="relative flex items-center gap-0.5 rounded-full bg-orange-500 px-1.5 py-0.5 text-[8px] font-bold text-white shadow-lg">
                  <ShieldAlert className="size-2.5" /> SOS
                </span>
                <MapPin className="relative size-4 -mt-0.5 fill-orange-500 text-orange-500 drop-shadow" />
              </div>
            </div>
          </section>
        </div>

        {/* right column */}
        <div className="space-y-3">
          <section className="rounded-lg border border-white/10 bg-[#12182b]">
            <header className="border-b border-white/10 px-3 py-2">
              <h2 className="text-[9px] font-semibold tracking-[0.18em] text-slate-300">
                PATROL AGENTS
              </h2>
            </header>
            <div className="p-1.5">
              <div className="mb-1.5 flex items-center gap-1 rounded bg-white/5 px-1.5 py-1">
                <Search className="size-2.5 text-slate-400" />
                <span className="text-[8px] text-slate-400">Find agent…</span>
              </div>
              {agents.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-2 rounded-md px-1.5 py-1 hover:bg-white/5"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-ocean/30 text-[9px] font-semibold text-ocean">
                    {a.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] text-slate-200">{a.name}</p>
                    <p className="text-[8px] text-slate-500">{a.role}</p>
                  </div>
                  <span
                    className={`text-[8px] font-medium ${a.online ? "text-emerald-400" : "text-slate-500"}`}
                  >
                    {a.online ? "Online" : "Offline"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-[#12182b]">
            <header className="border-b border-white/10 px-3 py-2">
              <h2 className="text-[9px] font-semibold tracking-[0.18em] text-slate-300">DEVICES</h2>
            </header>
            <div className="p-1.5">
              {devices.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-2 rounded-md px-1.5 py-1 hover:bg-white/5"
                >
                  <div className="size-6 rounded bg-slate-700" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1 text-[10px] text-slate-200">
                      {d.id}
                      {d.sos && (
                        <span className="rounded bg-orange-500/20 px-1 text-[7px] font-bold text-orange-400">
                          SOS
                        </span>
                      )}
                    </p>
                    <p className="text-[8px] text-slate-500">{d.label}</p>
                  </div>
                  <span className="flex items-center gap-0.5 text-[8px] text-slate-400">
                    <BatteryFull className="size-2.5 text-emerald-400" />
                    {d.battery}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DashboardCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", () => {
      setCount(api.scrollSnapList().length);
      onSelect();
    });
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Auto-rotation every 3.5s
  useEffect(() => {
    if (!api) return;
    const timer = setInterval(() => {
      api.scrollNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [api]);

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {/* Slide 1 — live dashboard preview */}
          <CarouselItem>
            <DashboardPreview />
          </CarouselItem>

          {/* Slide 2 */}
          <CarouselItem>
            <img
              src={slide1}
              alt="MagEdge Ops dashboard — incident management and live alerts interface"
              className="w-full rounded-3xl object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </CarouselItem>

          {/* Slide 3 */}
          <CarouselItem>
            <img
              src={slide2}
              alt="MagEdge Ops dashboard — patrol agents and device status overview"
              className="w-full rounded-3xl object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </CarouselItem>

          {/* Slide 4 */}
          <CarouselItem>
            <img
              src={slide3}
              alt="MagEdge Ops dashboard — live map with geofenced safe swim zones and SOS tracking"
              className="w-full rounded-3xl object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </CarouselItem>
        </CarouselContent>

        {/* Left / Right arrows — inside the slider, dim until hovered */}
        <CarouselPrevious className="left-3 opacity-30 transition-opacity duration-200 hover:opacity-100" />
        <CarouselNext className="right-3 opacity-30 transition-opacity duration-200 hover:opacity-100" />
      </Carousel>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                current === i
                  ? "w-6 bg-ocean"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Product() {
  const textRef = useReveal();
  const carouselRef = useReveal();
  return (
    <section className="bg-muted/40 py-14 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:gap-12 lg:grid-cols-2">
        <div ref={textRef} className="reveal-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The devices and the staff dashboard
          </h2>
          <p className="mt-4 text-muted-foreground">
            A rugged, waterproof SOS wristband paired with weatherproof on-site gateways forms an
            on-site mesh network. Your team monitors active alerts, geofence zones, device battery,
            and signal status from a single operations dashboard.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <figure>
              <img
                src={deviceWristband}
                alt="MagEdge waterproof SOS alert wristband worn at a pool"
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-square w-full rounded-2xl object-cover shadow-sm"
              />
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                SOS wristband
              </figcaption>
            </figure>
            <figure>
              <img
                src={deviceGateway}
                alt="MagEdge LoRaWAN gateway installed at a resort rooftop for on-site mesh network coverage"
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-square w-full rounded-2xl object-cover shadow-sm"
              />
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                On-site gateway
              </figcaption>
            </figure>
          </div>
          <Link to="/technology" className="mt-6 inline-block"></Link>
        </div>
        <div ref={carouselRef} className="reveal-up">
          <DashboardCarousel />
        </div>
      </div>
    </section>
  );
}

function Geofencing() {
  const imgRef = useReveal();
  const textRef = useReveal();
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 md:gap-12 md:py-24 lg:grid-cols-2">
      <div ref={imgRef} className="reveal-up overflow-hidden rounded-3xl border bg-card shadow-lg">
        <img
          src={geofenceResort}
          alt="Aerial view of a resort with a geofenced safety zone overlay around the pools and beach"
          loading="lazy"
          width={1280}
          height={800}
          className="w-full object-cover"
        />
        <p className="px-5 py-3 text-xs text-muted-foreground">
          Geofenced safety zones mapped to a resort's pools, beach and lagoon.
        </p>
      </div>
      <div ref={textRef} className="reveal-up">
        <span className="inline-flex items-center gap-2 rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ocean">
          <MapPin className="size-3.5" /> Geofencing
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Know exactly where, the moment it happens
        </h2>
        <p className="mt-4 text-muted-foreground">
          Define custom safety zones across every pool, beach and water area. When an SOS is
          triggered, MagEdge maps it to the exact zone it came from — so dispatch goes to the right
          place, not a guess.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-ocean" /> Zone-aware alerts route to the
            nearest responder for that area.
          </li>
          <li className="flex gap-2">
            <Radar className="mt-0.5 size-4 shrink-0 text-ocean" /> Built on an on-site low-power
            mesh — no cellular dependency.
          </li>
          <li className="flex gap-2">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ocean" /> Inherits NGA911's
            emergency-dispatch heritage.
          </li>
        </ul>
      </div>
    </section>
  );
}

const specs = [
  { icon: BatteryCharging, label: "Battery life", value: "Up to 7 days per charge" },
  { icon: Droplets, label: "Water resistance", value: "IP68, saltwater-tested" },
  { icon: Radar, label: "Coverage", value: "On-site mesh network, no SIM needed" },
  { icon: BellRing, label: "Alert method", value: "One-press SOS to staff dashboard" },
  { icon: WifiOff, label: "Connectivity", value: "Works without cellular coverage" },
  { icon: Clock, label: "Charging", value: "Magnetic dock, ~2 hour full charge" },
];

function Specs() {
  const headRef = useReveal();
  const gridRef = useReveal();
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-24">
      <div ref={headRef} className="reveal-up mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical specifications</h2>
        <p className="mt-4 text-muted-foreground">
          Built for demanding water environments and continuous resort operation.
        </p>
      </div>
      <div ref={gridRef} className="reveal-stagger mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {specs.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-6">
            <s.icon className="size-6 text-ocean" />
            <div className="mt-4 text-sm font-semibold text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-lg font-semibold">{s.value}</div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
        Specifications are target figures for the current hardware and may vary by deployment and
        environment.
      </p>
    </section>
  );
}

const useCases = [
  {
    img: pool,
    title: "Resort pools",
    text: "Multi-pool properties where staff can't watch every area at once.",
  },
  {
    img: hero,
    title: "Hotel beaches",
    text: "Open shorelines and swim zones with changing conditions.",
  },
  {
    img: kidBeach,
    title: "Water parks",
    text: "High-traffic attractions with families and young guests.",
  },
  {
    img: lifeguard,
    title: "Marinas & lakes",
    text: "Docks, open water, and waterfront recreation areas.",
  },
];

function UseCases() {
  const headRef = useReveal();
  const gridRef = useReveal();
  return (
    <section id="use-cases" className="bg-muted/40 py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headRef} className="reveal-up mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Where MagEdge fits</h2>
          <p className="mt-4 text-muted-foreground">
            Focused on supervised water environments where faster response makes a real difference.
          </p>
        </div>
        <div
          ref={gridRef}
          className="reveal-stagger mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-4"
        >
          {useCases.map((u) => (
            <article key={u.title} className="overflow-hidden rounded-3xl border bg-card shadow-sm">
              <img
                src={u.img}
                alt={`MagEdge water safety system deployed at ${u.title.toLowerCase()}`}
                loading="lazy"
                width={400}
                height={250}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-4 md:p-5">
                <h3 className="font-semibold">{u.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{u.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const headRef = useReveal();
  const badgesRef = useReveal();
  const quotesRef = useReveal();
  const badges = [
    {
      icon: FlaskConical,
      title: "ISO 9001 — Pending",
      text: "Quality management certification in progress.",
    },
    {
      icon: Droplets,
      title: "IP68 water-tested",
      text: "Independently bench-tested for saltwater immersion.",
    },
    {
      icon: BadgeCheck,
      title: "Pilot programs",
      text: "Running structured pilots with resort partners.",
    },
    {
      icon: Award,
      title: "Privacy-by-design",
      text: "Location data minimized and access-controlled.",
    },
  ];
  return (
    <section id="trust" className="mx-auto max-w-7xl px-6 py-14 md:py-24">
      <div ref={headRef} className="reveal-up mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built on trust, not hype</h2>
        <p className="mt-4 text-muted-foreground">
          We're transparent about where we are today. Here's our current status on certification and
          validation.
        </p>
      </div>
      <div
        ref={badgesRef}
        className="reveal-stagger mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {badges.map((b) => (
          <div key={b.title} className="rounded-2xl border bg-card p-6 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-ocean/10 text-ocean">
              <b.icon className="size-6" />
            </span>
            <h3 className="mt-4 font-semibold">{b.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [inquiryType, setInquiryType] = useState("Book a demo");
  const detailsRef = useReveal();
  const formRef = useReveal<HTMLFormElement>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/contact-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          company: String(data.get("company") || ""),
          inquiryType,
          message: String(data.get("message") || ""),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setInquiryType("Book a demo");
      toast.success("Thanks! We'll be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please email info@magedge.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:gap-12 md:py-20 lg:grid-cols-2"
    >
      <div ref={detailsRef} className="reveal-up">
        <h2 className="text-2xl font-bold tracking-tight">Contact details</h2>
        <div className="mt-8 space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 size-5 text-ocean" />
            <div>
              <div className="text-sm font-semibold">Email</div>
              <a
                href="mailto:info@magedge.com"
                className="text-muted-foreground hover:text-foreground"
              >
                info@magedge.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 size-5 text-ocean" />
            <div>
              <div className="text-sm font-semibold">Phone</div>
              <a href="tel:+13105551234" className="text-muted-foreground hover:text-foreground">
                +1 (310) 555-1234
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 size-5 text-ocean" />
            <div>
              <div className="text-sm font-semibold">Address</div>
              <p className="text-muted-foreground">
                8383 Wilshire Blvd #800, Beverly Hills, CA 90211, US
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-1 size-5 text-ocean" />
            <div>
              <div className="text-sm font-semibold">Hours</div>
              <p className="text-muted-foreground">Mon–Fri, 9:00am–6:00pm PT</p>
            </div>
          </div>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="reveal-up rounded-3xl border bg-card p-5 shadow-sm md:p-8"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required placeholder="Your name" className="mt-1.5" />
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
            <Label htmlFor="company">Resort / company</Label>
            <Input id="company" name="company" placeholder="Optional" className="mt-1.5" />
          </div>
          <div>
            <Label>What can we help with?</Label>
            <Select value={inquiryType} onValueChange={setInquiryType}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Book a demo">Book a demo</SelectItem>
                <SelectItem value="Request a pilot">Request a pilot</SelectItem>
                <SelectItem value="Talk to sales">Talk to sales</SelectItem>
                <SelectItem value="General inquiry">General inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your property and needs"
              className="mt-1.5"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#020112] text-white hover:bg-[#020112]/80"
          >
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </div>
      </form>
    </section>
  );
}

// function FinalCTA() {
//   const ref = useReveal();
//   return (
//     <section className="relative overflow-hidden">
//       <img src={pool} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
//       <div className="absolute inset-0 bg-ocean-deep/60" />
//       <div
//         ref={ref}
//         className="reveal-up relative z-10 mx-auto max-w-4xl px-6 py-16 text-center text-white md:py-24"
//       >
//         <ShieldCheck className="mx-auto size-10" />
//         <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
//           Bring faster water-safety response to your property
//         </h2>
//         <p className="mx-auto mt-5 max-w-2xl text-white/85">
//           Book a demo, request a pilot, or talk to our team about a deployment tailored to your
//           site.
//         </p>
//       </div>
//     </section>
//   );
// }

const expertiseItems = [
  {
    num: "01",
    img: expertTech,
    subtitle: "Born from NGA911",
    title: "Rooted in 911-Grade Dispatch Heritage",
    text: "MagEdge grew out of NGA911's next-generation emergency-response and computer-aided dispatch expertise — bringing 911-grade alerting, dispatch thinking, and precise location to the water.",
  },
  {
    num: "02",
    img: expertItem2,
    subtitle: "Public Safety Experts",
    title: "Leaders in Public Safety Solutions",
    text: "We specialise in lifesaving technologies that help resorts, coastlines, and adventure destinations protect their guests with confidence.",
  },
  {
    num: "03",
    img: expertItem3,
    subtitle: "Innovative Tech That Saves Lives",
    title: "Innovative Emergency Technology",
    text: "First to market with a wristband that combines precise location and an SOS button — reliable even where cellular networks fail.",
  },
  {
    num: "04",
    img: expertItem4,
    subtitle: "Resort-Proven Reliability",
    title: "Proven in Critical Environments",
    text: "Our waterproof, saltwater-resistant devices are designed for extreme conditions, from seaside resorts to water parks.",
  },
  {
    num: "05",
    img: expertItem5,
    subtitle: "Easy Staff Integration",
    title: "Seamless Resort Integration",
    text: "Simple to deploy, easy for staff to monitor, and fully customisable for different property sizes and safety protocols.",
  },
  {
    num: "06",
    img: expertItem6,
    subtitle: "Saving Lives First",
    title: "Driven by a Life-Saving Mission",
    text: "With thousands of drowning deaths worldwide each year, our focus is on reliable, real-time technology that helps teams respond faster.",
  },
];

function Expertise() {
  const headRef = useReveal();
  const listRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-ocean-deep py-14 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div ref={headRef} className="reveal-up mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our expertise</h2>
          <p className="mt-4 max-w-2xl text-sm text-white/55">
            At MagEdge, we deliver innovative public safety solutions that save lives. Our drowning
            prevention wristband works without cellular networks, ensuring reliable protection at
            resorts, marinas, and water parks. Built for extreme conditions and easy to integrate —
            our mission is helping people when every second counts.
          </p>
        </div>

        {/* Accordion rows */}
        <div ref={listRef} className="reveal-stagger divide-y divide-white/10">
          {expertiseItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.num}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-start gap-5 py-6 text-left md:gap-8"
                >
                  {/* Number */}
                  <span className="mt-2 w-7 shrink-0 text-sm font-semibold text-white/35">
                    {item.num}
                  </span>

                  {/* Thumbnail — grows when open */}
                  <div
                    className={`shrink-0 overflow-hidden rounded-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "w-40 md:w-56 lg:w-64" : "w-24 md:w-36"
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={item.subtitle}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>

                  {/* Text block */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/45">{item.subtitle}</p>

                    {/* Description — appears below subtitle when open */}
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
                      </div>
                    </div>
                  </div>

                  {/* +/× indicator */}
                  <span
                    className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-white/60 bg-white/10" : "border-white/20"
                    }`}
                  >
                    <Plus className="size-3.5 text-white" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What is the MagEdge wristband?",
    a: "The MagEdge wristband is a waterproof, saltwater-resistant drowning prevention device with built-in SOS alerts and precise location tracking. It helps resorts keep guests safe in the water and on property.",
  },
  {
    q: "How does the SOS feature work?",
    a: "When a guest presses the SOS button, the wristband instantly sends their exact location to resort staff or lifeguards via our on-site network — no cellular network required.",
  },
  {
    q: "Is the wristband comfortable for guests to wear?",
    a: "Yes. The MagEdge wristband is lightweight, discreet, and designed for all-day comfort, making it ideal for both adults and children at resorts, beaches, and water parks.",
  },
  {
    q: "Can MagEdge work in areas without cellular coverage?",
    a: "Absolutely. Unlike traditional safety tools, our wristband uses an on-site low-power mesh network, ensuring reliable emergency communication even in remote or open-water environments.",
  },
  {
    q: "How do resorts benefit from using MagEdge?",
    a: "Resorts gain faster emergency response times, reduced liability risks, and stronger reputations for guest safety — all while giving safety teams the precise location data they need to act quickly.",
  },
  {
    q: "Where can MagEdge be used besides sea resorts?",
    a: "In addition to beaches and hotels, MagEdge is ideal for water parks, marinas, cruise lines, and any large property with water areas where staff coverage is stretched.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useReveal();

  return (
    <section className="bg-slate-50 py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Two-column layout: accordions left, image right */}
        <div className="grid gap-12 md:grid-cols-[1fr_380px] md:items-stretch lg:grid-cols-[1fr_440px]">
          {/* Left — heading + accordion */}
          <div ref={sectionRef} className="reveal-up">
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Answers that bring clarity
            </h2>
            <p className="mb-8 text-sm text-foreground/50">
              We've answered the most common questions to help you move forward.
            </p>

            <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden bg-white shadow-sm">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`transition-colors duration-200 ${isOpen ? "bg-slate-50" : "hover:bg-slate-50/60"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-sm font-semibold text-foreground sm:text-base">
                        {faq.q}
                      </span>
                      <span
                        className={`flex size-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-foreground/40 bg-foreground/8"
                            : "border-border"
                        }`}
                      >
                        <Plus className="size-3.5 text-foreground" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — image matches left column height */}
          <div className="hidden overflow-hidden rounded-3xl md:block h-full">
            <img
              src={faqsImage}
              alt="MagEdge water safety in action"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Product />
        <Geofencing />
        <Specs />
        <UseCases />
        <Trust />
        <Expertise />
        <FAQ />
        <ContactSection />
        {/* <FinalCTA /> */}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
