import { IconHome, IconBus, IconTrophy, IconMapPin, IconArrowNarrowRight } from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import calendrier from "../data/calendrier.json";

// Données éditables par le bénévole via Decap CMS (/redaction) → src/data/calendrier.json.
const { matchsDomicile, matchsExterieur, resultats } = calendrier;

/* Ligne de match (domicile ou extérieur). */
function LigneMatch({ m, exterieur = false }) {
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-bordure py-4 last:border-b-0">
      <span className="font-display text-[14px] uppercase tracking-wide text-rouge">
        {m.jour} · {m.heure}
      </span>
      <span className="font-display text-[16px] font-semibold uppercase">{m.equipe}</span>
      <span className="text-[14px] text-neutral-400">vs</span>
      <span className="text-[15px] text-neutral-700">{m.adversaire}</span>
      {exterieur && (
        <a
          href={`https://maps.google.com/?q=${m.adresseGPS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-vert px-4 font-display text-[13px] uppercase tracking-wide text-vert-fonce transition-colors hover:bg-vert hover:text-white"
        >
          <IconMapPin className="h-4 w-4" /> {m.lieu}
          <IconArrowNarrowRight className="h-4 w-4" />
        </a>
      )}
    </li>
  );
}

export default function Calendrier() {
  return (
    <>
      <Seo
        titre="Calendrier & Résultats"
        description="Le programme du week-end (matchs à domicile et à l'extérieur) et les derniers résultats des équipes du BCV."
        chemin="/calendrier"
      />
      <SectionHero
        titre="Calendrier & Résultats"
        accroche="Retrouvez le programme du week-end et les derniers résultats de nos équipes."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6">
          {/* Bloc 1 — Domicile */}
          <Reveal>
            <div className="relative overflow-hidden rounded-xl border border-bordure bg-coquille p-7 md:p-9">
              {/* Liseré rouge à gauche (respecte l'arrondi) */}
              <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-rouge" />
              <div className="flex items-center gap-3">
                <IconHome className="h-8 w-8 shrink-0 text-rouge" stroke={1.7} />
                <div>
                  <h2 className="font-display text-[clamp(22px,3.2vw,30px)] font-bold uppercase leading-none tracking-tight">
                    Ce week-end à Domicile
                  </h2>
                  <p className="mt-1 text-[14px] text-neutral-500">Venez faire du bruit ! Buvette ouverte.</p>
                </div>
              </div>
              {/* DONNÉES À METTRE À JOUR CHAQUE SEMAINE — remplacer les matchs ci-dessous */}
              <ul className="mt-6">
                {matchsDomicile.map((m, i) => (
                  <LigneMatch key={i} m={m} />
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Bloc 2 — Extérieur */}
          <Reveal>
            <div className="relative overflow-hidden rounded-xl border border-bordure bg-white p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:p-9">
              {/* Liseré vert à gauche (respecte l'arrondi) */}
              <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-vert" />
              <div className="flex items-center gap-3">
                <IconBus className="h-8 w-8 shrink-0 text-vert" stroke={1.7} />
                <h2 className="font-display text-[clamp(22px,3.2vw,30px)] font-bold uppercase leading-none tracking-tight">
                  Ce week-end à l'Extérieur
                </h2>
              </div>
              {/* DONNÉES À METTRE À JOUR CHAQUE SEMAINE */}
              <ul className="mt-6">
                {matchsExterieur.map((m, i) => (
                  <LigneMatch key={i} m={m} exterieur />
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Bloc 3 — Résultats */}
          <Reveal>
            <div className="rounded-xl border border-bordure bg-white p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:p-9">
              <div className="flex items-center gap-3">
                <IconTrophy className="h-8 w-8 shrink-0 text-rouge" stroke={1.7} />
                <h2 className="font-display text-[clamp(22px,3.2vw,30px)] font-bold uppercase leading-none tracking-tight">
                  Résultats du week-end passé
                </h2>
              </div>
              {/* DONNÉES À METTRE À JOUR CHAQUE SEMAINE */}
              <ul className="mt-6">
                {resultats.map((r, i) => {
                  const victoire = r.resultat === "Victoire";
                  return (
                    <li key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-bordure py-3.5 last:border-b-0">
                      <span className="font-display text-[15px] font-semibold uppercase">{r.equipe}</span>
                      <span className="text-neutral-300">·</span>
                      <span className={`font-display text-[14px] uppercase tracking-wide ${victoire ? "text-vert-fonce" : "text-rouge"}`}>
                        {r.resultat} {r.score}
                      </span>
                      <span className="text-[14px] text-neutral-400">vs</span>
                      <span className="text-[15px] text-neutral-700">{r.adversaire}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
