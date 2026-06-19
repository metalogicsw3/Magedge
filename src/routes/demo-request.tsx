import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import magedgeLogo from "@/assets/magedge-logo.png";

export const Route = createFileRoute("/demo-request")({
  head: () => ({
    meta: [
      { title: "Demonstration Request — MagEdge" },
      { name: "description", content: "Request a MagEdge demonstration for your resort." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DemoRequestPage,
});

function FieldSet({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-5 text-base font-semibold tracking-tight text-ocean uppercase">{legend}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-ocean"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) =>
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.includes(opt)}
            onChange={() => toggle(opt)}
            className="accent-ocean"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function DemoRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Contact
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Resort
  const [resortName, setResortName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [resortCategory, setResortCategory] = useState("");

  // Operational
  const [numRooms, setNumRooms] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [numPools, setNumPools] = useState("");
  const [houseReef, setHouseReef] = useState("");
  const [waterVillas, setWaterVillas] = useState("");
  const [excursions, setExcursions] = useState("");
  const [diveCentre, setDiveCentre] = useState("");

  // Interest
  const [interestIn, setInterestIn] = useState<string[]>([]);

  // Objective
  const [objectives, setObjectives] = useState<string[]>([]);

  // Safety
  const [incidents, setIncidents] = useState("");

  // Meeting
  const [demoDate, setDemoDate] = useState("");
  const [demoMethod, setDemoMethod] = useState("");

  // Comments
  const [comments, setComments] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !resortName || !interestIn.length || !demoMethod) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          jobTitle,
          email,
          mobile,
          resortName,
          location,
          website,
          resortCategory,
          numRooms: numRooms ? parseInt(numRooms) : null,
          occupancy: occupancy ? parseFloat(occupancy) : null,
          numPools: numPools ? parseInt(numPools) : null,
          houseReef,
          waterVillas,
          excursions,
          diveCentre,
          interestIn,
          objectives,
          incidents,
          demoDate,
          demoMethod,
          comments,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      toast.success("Demo request submitted successfully.");
    } catch {
      toast.error("Something went wrong. Please email info@magedge.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/40 to-background">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-2 px-5 py-4">
          <a href="/">
            <img src={magedgeLogo} alt="MagEdge" className="h-7 w-auto" />
          </a>
          <span className="ml-2 rounded-full bg-ocean/10 px-2.5 py-0.5 text-xs font-medium text-ocean">
            Demonstration Request
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            MAGEDGE DEMONSTRATION REQUEST FORM
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete the form below and our team will be in touch to schedule your demonstration.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border bg-card p-12 text-center shadow-sm">
            <CheckCircle2 className="size-12 text-ocean" />
            <h2 className="text-xl font-semibold">Request Received</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Thank you {fullName}. Our team will review your request and contact you shortly to
              confirm your demonstration.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <FieldSet legend="Contact Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                    placeholder="e.g. General Manager"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@resort.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number / WhatsApp *</Label>
                  <Input
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="+1 555 000 0000"
                    className="mt-1.5"
                  />
                </div>
              </div>
            </FieldSet>

            {/* Resort Information */}
            <FieldSet legend="Resort Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="resortName">Resort Name *</Label>
                  <Input
                    id="resortName"
                    value={resortName}
                    onChange={(e) => setResortName(e.target.value)}
                    required
                    placeholder="Your resort name"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Island / Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    placeholder="e.g. North Malé Atoll, Maldives"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourresort.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Resort Category *</Label>
                <div className="mt-2">
                  <RadioGroup
                    name="resortCategory"
                    options={["3 Star", "4 Star", "5 Star", "Luxury / Villa Resort"]}
                    value={resortCategory}
                    onChange={setResortCategory}
                  />
                </div>
              </div>
            </FieldSet>

            {/* Operational Details */}
            <FieldSet legend="Operational Details">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="numRooms">Number of Rooms / Villas *</Label>
                  <Input
                    id="numRooms"
                    type="number"
                    min={1}
                    value={numRooms}
                    onChange={(e) => setNumRooms(e.target.value)}
                    required
                    placeholder="e.g. 120"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="occupancy">Current Occupancy (%) *</Label>
                  <Input
                    id="occupancy"
                    type="number"
                    min={0}
                    max={100}
                    value={occupancy}
                    onChange={(e) => setOccupancy(e.target.value)}
                    required
                    placeholder="e.g. 75"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="numPools">Number of Swimming Pools *</Label>
                  <Input
                    id="numPools"
                    type="number"
                    min={0}
                    value={numPools}
                    onChange={(e) => setNumPools(e.target.value)}
                    required
                    placeholder="e.g. 3"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label>House Reef Access *</Label>
                  <div className="mt-2">
                    <RadioGroup
                      name="houseReef"
                      options={["Yes", "No"]}
                      value={houseReef}
                      onChange={setHouseReef}
                    />
                  </div>
                </div>
                <div>
                  <Label>Water Villas *</Label>
                  <div className="mt-2">
                    <RadioGroup
                      name="waterVillas"
                      options={["Yes", "No"]}
                      value={waterVillas}
                      onChange={setWaterVillas}
                    />
                  </div>
                </div>
                <div>
                  <Label>Excursion Activities *</Label>
                  <div className="mt-2">
                    <RadioGroup
                      name="excursions"
                      options={["Yes", "No"]}
                      value={excursions}
                      onChange={setExcursions}
                    />
                  </div>
                </div>
                <div>
                  <Label>Dive Centre *</Label>
                  <div className="mt-2">
                    <RadioGroup
                      name="diveCentre"
                      options={["Yes", "No"]}
                      value={diveCentre}
                      onChange={setDiveCentre}
                    />
                  </div>
                </div>
              </div>
            </FieldSet>

            {/* Interest Level */}
            <FieldSet legend="Interest Level">
              <div>
                <Label>I am interested in: *</Label>
                <div className="mt-2">
                  <CheckboxGroup
                    options={["Demonstration", "Commercial Proposal"]}
                    values={interestIn}
                    onChange={setInterestIn}
                  />
                </div>
              </div>
            </FieldSet>

            {/* Primary Objective */}
            <FieldSet legend="Primary Objective">
              <div>
                <Label>What is your primary objective? *</Label>
                <div className="mt-2">
                  <CheckboxGroup
                    options={[
                      "Guest Safety Enhancement",
                      "Drowning Prevention",
                      "Staff Safety",
                      "Liability Reduction",
                      "Insurance Benefits",
                      "Resort Differentiation",
                      "Regulatory Compliance",
                    ]}
                    values={objectives}
                    onChange={setObjectives}
                  />
                </div>
              </div>
            </FieldSet>

            {/* Safety Assessment */}
            <FieldSet legend="Safety Assessment">
              <div>
                <Label>
                  How many guest incidents or rescues have occurred in the last 24 months? *
                </Label>
                <div className="mt-2">
                  <RadioGroup
                    name="incidents"
                    options={["None", "1–5", "6–10", "11–20", "More than 20"]}
                    value={incidents}
                    onChange={setIncidents}
                  />
                </div>
              </div>
            </FieldSet>

            {/* Meeting Request */}
            <FieldSet legend="Meeting Request">
              <div>
                <Label htmlFor="demoDate">Preferred Demonstration Date *</Label>
                <Input
                  id="demoDate"
                  type="date"
                  value={demoDate}
                  onChange={(e) => setDemoDate(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Preferred Demonstration Method *</Label>
                <div className="mt-2">
                  <RadioGroup
                    name="demoMethod"
                    options={[
                      "On-Site Demonstration",
                      "Zoom Meeting",
                      "Microsoft Teams",
                      "WhatsApp Video Call",
                    ]}
                    value={demoMethod}
                    onChange={setDemoMethod}
                  />
                </div>
              </div>
            </FieldSet>

            {/* Additional Comments */}
            <FieldSet legend="Additional Comments">
              <div>
                <Label htmlFor="comments">
                  Please provide any additional information regarding your safety requirements,
                  guest profile, operational challenges, or deployment objectives.
                </Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={5}
                  placeholder="Optional additional information..."
                  className="mt-1.5"
                />
              </div>
            </FieldSet>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-ocean py-6 text-base font-semibold text-white hover:bg-ocean/90"
            >
              {submitting ? "Submitting…" : "SUBMIT REQUEST"}
            </Button>
          </form>
        )}
      </main>
    </div>
  );
}
