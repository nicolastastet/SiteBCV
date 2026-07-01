import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import SectionHero from "./SectionHero.jsx";
import Reveal from "./Reveal.jsx";
import PhotoAvecFallback from "./PhotoAvecFallback.jsx";
import Seo from "./Seo.jsx";
import { FAMILLES, getEquipesParFamille } from "../data/equipes.js";

const DESCRIPTIONS = {
  "mini-basket": "L'école de basket du BCV pour les 5 à 10 ans : U7-U9, U11 Mixte, U11 Filles et U11 Garçons. Découvrez le jeu en s'amusant.",
  jeunes: "Les équipes jeunes du Basket Club Verfeillois, des U13 aux U18, filles et garçons. Progression, compétition et esprit d'équipe.",
  seniors: "Les équipes seniors du Basket Club Verfeillois : Femmes et Garçons. Le basket compétition dans une ambiance conviviale.",
};

// Page catégorie (niveau 2) : liste des équipes d'une famille, avec fil d'Ariane.
export default function PageCategorie({ famille }) {
  const f = FAMILLES[famille];
  const equipes = getEquipesParFamille(famille);
  return (
    <>
      <Seo titre={f.nom} description={DESCRIPTIONS[famille]} chemin={`/equipes/${famille}`} />
      <SectionHero
        titre={f.nom}
        accroche={f.tranche}
        breadcrumb={[
          { label: "Équipes", to: "/equipes" },
          { label: f.nom },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipes.map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.05}>
                <Link
                  to={`/equipes/${e.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-bordure bg-white shadow-[0_8px_24px_rgba(22,22,22,0.06)] transition-all hover:-translate-y-1.5 hover:border-[#f3c9cd] hover:shadow-[0_16px_40px_rgba(22,22,22,0.12)]"
                >
                  {/* Photo d'équipe : /images/equipes/[slug].jpg — fallback "Photo à venir" sinon */}
                  <PhotoAvecFallback
                    src={`/images/equipes/${e.slug}.jpg`}
                    alt={`Équipe ${e.nom}`}
                    className="aspect-[4/3] w-full"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-display text-[20px] font-semibold uppercase leading-tight">{e.nom}</span>
                    {e.age && <p className="mt-1 text-[14px] text-neutral-600">{e.age}</p>}
                    {e.note && <p className="mt-0.5 text-[12px] italic text-neutral-400">({e.note})</p>}
                    <span className="mt-4 inline-flex items-center gap-1 font-display text-[13px] uppercase tracking-wide text-rouge">
                      Voir l'équipe
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
