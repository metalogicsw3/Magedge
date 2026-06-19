import { Link } from "@tanstack/react-router";
import footerBg from "@/assets/footer.jpeg";
import magedgeLogo from "@/assets/magedge-logo.png";

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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

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
