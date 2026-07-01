import { IconCalendarEvent, IconDownload, IconBell, IconBeach } from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";

// Code couleur fonctionnel par gymnase (demandé dans la spec) — tons pâles
// discrets, en complément de la charte rouge/vert/blanc.
const GYMNASES = {
  "Fernand Daydé": "bg-sky-100 text-sky-800",
  "Jean-Louis Lahore": "bg-emerald-100 text-emerald-800",
  Gragnague: "bg-orange-100 text-orange-800",
};

function BadgeGymnase({ nom }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 font-display text-[12px] uppercase tracking-wide ${GYMNASES[nom]}`}>
      {nom}
    </span>
  );
}

// Lignes d'exemple pour montrer la structure (remplies à la rentrée).
const CRENEAUX = [
  { equipe: "U9", jour: "à venir", horaire: "à venir", gymnase: "Fernand Daydé" },
  { equipe: "U13 Garçons 1", jour: "à venir", horaire: "à venir", gymnase: "Jean-Louis Lahore" },
  { equipe: "U15 Garçons", jour: "à venir", horaire: "à venir", gymnase: "Gragnague" },
  { equipe: "Seniors Garçons 1", jour: "à venir", horaire: "à venir", gymnase: "Fernand Daydé" },
];

export default function Planning() {
  return (
    <>
      <Seo
        titre="Planning d'entraînement"
        description="Jours, horaires et gymnases des entraînements de toutes les équipes du Basket Club Verfeillois à Verfeil."
        chemin="/planning"
      />
      <SectionHero
        titre="Planning d'entraînement"
        accroche="Retrouvez les jours, horaires et lieux d'entraînement de chaque équipe."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          {/* Encart « planning à venir » */}
          <Reveal>
            <div className="relative overflow-hidden rounded-xl border border-bordure bg-coquille p-7 md:p-9">
              {/* Liseré rouge en haut (respecte l'arrondi de la carte) */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-rouge" />
              <div className="flex items-start gap-3">
                <IconBell className="mt-0.5 h-7 w-7 shrink-0 text-rouge" stroke={1.7} />
                <div>
                  <p className="max-w-[60ch] text-[17px] leading-relaxed text-neutral-700">
                    Le planning de la saison 2026-2027 sera communiqué à la rentrée de septembre.
                    Abonnez-vous à la newsletter pour être prévenu en premier.
                  </p>
                  <a
                    href="/#newsletter"
                    className="mt-5 inline-flex min-h-[48px] items-center rounded-lg border-2 border-vert px-7 font-display text-[15px] uppercase tracking-wide text-vert-fonce transition-all hover:-translate-y-0.5 hover:bg-vert hover:text-white"
                  >
                    S'abonner à la newsletter
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tableau hebdomadaire */}
          <Reveal>
            <h2 className="mb-6 mt-16 font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Créneaux de la semaine
            </h2>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto rounded-xl border border-bordure shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="bg-white">
                    {["Équipe", "Jour", "Horaire", "Gymnase"].map((c) => (
                      <th key={c} className="border-b border-bordure px-5 py-4 font-display text-[13px] uppercase tracking-wide text-encre">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CRENEAUX.map((c, i) => (
                    <tr key={c.equipe} className={i % 2 ? "bg-coquille/50" : "bg-white"}>
                      <td className="border-b border-bordure px-5 py-4 font-display text-[15px] font-semibold uppercase">{c.equipe}</td>
                      <td className="border-b border-bordure px-5 py-4 text-[14px] italic text-neutral-400">{c.jour}</td>
                      <td className="border-b border-bordure px-5 py-4 text-[14px] italic text-neutral-400">{c.horaire}</td>
                      <td className="border-b border-bordure px-5 py-4"><BadgeGymnase nom={c.gymnase} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Télécharger le PDF */}
          <Reveal>
            <div className="mt-10">
              <a
                href="/planning.pdf"
                download
                className="inline-flex min-h-[52px] items-center gap-2 rounded-lg border-2 border-rouge px-8 font-display text-[16px] uppercase tracking-wide text-rouge transition-all hover:-translate-y-0.5 hover:bg-rouge hover:text-white"
              >
                <IconDownload className="h-5 w-5" /> Télécharger le planning (PDF)
              </a>
            </div>
          </Reveal>

          {/* Zone vacances scolaires */}
          <Reveal>
            <div className="mt-12 flex items-start gap-3 rounded-xl bg-coquille p-7">
              <IconBeach className="mt-0.5 h-7 w-7 shrink-0 text-vert" stroke={1.7} />
              <div>
                <p className="font-display text-[15px] font-semibold uppercase tracking-wide">Infos vacances scolaires</p>
                <p className="mt-2 max-w-[64ch] text-[15px] leading-relaxed text-neutral-600">
                  Les modifications de planning sont communiquées ici au cas par cas.
                  Aucun changement annoncé pour l'instant.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
