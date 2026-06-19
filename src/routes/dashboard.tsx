import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Navigation,
  Plus,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  BatteryFull,
  MapPin,
  ShieldAlert,
  Zap,
  BellRing,
  Crosshair,
  Send,
  CheckCircle2,
} from "lucide-react";
import sosDeviceAsset from "@/assets/sos-device.png.asset.json";
import lifeguardApp from "@/assets/lifeguard-app.jpg";

const sosDevice = sosDeviceAsset.url;

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard — MagEdge" },
      {
        name: "description",
        content:
          "Live operations dashboard preview: incidents, response agents and wristband devices for a Maldivian resort water-safety deployment.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardPage,
});

type IncidentStatus = "SOS" | "DISPATCHED" | "RESOLVED";

const incidents: {
  status: IncidentStatus;
  deviceId: string;
  lat: string;
  long: string;
  alt: string;
  date: string;
  guest: string;
  zone: string;
}[] = [
  {
    status: "SOS",
    deviceId: "MAG-0481-AD",
    lat: "3.204411",
    long: "73.022419",
    alt: "0.0 m",
    date: "13 Jun, Sat, 2026",
    guest: "Villa 214",
    zone: "House Reef – East",
  },
  {
    status: "SOS",
    deviceId: "MAG-0517-AD",
    lat: "3.205882",
    long: "73.020114",
    alt: "0.0 m",
    date: "13 Jun, Sat, 2026",
    guest: "Villa 109",
    zone: "Lagoon Pool",
  },
  {
    status: "DISPATCHED",
    deviceId: "MAG-0339-AD",
    lat: "3.203117",
    long: "73.024903",
    alt: "0.0 m",
    date: "13 Jun, Sat, 2026",
    guest: "Day Guest",
    zone: "Snorkel Channel",
  },
  {
    status: "RESOLVED",
    deviceId: "MAG-0226-AD",
    lat: "3.206540",
    long: "73.019377",
    alt: "0.0 m",
    date: "13 Jun, Sat, 2026",
    guest: "Villa 052",
    zone: "Main Beach",
  },
];

const agents = [
  { name: "Ahmed Naseem", role: "Lead Lifeguard", online: true },
  { name: "Mariyam Shifa", role: "Pool Marshal", online: true },
  { name: "Ibrahim Faraz", role: "Reef Patrol", online: false },
  { name: "Aishath Leena", role: "Beach Patrol", online: true },
  { name: "Hassan Rasheed", role: "Watersports", online: false },
];

const devices = [
  { id: "MAG-0481", label: "Villa 214", battery: 100, sos: true },
  { id: "MAG-0517", label: "Villa 109", battery: 92, sos: true },
  { id: "MAG-0339", label: "Day Guest", battery: 81, sos: false },
  { id: "MAG-0226", label: "Villa 052", battery: 64, sos: false },
];

const statusStyles: Record<IncidentStatus, { dot: string; text: string }> = {
  SOS: { dot: "bg-orange-500", text: "text-orange-400" },
  DISPATCHED: { dot: "bg-amber-400", text: "text-amber-300" },
  RESOLVED: { dot: "bg-emerald-500", text: "text-emerald-400" },
};

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#12182b] shadow-xl">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-300">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-slate-400">
          {action}
          <button className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
            <RefreshCw className="size-3" />
          </button>
          <button className="grid size-5 place-items-center rounded-full bg-rose-500/15 text-rose-400">
            <X className="size-3" />
          </button>
        </div>
      </header>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm text-slate-200">{value}</p>
    </div>
  );
}

function DashboardPage() {
  const [filters, setFilters] = useState({ sos: true, dispatched: true, resolved: false });

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1322] px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-orange-500 font-black text-white">
            MG
          </div>
          <div>
            <p className="text-sm font-semibold">MagEdge Ops</p>
            <p className="text-[11px] text-slate-400">Resort Operations · Maldives</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/geofence"
            className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/5"
          >
            Geofence zones
          </Link>
          <Link
            to="/"
            className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
          >
            Exit preview
          </Link>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {/* Incidents */}
          <Panel
            title="INCIDENTS"
            action={
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1">
                  <Search className="size-3.5" />
                  <span className="text-[11px] text-slate-400">Find incident…</span>
                </div>
                <SlidersHorizontal className="size-3.5" />
              </div>
            }
          >
            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
              {incidents.map((inc) => {
                const s = statusStyles[inc.status];
                return (
                  <div
                    key={inc.deviceId}
                    className="rounded-lg border border-white/10 bg-[#0d1322] p-3"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${s.text}`}>
                        <span className={`size-2 rounded-full ${s.dot}`} />
                        {inc.status}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Navigation className="size-3" /> Map
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Field label="Device ID" value={inc.deviceId} />
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="Lat" value={inc.lat} />
                        <Field label="Long" value={inc.long} />
                      </div>
                      <Field label="Zone" value={inc.zone} />
                      <Field label="Guest" value={inc.guest} />
                      <Field label="Date" value={inc.date} />
                    </div>
                    <button
                      className={`mt-3 w-full rounded-md border py-2 text-xs font-semibold ${
                        inc.status === "SOS"
                          ? "border-orange-500 text-orange-400 hover:bg-orange-500/10"
                          : "border-white/15 text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {inc.status === "SOS"
                        ? "DISPATCH"
                        : inc.status === "DISPATCHED"
                          ? "TRACK"
                          : "DETAILS"}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="px-4 pb-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 py-2.5 text-xs text-slate-400 hover:bg-white/5">
                <Plus className="size-4" /> ADD NEW
              </button>
            </div>
          </Panel>

          {/* Map */}
          <Panel title="LIVE MAP · SAFE SWIM ZONES">
            <div className="relative h-[420px] overflow-hidden">
              {/* Real Maldives resort satellite map */}
              <iframe
                title="Maldives resort satellite map"
                src="https://www.google.com/maps?q=3.2044,73.0224&t=k&z=17&output=embed"
                className="absolute inset-0 size-full grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* tint so overlays pop */}
              <div className="pointer-events-none absolute inset-0 bg-[#06121d]/20" />

              {/* safe swim geofence (animated) */}
              <div className="pointer-events-none absolute left-[34%] top-[30%] size-44 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 animate-ping rounded-full border border-emerald-400/40" />
                <span className="absolute inset-0 rounded-full border-2 border-emerald-400/80 bg-emerald-400/10 backdrop-blur-[1px]" />
              </div>
              <span className="pointer-events-none absolute left-[34%] top-[16%] -translate-x-1/2 rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                Safe Swim Zone A
              </span>

              {/* no-swim reef geofence */}
              <div className="pointer-events-none absolute right-[16%] bottom-[20%] size-32 rounded-full border-2 border-rose-400/80 bg-rose-500/10 backdrop-blur-[1px]" />
              <span className="pointer-events-none absolute right-[14%] bottom-[15%] rounded bg-rose-500/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                Reef – No Swim
              </span>

              {/* SOS marker (animated) */}
              <div className="pointer-events-none absolute left-[40%] top-[40%] flex flex-col items-center">
                <span className="absolute -top-1 size-10 animate-ping rounded-full bg-orange-500/40" />
                <span className="relative flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
                  <ShieldAlert className="size-3" /> SOS
                </span>
                <MapPin className="relative size-6 -mt-0.5 animate-bounce fill-orange-500 text-orange-500 drop-shadow" />
              </div>

              {/* legend / filters */}
              <div className="absolute bottom-4 left-4 w-52 rounded-lg border border-white/10 bg-[#0d1322]/90 p-3 backdrop-blur">
                <p className="mb-2 text-[10px] font-semibold tracking-widest text-slate-400">
                  FILTERS · BY STATUS
                </p>
                {(["sos", "dispatched", "resolved"] as const).map((k) => (
                  <label
                    key={k}
                    className="flex items-center justify-between py-1 text-xs capitalize text-slate-300"
                  >
                    {k}
                    <button
                      onClick={() => setFilters((f) => ({ ...f, [k]: !f[k] }))}
                      className={`relative h-4 w-8 rounded-full transition ${
                        filters[k] ? "bg-emerald-500" : "bg-white/15"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 size-3 rounded-full bg-white transition-all ${
                          filters[k] ? "left-4" : "left-0.5"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </Panel>

          {/* Dynamic alert flow */}
          <AlertFlow />

          {/* Lifeguard field view */}
          <Panel title="FIELD VIEW · LIFEGUARD APP">
            <div className="grid gap-4 p-4 md:grid-cols-[1fr_1.2fr]">
              <img
                src={lifeguardApp}
                alt="Maldivian resort lifeguard using the MagEdge app showing directions to a swimmer in distress"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-56 w-full rounded-lg object-cover"
              />
              <div className="flex flex-col justify-center gap-3">
                <p className="text-sm text-slate-300">
                  When a guest presses SOS, the nearest patrol receives the alert
                  instantly with turn-by-turn directions across the lagoon to the
                  swimmer's live location.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-lg font-bold text-emerald-400">&lt;5s</p>
                    <p className="text-[10px] text-slate-400">Avg alert relay</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-lg font-bold text-orange-400">±3m</p>
                    <p className="text-[10px] text-slate-400">Location accuracy</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-lg font-bold text-sky-400">24/7</p>
                    <p className="text-[10px] text-slate-400">Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* right column */}
        <div className="space-y-4">
          <Panel title="PATROL AGENTS">
            <div className="p-2">
              <div className="mb-2 flex items-center gap-2 rounded-md bg-white/5 px-2 py-2">
                <Search className="size-3.5 text-slate-400" />
                <span className="text-[11px] text-slate-400">Find agent…</span>
              </div>
              {agents.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-ocean/30 text-xs font-semibold text-ocean">
                    {a.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-200">{a.name}</p>
                    <p className="text-[11px] text-slate-500">{a.role}</p>
                  </div>
                  <span
                    className={`text-[10px] font-medium ${
                      a.online ? "text-emerald-400" : "text-slate-500"
                    }`}
                  >
                    {a.online ? "Online" : "Offline"}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="DEVICES">
            <div className="p-2">
              {devices.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5"
                >
                  <img
                    src={sosDevice}
                    alt="MagEdge SOS wristband"
                    loading="lazy"
                    width={40}
                    height={40}
                    className="size-9 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm text-slate-200">
                      {d.id}
                      {d.sos && (
                        <span className="rounded bg-orange-500/20 px-1.5 text-[9px] font-bold text-orange-400">
                          SOS
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-500">{d.label}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <BatteryFull className="size-3.5 text-emerald-400" />
                    {d.battery}%
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

const flowSteps = [
  {
    icon: Zap,
    title: "SOS Triggered",
    desc: "Guest presses the wristband button in Safe Swim Zone A.",
    accent: "text-orange-400",
    ring: "border-orange-500",
    dot: "bg-orange-500",
  },
  {
    icon: BellRing,
    title: "Alert Relayed",
    desc: "Control room + nearest patrol notified in under 5 seconds.",
    accent: "text-amber-300",
    ring: "border-amber-400",
    dot: "bg-amber-400",
  },
  {
    icon: Crosshair,
    title: "Location Locked",
    desc: "Live position pinned on the map to ±3 m accuracy.",
    accent: "text-sky-400",
    ring: "border-sky-400",
    dot: "bg-sky-400",
  },
  {
    icon: Send,
    title: "Patrol Dispatched",
    desc: "Lifeguard routed turn-by-turn across the lagoon.",
    accent: "text-violet-300",
    ring: "border-violet-400",
    dot: "bg-violet-400",
  },
  {
    icon: CheckCircle2,
    title: "Guest Recovered",
    desc: "Incident resolved and logged automatically.",
    accent: "text-emerald-400",
    ring: "border-emerald-400",
    dot: "bg-emerald-500",
  },
] as const;

function AlertFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % flowSteps.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-[#12182b] shadow-xl">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-300">
          LIVE ALERT FLOW
        </h2>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-orange-400">
          <span className="size-1.5 animate-pulse rounded-full bg-orange-500" />
          Simulating
        </span>
      </header>

      <div className="p-5">
        {/* progress rail */}
        <div className="relative mb-6">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white/10" />
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-orange-500 via-sky-400 to-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${(active / (flowSteps.length - 1)) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {flowSteps.map((s, i) => {
              const Icon = s.icon;
              const done = i <= active;
              const isActive = i === active;
              return (
                <div key={s.title} className="flex flex-col items-center">
                  <div
                    className={`grid size-10 place-items-center rounded-full border-2 bg-[#0d1322] transition-all duration-500 ${
                      done ? `${s.ring} ${s.accent}` : "border-white/15 text-slate-600"
                    } ${isActive ? "scale-125 shadow-lg" : ""}`}
                  >
                    {isActive && (
                      <span className={`absolute size-10 animate-ping rounded-full border ${s.ring} opacity-60`} />
                    )}
                    <Icon className="size-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* active step detail */}
        <div key={active} className="animate-fade-in rounded-lg border border-white/10 bg-[#0d1322] p-4">
          {(() => {
            const s = flowSteps[active];
            const Icon = s.icon;
            return (
              <div className="flex items-start gap-3">
                <span className={`grid size-10 shrink-0 place-items-center rounded-lg border-2 ${s.ring} ${s.accent}`}>
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                    <span className={`size-2 rounded-full ${s.dot}`} />
                    {s.title}
                    <span className="text-[10px] font-normal text-slate-500">
                      Step {active + 1}/{flowSteps.length}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
