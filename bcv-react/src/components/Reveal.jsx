import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../lib.js";

// Animation d'apparition au scroll, respecte prefers-reduced-motion.
export default function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
