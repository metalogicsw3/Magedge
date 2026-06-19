import { Link } from "@tanstack/react-router";
import magedgeLogo from "@/assets/magedge-logo.png";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-7 py-6">
      <Link to="/" aria-label="MagEdge home">
        <img src={magedgeLogo} alt="MagEdge" className="h-8 w-auto brightness-0 invert" />
      </Link>
    </header>
  );
}
