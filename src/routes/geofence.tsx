import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Waves, ShieldCheck, Ban, Anchor, Plus, MapPin } from "lucide-react";
import geofenceResort from "@/assets/geofence-resort.jpg";

export const Route = createFileRoute("/geofence")({
  head: () => ({
    meta: [
      { title: "Geofence Zones — MagEdge" },
      {
        name: "description",
        content:
          "Configure safe swim zones, no-swim reef boundaries and watersports areas for a Maldivian resort with MagEdge geofencing.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GeofencePage,
});

type ZoneKind = "safe" | "nosswim" | "watersports";

const zones: {
  id: string;
  name: string;
  kind: ZoneKind;
  depth: string;
  capacity: string;
  bands: number;
}[] = [
  { id: "Z-01", name: "Main Beach Lagoon", kind: "safe", depth: "0.5–1.8 m", capacity: "120 guests", bands: 38 },
  { id: "Z-02", name: "Infinity Pool Deck", kind: "safe", depth: "0.9–1.6 m", capacity: "60 guests", bands: 21 },
  { id: "Z-03", name: "Kids' Shallow Cove", kind: "safe", depth: "0.3–0.8 m", capacity: "40 guests", bands: 14 },
  { id: "Z-04", name: "House Reef Drop-off", kind: "nosswim", depth: "3–18 m", capacity: "Restricted", bands: 0 },
  { id: "Z-05", name: "Boat Channel", kind: "nosswim", depth: "4–9 m", capacity: "No swimming", bands: 0 },
  { id: "Z-06", name: "Snorkel & Dive Zone", kind: "watersports", depth: "2–6 m", capacity: "Supervised", bands: 9 },
];

const kindMeta: Record<
  ZoneKind,
  { label: string; ring: string; chip: string; icon: typeof Waves }
> = {
  safe: { label: "Safe Swim", ring: "border-emerald-400/70 bg-emerald-400/10", chip: "bg-emerald-500/20 text-emerald-400", icon: ShieldCheck },
  nosswim: { label: "No Swim", ring: "border-rose-400/70 bg-rose-500/10", chip: "bg-rose-500/20 text-rose-400", icon: Ban },
  watersports: { label: "Watersports", ring: "border-sky-400/70 bg-sky-400/10", chip: "bg-sky-500/20 text-sky-400", icon: Anchor },
};

function GeofencePage() {
  const [selected, setSelected] = useState(zones[0].id);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1322] px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-orange-500 font-black text-white">
            MG
          </div>
          <div>
            <p className="text-sm font-semibold">Geofence Zones</p>
            <p className="text-[11px] text-slate-400">Kuda Vilingili Resort · Maldives</p>
          </div>
        </div>
        <Link
          to="/dashboard"
          className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/5"
        >
          Back to dashboard
        </Link>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.4fr_1fr]">
        {/* map */}
        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#12182b]">
          <div className="border-b border-white/10 px-4 py-3 text-xs font-semibold tracking-[0.18em] text-slate-300">
            RESORT GEOFENCE MAP
          </div>
          <div className="relative aspect-[4/3]">
            <img
              src={geofenceResort}
              alt="Aerial view of a Maldivian resort island with mapped safe swim zones"
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[#06121d]/30" />
            {/* zone overlays */}
            <div className="absolute left-[14%] top-[30%] size-32 rounded-full border-2 border-emerald-400/80 bg-emerald-400/15" />
            <span className="absolute left-[16%] top-[26%] rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">
              Main Beach Lagoon
            </span>
            <div className="absolute left-[42%] top-[55%] size-20 rounded-full border-2 border-emerald-400/80 bg-emerald-400/15" />
            <span className="absolute left-[42%] top-[51%] rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">
              Kids' Cove
            </span>
            <div className="absolute right-[12%] top-[20%] size-28 rounded-full border-2 border-rose-400/80 bg-rose-500/15" />
            <span className="absolute right-[10%] top-[16%] rounded bg-rose-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">
              Reef – No Swim
            </span>
            <div className="absolute right-[26%] bottom-[16%] size-24 rounded-full border-2 border-sky-400/80 bg-sky-400/15" />
            <span className="absolute right-[24%] bottom-[12%] rounded bg-sky-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">
              Snorkel Zone
            </span>
            <div className="absolute left-[24%] top-[42%]">
              <MapPin className="size-6 fill-orange-500 text-orange-500" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 border-t border-white/10 px-4 py-3 text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-emerald-400" /> Safe swim</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-rose-400" /> No swim / reef</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-sky-400" /> Watersports</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-orange-500" /> Active band</span>
          </div>
        </section>

        {/* zone list */}
        <section className="rounded-xl border border-white/10 bg-[#12182b]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-xs font-semibold tracking-[0.18em] text-slate-300">
              ZONES
            </span>
            <button className="flex items-center gap-1.5 rounded-md bg-orange-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-orange-600">
              <Plus className="size-3.5" /> New zone
            </button>
          </div>
          <div className="space-y-2 p-3">
            {zones.map((z) => {
              const m = kindMeta[z.kind];
              const Icon = m.icon;
              const active = selected === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => setSelected(z.id)}
                  className={`w-full rounded-lg border p-3 text-left transition ${
                    active ? "border-ocean bg-white/5" : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-100">
                      <Icon className="size-4 text-slate-400" />
                      {z.name}
                    </span>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${m.chip}`}>
                      {m.label}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-slate-400">
                    <span>Depth<br /><span className="text-slate-200">{z.depth}</span></span>
                    <span>Capacity<br /><span className="text-slate-200">{z.capacity}</span></span>
                    <span>Active bands<br /><span className="text-slate-200">{z.bands}</span></span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
