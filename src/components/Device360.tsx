import { useRef, useState, useEffect } from "react";
import { RotateCw } from "lucide-react";
import f01 from "@/assets/device360/w1.png";
import f02 from "@/assets/device360/w2.png";
import f03 from "@/assets/device360/w3.png";
import f04 from "@/assets/device360/w4.png";
import f05 from "@/assets/device360/w5.png";

const frames = [f01, f02, f03, f04, f05];

export function Device360() {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  // gentle auto-spin until the user interacts
  useEffect(() => {
    if (interacted) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, 180);
    return () => clearInterval(id);
  }, [interacted]);

  const onDown = (clientX: number) => {
    setDragging(true);
    setInteracted(true);
    startX.current = clientX;
    startIndex.current = index;
  };

  const onMove = (clientX: number) => {
    if (!dragging) return;
    const delta = clientX - startX.current;
    const step = Math.round(delta / 24);
    const next = (startIndex.current - step) % frames.length;
    setIndex(next < 0 ? next + frames.length : next);
  };

  return (
    <div className="select-none">
      <div
        className="group relative mx-auto aspect-square w-full max-w-md cursor-ew-resize overflow-hidden rounded-3xl border bg-white shadow-sm"
        onMouseDown={(e) => onDown(e.clientX)}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={() => setDragging(false)}
      >
        {frames.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="MagEdge SOS wristband 360 degree view"
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
            className={`absolute inset-0 size-full object-contain p-4 transition-opacity duration-75 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground/80 px-3 py-1.5 text-xs font-medium text-background backdrop-blur transition-opacity group-hover:opacity-0">
          <RotateCw className="size-3.5" /> Drag to rotate
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {frames.map((_, i) => (
          <button
            key={i}
            aria-label={`View angle ${i + 1}`}
            onClick={() => {
              setInteracted(true);
              setIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-ocean" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
