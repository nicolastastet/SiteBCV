import { useEffect, useRef, useState } from "react";
import { useInView, animate, useReducedMotion } from "motion/react";
import { EASE } from "../lib.js";

// Compteur animé pour le bandeau chiffres.
export default function Stat({ value, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);
  return (
    <div ref={ref} className="flex-1 min-w-[150px] border-r border-bordure last:border-r-0 px-6 py-12 text-center">
      <div className="font-display font-bold text-rouge leading-none text-[clamp(38px,5.4vw,52px)]">
        {n}
        {suffix}
        <span className="mx-auto mt-2.5 block h-[3px] w-7 rounded bg-vert" />
      </div>
      <span className="mt-2 block text-[13px] uppercase tracking-[0.06em] text-neutral-500">
        {label}
      </span>
    </div>
  );
}
