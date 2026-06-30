import FilAriane from "./FilAriane.jsx";

// Hero d'en-tête des pages internes : fond rouge, titre Oswald, accroche.
// Reprend la diagonale blanche du bas pour rester cohérent avec l'Accueil.
// breadcrumb : tableau d'items optionnel (fil d'Ariane, posé clair sur le rouge).
export default function SectionHero({ eyebrow, titre, accroche, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-rouge">
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-20 pt-12 md:pb-24 md:pt-16">
        {breadcrumb && <FilAriane items={breadcrumb} light />}
        {eyebrow && (
          <p className="mb-3 font-display text-[13px] uppercase tracking-[0.2em] text-[#ffd7da]">{eyebrow}</p>
        )}
        <h1 className="font-display text-[clamp(34px,6vw,60px)] font-bold uppercase leading-[0.95] tracking-tight text-white">
          {titre}
        </h1>
        {accroche && (
          <p className="mt-4 max-w-[58ch] text-[clamp(16px,2.2vw,19px)] leading-relaxed text-[#ffe3e5]">
            {accroche}
          </p>
        )}
      </div>
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 z-0 h-10 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 35%, 100% 100%)" }}
      />
    </section>
  );
}
