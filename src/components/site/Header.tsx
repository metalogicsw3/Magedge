import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import magedgeLogo from "@/assets/magedge-logo.png";
import menuImg from "@/assets/insideMenu.png";

// ─────────────────────────────────────────────────────────────
// 👇  MENU IMAGE — swap this import to change the photo.
//     Point it at any file in src/assets/, e.g.:
//       import menuImg from "@/assets/my-photo.jpg";
// ─────────────────────────────────────────────────────────────
const MENU_IMAGE: string | null = menuImg;

const menuLinks = [{ label: "About Us", to: "/about" as const }];

export function Header() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();

  useEffect(() => {
    setOpen(false);
  }, [routerState.location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Top bar — absolute, non-sticky ───────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
          {/* Logo — fades out when menu opens */}
          <Link
            to="/"
            aria-label="MagEdge home"
            className={`relative flex-shrink-0 transition-opacity duration-200 ${
              open ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <img
              src={magedgeLogo}
              alt="MagEdge"
              className="h-7 w-auto brightness-0 invert sm:h-8"
            />
          </Link>

          {/* Hamburger ≡ — static 3 lines, fades out when menu opens */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`relative flex size-11 flex-shrink-0 cursor-pointer items-center justify-center transition-opacity duration-200 ${
              open ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <line
                x1="0"
                y1="1"
                x2="22"
                y2="1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="7"
                x2="22"
                y2="7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="13"
                x2="22"
                y2="13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Menu — single panel slides in from right ─────────────── */}
      {/*
        The WHOLE menu is one `transform: translateX(100%) → 0` panel.
        Inside it, the left half is the image slot and the right half is
        the white content — so there's never a gap or seam between them.
      */}
      <div
        className={`menu-panel fixed inset-0 z-[60] flex transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* LEFT half — menu image */}
        <div className="hidden md:flex md:w-1/2 h-full overflow-hidden relative flex-shrink-0 items-center justify-center bg-[#c8d5d8]">
          {MENU_IMAGE ? (
            <img
              src={MENU_IMAGE}
              alt="Menu visual"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            /* Placeholder shown when MENU_IMAGE is null */
            <div className="flex flex-col items-center justify-center gap-3 text-center px-8">
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-dashed border-black/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-black/30"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p className="text-xs font-medium text-black/35 leading-relaxed">
                Set <code className="font-mono bg-black/8 px-1 rounded">MENU_IMAGE</code>
                <br />
                in <code className="font-mono bg-black/8 px-1 rounded">Header.tsx</code>
              </p>
            </div>
          )}
        </div>

        {/* RIGHT half — white content panel */}
        <div className="relative flex w-full flex-col bg-white md:w-1/2">
          {/* Close × — top-right corner */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 z-10 flex size-10 cursor-pointer items-center justify-center transition-opacity hover:opacity-40 sm:right-8 sm:top-8"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line
                x1="1"
                y1="1"
                x2="17"
                y2="17"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="17"
                y1="1"
                x2="1"
                y2="17"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Nav links */}
          <div className="flex flex-col justify-start px-10 pt-24 sm:px-14 sm:pt-28">
            {menuLinks.map((link) => (
              <div
                key={link.to}
                className={`overflow-hidden border-b border-black/10 py-4 transition-all duration-500 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: open ? "280ms" : "0ms" }}
              >
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block text-3xl font-bold leading-tight text-black transition-opacity hover:opacity-40 sm:text-4xl"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* GET IN TOUCH */}
          <div
            className={`px-10 py-10 transition-all duration-500 sm:px-14 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: open ? "360ms" : "0ms" }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
              Get in Touch
            </p>
            <a
              href="mailto:info@magedge.com"
              className="text-lg font-medium text-black underline underline-offset-4 decoration-black/25 transition-colors hover:decoration-black sm:text-xl"
            >
              info@magedge.com
            </a>
          </div>

          {/* Copyright */}
          <div
            className={`px-10 pb-8 transition-all duration-500 sm:px-14 sm:pb-10 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: open ? "420ms" : "0ms" }}
          >
            <p className="text-xs text-black/30">© 2025. All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
}
