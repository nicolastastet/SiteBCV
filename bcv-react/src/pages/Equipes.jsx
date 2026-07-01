import { Link } from "react-router-dom";
import { IconBallBasketball, IconRun, IconTrophy, IconArrowRight } from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import { FAMILLES } from "../data/equipes.js";

const ICONES = {
  "mini-basket": IconBallBasketball,
  jeunes: IconRun,
  seniors: IconTrophy,
};

export default function Equipes() {
  const familles = Object.values(FAMILLES);
  return (
    <>
      <Seo
        titre="Équipes & Catégories"
        description="Toutes les équipes du BCV, du mini-basket aux seniors, filles et garçons. Trouvez la catégorie qui vous correspond et rejoignez le club."
        chemin="/equipes"
      />
      <SectionHero
        titre="Équipes & Catégories"
        accroche="De l'école de basket aux seniors, trouvez l'équipe qui vous correspond."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {familles.map((f, i) => {
              const Icon = ICONES[f.slug];
              return (
                <Reveal key={f.slug} delay={i * 0.08}>
                  <Link
                    to={`/equipes/${f.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-bordure bg-white shadow-[0_8px_24px_rgba(22,22,22,0.06)] transition-all hover:-translate-y-1.5 hover:border-[#f3c9cd] hover:shadow-[0_16px_40px_rgba(22,22,22,0.12)]"
                  >
                    {/* PHOTO — à remplacer */}
                    <div className="flex aspect-[16/10] items-center justify-center bg-coquille">
                      <Icon className="h-16 w-16 text-rouge" stroke={1.4} />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <span className="font-display text-[clamp(22px,3vw,28px)] font-bold uppercase leading-none tracking-tight">
                        {f.nom}
                      </span>
                      <p className="mt-2 text-[16px] text-neutral-600">{f.tranche}</p>
                      <span className="mt-5 inline-flex items-center gap-1 font-display text-[14px] uppercase tracking-wide text-rouge">
                        Voir les équipes
                        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
