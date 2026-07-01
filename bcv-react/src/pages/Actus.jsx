import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import { articles } from "../data/articles.js";
import { CATEGORIES, formatDateFr } from "../lib.js";

// Onglets de filtre. Actif mis en valeur via group-has-[#id:checked] (CSS pur).
const FILTRES = [
  { id: "f-tous", label: "Tous", actif: "group-has-[#f-tous:checked]:border-rouge group-has-[#f-tous:checked]:bg-rouge group-has-[#f-tous:checked]:text-white" },
  { id: "f-recits", label: "Récits du week-end", actif: "group-has-[#f-recits:checked]:border-rouge group-has-[#f-recits:checked]:bg-rouge group-has-[#f-recits:checked]:text-white" },
  { id: "f-vie", label: "Vie du club", actif: "group-has-[#f-vie:checked]:border-rouge group-has-[#f-vie:checked]:bg-rouge group-has-[#f-vie:checked]:text-white" },
  { id: "f-galerie", label: "Galerie Photos", actif: "group-has-[#f-galerie:checked]:border-rouge group-has-[#f-galerie:checked]:bg-rouge group-has-[#f-galerie:checked]:text-white" },
];

// Visibilité d'une carte selon la catégorie : visible si "Tous" ou sa catégorie est cochée.
const VISIBILITE = {
  recits: "hidden group-has-[#f-tous:checked]:flex group-has-[#f-recits:checked]:flex",
  "vie-club": "hidden group-has-[#f-tous:checked]:flex group-has-[#f-vie:checked]:flex",
  galerie: "hidden group-has-[#f-tous:checked]:flex group-has-[#f-galerie:checked]:flex",
};

export default function Actus() {
  return (
    <>
      <SectionHero titre="Actualités" accroche="La vie du club, semaine après semaine." />

      {/* La section est le "group" : les radios cochés pilotent l'affichage via CSS (aucun JS). */}
      <section className="group py-16 md:py-24">
        {/* Radios de filtre, masqués visuellement mais accessibles au clavier */}
        <div className="sr-only">
          <input type="radio" name="filtre-actus" id="f-tous" defaultChecked />
          <input type="radio" name="filtre-actus" id="f-recits" />
          <input type="radio" name="filtre-actus" id="f-vie" />
          <input type="radio" name="filtre-actus" id="f-galerie" />
        </div>

        <div className="mx-auto max-w-[1180px] px-6">
          {/* Onglets de filtre */}
          <div className="mb-10 flex flex-wrap gap-3">
            {FILTRES.map((f) => (
              <label
                key={f.id}
                htmlFor={f.id}
                className={`cursor-pointer select-none rounded-lg border border-bordure px-4 py-2 font-display text-[13px] uppercase tracking-wide text-encre transition-colors hover:border-rouge ${f.actif}`}
              >
                {f.label}
              </label>
            ))}
          </div>

          {/* Grille d'articles */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => {
              const cat = CATEGORIES[a.categorie];
              return (
                <article
                  key={a.slug}
                  className={`${VISIBILITE[a.categorie]} flex-col overflow-hidden rounded-xl border border-bordure shadow-[0_8px_24px_rgba(22,22,22,0.06)]`}
                >
                  {/* PHOTO — à remplacer */}
                  <div className="aspect-video bg-coquille" aria-hidden />
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 font-display text-[11px] uppercase tracking-wide ${cat.badge}`}>
                      {cat.label}
                    </span>
                    <h2 className="mt-3 font-display text-[19px] font-semibold uppercase leading-tight">{a.titre}</h2>
                    <time className="mt-1 text-[13px] text-neutral-500">{formatDateFr(a.date)}</time>
                    <p className="mt-2 line-clamp-2 text-[15px] text-neutral-600">{a.extrait}</p>
                    <Link
                      to={`/actus/${a.slug}`}
                      className="mt-4 inline-flex items-center gap-1 font-display text-[13px] uppercase tracking-wide text-rouge hover:underline"
                    >
                      Lire la suite <IconArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
