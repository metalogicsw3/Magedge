import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, adds the "revealed" class once,
 * then the observer disconnects — zero ongoing cost.
 *
 * Respects prefers-reduced-motion: if the user has that set, the element
 * is immediately marked revealed with no animation.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect accessibility preference — skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.disconnect(); // fire once, then clean up
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
