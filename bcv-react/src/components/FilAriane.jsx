import { Link } from "react-router-dom";

// Fil d'Ariane. items : [{ label, to? }] — le dernier (page courante) sans `to`.
// `light` : version claire posée sur le hero rouge.
export default function FilAriane({ items, light = false }) {
  const sep = light ? "text-[#ffb3b9]" : "text-neutral-400";
  const courant = light ? "text-white" : "text-neutral-500";
  const lien = light ? "text-[#ffd7da] hover:text-white" : "text-rouge hover:text-rouge-fonce";
  return (
    <nav aria-label="Fil d'Ariane" className="mb-4 flex flex-wrap items-center gap-1.5 font-display text-[12px] uppercase tracking-wide">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.to ? (
            <Link to={it.to} className={`${lien} transition-colors`}>{it.label}</Link>
          ) : (
            <span className={courant} aria-current="page">{it.label}</span>
          )}
          {i < items.length - 1 && <span className={sep} aria-hidden>›</span>}
        </span>
      ))}
    </nav>
  );
}
