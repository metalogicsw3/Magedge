import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Waves, Plus, Trash2, TrendingUp, Info, Sparkles, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import magedgeLogo from "@/assets/magedge-logo.png";

export const Route = createFileRoute("/resort-revenue")({
  head: () => ({
    meta: [
      { title: "Resort Revenue Calculator — MagEdge Partner Program" },
      {
        name: "description",
        content:
          "Estimate the monthly and annual revenue your resort could generate with MagEdge SOS wristbands. Private partner calculator.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResortRevenuePage,
});

type RoomType = {
  id: string;
  name: string;
  rooms: number;
  guestsPerRoom: number;
};

const currency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="ml-1.5 inline-flex text-muted-foreground hover:text-ocean transition-colors"
          aria-label="More info"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">{text}</TooltipContent>
    </Tooltip>
  );
}

function ResortRevenuePage() {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([
    { id: "1", name: "Standard Room", rooms: 80, guestsPerRoom: 2 },
    { id: "2", name: "Family Room", rooms: 20, guestsPerRoom: 4 },
  ]);
  const [occupancy, setOccupancy] = useState(70);
  const [feePerGuestNight, setFeePerGuestNight] = useState(3.5);

  const [resortName, setResortName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateRoom = (id: string, patch: Partial<RoomType>) =>
    setRoomTypes((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addRoom = () =>
    setRoomTypes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "New Room Type",
        rooms: 10,
        guestsPerRoom: 2,
      },
    ]);

  const removeRoom = (id: string) => setRoomTypes((prev) => prev.filter((r) => r.id !== id));

  const stats = useMemo(() => {
    const totalRooms = roomTypes.reduce((s, r) => s + (r.rooms || 0), 0);
    const totalCapacity = roomTypes.reduce(
      (s, r) => s + (r.rooms || 0) * (r.guestsPerRoom || 0),
      0,
    );
    // Occupied guests per night, with adoption rate of wristbands
    const occupiedGuests = totalCapacity * (occupancy / 100);
    const activeGuests = occupiedGuests;
    const revenuePerNight = activeGuests * feePerGuestNight;
    const revenuePerMonth = revenuePerNight * 30.4;
    const revenuePerYear = revenuePerNight * 365;
    return {
      totalRooms,
      totalCapacity,
      occupiedGuests,
      activeGuests,
      revenuePerNight,
      revenuePerMonth,
      revenuePerYear,
    };
  }, [roomTypes, occupancy, feePerGuestNight]);

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resortName.trim() || !email.trim()) {
      toast.error("Please add your resort name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/public/resort-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resortName,
          contactName,
          email,
          phone: countryCode + phone,
          occupancy,
          feePerGuestNight,
          totalRooms: stats.totalRooms,
          totalCapacity: Math.round(stats.totalCapacity),
          estimatedAnnualRevenue: Math.round(stats.revenuePerYear),
          roomTypes: roomTypes.map((r) => ({
            name: r.name,
            rooms: r.rooms,
            guestsPerRoom: r.guestsPerRoom,
          })),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      toast.success("Thanks! Your personalised estimate is on its way.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-gradient-to-b from-secondary/40 to-background">
        <Toaster richColors position="top-center" />

        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-4">
            <a href="/">
              <img src={magedgeLogo} alt="MagEdge" className="h-7 w-auto" />
            </a>
            <span className="ml-2 rounded-full bg-ocean/10 px-2.5 py-0.5 text-xs font-medium text-ocean">
              Partner Revenue Estimator
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-10">
          {/* Hero */}
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-ocean/10 px-3 py-1 text-xs font-medium text-ocean">
              <Sparkles className="h-3.5 w-3.5" /> A new revenue stream for your resort
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See what guest safety could earn you
            </h1>
            <p className="mt-3 text-muted-foreground">
              MagEdge is a fully managed safety-as-a-service. You charge a small wristband fee per
              guest, per night — we handle the devices, gateways, monitoring and support. Enter your
              details below to unlock your personalised revenue estimate.
            </p>
          </div>

          {/* Lead capture — gate before calculator */}
          <div className="mx-auto max-w-xl mb-10">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-ocean" /> Unlock your estimate
                </CardTitle>
                <CardDescription>
                  We'll send a tailored proposal and book a quick demo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center gap-2 py-4 text-center">
                    <CheckCircle2 className="h-10 w-10 text-ocean" />
                    <p className="font-medium">You're all set!</p>
                    <p className="text-sm text-muted-foreground">
                      Our partnerships team will reach out to {contactName || "you"} shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <Label className="text-xs">Resort name *</Label>
                      <Input
                        value={resortName}
                        onChange={(e) => setResortName(e.target.value)}
                        placeholder="Blue Lagoon Resort"
                        maxLength={120}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Contact name</Label>
                      <Input
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Jane Smith"
                        maxLength={120}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Email *</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@resort.com"
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Phone</Label>
                      <div className="mt-1 flex">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="rounded-l-md rounded-r-none border border-r-0 bg-background px-2 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+960">🇲🇻 +960</option>
                          <option value="+66">🇹🇭 +66</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+39">🇮🇹 +39</option>
                          <option value="+34">🇪🇸 +34</option>
                          <option value="+31">🇳🇱 +31</option>
                          <option value="+41">🇨🇭 +41</option>
                          <option value="+7">🇷🇺 +7</option>
                          <option value="+86">🇨🇳 +86</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+82">🇰🇷 +82</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+92">🇵🇰 +92</option>
                          <option value="+94">🇱🇰 +94</option>
                          <option value="+62">🇮🇩 +62</option>
                          <option value="+60">🇲🇾 +60</option>
                          <option value="+63">🇵🇭 +63</option>
                          <option value="+20">🇪🇬 +20</option>
                          <option value="+27">🇿🇦 +27</option>
                          <option value="+55">🇧🇷 +55</option>
                          <option value="+52">🇲🇽 +52</option>
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+973">🇧🇭 +973</option>
                          <option value="+968">🇴🇲 +968</option>
                          <option value="+965">🇰🇼 +965</option>
                        </select>
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="555 123 4567"
                          maxLength={20}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-[#020112] text-white hover:bg-[#020112]/80"
                    >
                      {sending ? "Sending…" : "Unlock my revenue estimate"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Calculator — only shown after submission */}
          {submitted && (
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Inputs */}
              <div className="space-y-6 lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your rooms</CardTitle>
                    <CardDescription>
                      Split by room type so family rooms with more guests are counted correctly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {roomTypes.map((r) => (
                      <div
                        key={r.id}
                        className="grid grid-cols-12 items-end gap-3 rounded-lg border bg-card p-3"
                      >
                        <div className="col-span-12 sm:col-span-5">
                          <Label className="text-xs">Room type</Label>
                          <Input
                            value={r.name}
                            onChange={(e) => updateRoom(r.id, { name: e.target.value })}
                          />
                        </div>
                        <div className="col-span-5 sm:col-span-3">
                          <Label className="text-xs"># Rooms</Label>
                          <Input
                            type="number"
                            min={0}
                            value={r.rooms}
                            onChange={(e) =>
                              updateRoom(r.id, {
                                rooms: Math.max(0, +e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="col-span-5 sm:col-span-3">
                          <Label className="text-xs">
                            Guests/room
                            <InfoTip text="Average number of guests staying in this room type — family rooms are usually 4–6." />
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            value={r.guestsPerRoom}
                            onChange={(e) =>
                              updateRoom(r.id, {
                                guestsPerRoom: Math.max(0, +e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeRoom(r.id)}
                            disabled={roomTypes.length <= 1}
                            aria-label="Remove room type"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addRoom} className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add room type
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assumptions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-7">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <Label>
                          Average occupancy
                          <InfoTip text="The share of your guest capacity that's filled on a typical night across the year." />
                        </Label>
                        <span className="font-semibold text-ocean">{occupancy}%</span>
                      </div>
                      <Slider
                        value={[occupancy]}
                        onValueChange={(v) => setOccupancy(v[0])}
                        min={10}
                        max={100}
                        step={1}
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <Label>
                          Fee per guest, per night
                          <InfoTip text="The price you charge guests. We recommend $4–$6/guest/night — small enough to feel effortless, attractive when bundled into a resort fee." />
                        </Label>
                        <span className="font-semibold text-ocean">
                          ${feePerGuestNight.toFixed(2)}
                        </span>
                      </div>
                      <Slider
                        value={[feePerGuestNight]}
                        onValueChange={(v) => setFeePerGuestNight(v[0])}
                        min={3.5}
                        max={15}
                        step={0.5}
                      />
                      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                        <span>$3.50</span>
                        <span>$15.00</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        💡 We recommend <strong>$4/guest/night</strong>. MagEdge bills you on a
                        simple per-device, per-night usage basis — so your costs always scale with
                        your revenue, never ahead of it.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-6 space-y-6">
                  <Card className="border-ocean/30 bg-gradient-to-b from-ocean/5 to-background">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-ocean" /> Platform estimated revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="rounded-xl bg-ocean p-5 text-center text-primary-foreground">
                        <div className="text-xs uppercase tracking-wide opacity-80">Per year</div>
                        <div className="text-4xl font-bold">{currency(stats.revenuePerYear)}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border bg-card p-3 text-center">
                          <div className="text-xs text-muted-foreground">Per month</div>
                          <div className="text-lg font-bold">{currency(stats.revenuePerMonth)}</div>
                        </div>
                        <div className="rounded-lg border bg-card p-3 text-center">
                          <div className="text-xs text-muted-foreground">Per night</div>
                          <div className="text-lg font-bold">{currency(stats.revenuePerNight)}</div>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Total rooms</span>
                          <span className="font-medium text-foreground">{stats.totalRooms}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max guest capacity</span>
                          <span className="font-medium text-foreground">
                            {Math.round(stats.totalCapacity)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guest nights / night</span>
                          <span className="font-medium text-foreground">
                            {Math.round(stats.activeGuests)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> Figures shown are illustrative estimates based on the
            inputs you provide and are not a guarantee of income. Actual revenue depends on
            occupancy, pricing and local factors. Platform revenue is the total guest-charged
            amount; MagEdge charges a separate service fee per device, per night — your resort keeps
            the difference. Hardware, installation and applicable taxes may apply. This tool does
            not constitute a formal quote or financial advice.
          </p>
        </main>
      </div>
    </TooltipProvider>
  );
}
