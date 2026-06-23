import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
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

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Demo — MagEdge" },
      {
        name: "description",
        content:
          "Book a demo, request a pilot, or talk to sales. Reach the MagEdge team by email, phone, or the inquiry form.",
      },
      { property: "og:title", content: "Contact MagEdge" },
      { property: "og:description", content: "Book a demo, request a pilot, or talk to sales." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [inquiryType, setInquiryType] = useState("Book a demo");

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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-ocean-deep py-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Let's talk
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/85">
              Book a demo, request a pilot, or ask us anything. We typically respond within one
              business day.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
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
                  <a
                    href="tel:+13105551234"
                    className="text-muted-foreground hover:text-foreground"
                  >
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

          <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-8 shadow-sm">
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
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
