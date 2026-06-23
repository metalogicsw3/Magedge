import { Link } from "@tanstack/react-router";
import footerBg from "@/assets/footer.jpeg";
import magedgeLogo from "@/assets/magedge-logo.png";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <img
        src={footerBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay — ocean deep tint matching FinalCTA */}
      <div className="absolute inset-0 bg-ocean-deep/80" />

      {/* Centered content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <img
          src={magedgeLogo}
          alt="MagEdge"
          className="mb-8 h-10 w-auto brightness-0 invert opacity-90 sm:h-12"
        />
        <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Let's build a safer future for your resort.
        </h2>
        <p className="mt-4 max-w-md text-sm opacity-70 sm:mt-6 sm:text-base">
          See how our SOS wristband brings real-time drowning prevention to your resort.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
          <Link to="/demo-request">
            <Button
              size="lg"
              className="rounded-full bg-white px-7 text-foreground hover:bg-white/90"
            >
              Book a demo <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/50 bg-transparent px-7 text-white hover:bg-white/10"
            onClick={() => {
              const target = document.getElementById("contact");
              if (!target) return;
              const start = window.scrollY;
              const end = target.getBoundingClientRect().top + window.scrollY - 80;
              const distance = end - start;
              const duration = 1200;
              let startTime: number | null = null;
              const ease = (t: number) =>
                t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
              const step = (ts: number) => {
                if (!startTime) startTime = ts;
                const progress = Math.min((ts - startTime) / duration, 1);
                window.scrollTo(0, start + distance * ease(progress));
                if (progress < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            }}
          >
            Talk to sales
          </Button>
        </div>
      </div>

      {/* Bottom-right legal links */}
      <div className="absolute bottom-6 right-4 flex items-center gap-4 text-xs text-white/60 sm:right-8 sm:gap-6">
        <Link to="/privacy" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-white transition-colors">
          Terms &amp; Conditions
        </Link>
      </div>
    </footer>
  );
}
