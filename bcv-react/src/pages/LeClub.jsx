import { Link } from "react-router-dom";
import { IconMapPin, IconArrowRight } from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import PhotoAvecFallback from "../components/PhotoAvecFallback.jsx";
import Seo from "../components/Seo.jsx";

// Données placeholder — à remplacer par les vraies infos du club.
// `photo` : chemin attendu dans public/images/ (placeholder tant que le fichier n'existe pas).
const COACHS = [
  { prenom: "Coach 1", equipes: "U13 Garçons", diplome: "Brevet Fédéral 1", photo: "/images/club/coachs/coach-1.jpg" },
  { prenom: "Coach 2", equipes: "U15 Garçons / U18 Garçons", diplome: "Brevet Fédéral 2", photo: "/images/club/coachs/coach-2.jpg" },
  { prenom: "Coach 3", equipes: "Seniors", diplome: "Brevet Fédéral 1", photo: "/images/club/coachs/coach-3.jpg" },
  { prenom: "Coach 4", equipes: "Mini Basket", diplome: "Initiateur", photo: "/images/club/coachs/coach-4.jpg" },
];

const BUREAU = [
  { role: "Co-Président", prenom: "Pierre-Emmanuel Angot", photo: "/images/club/bureau/pierre-emmanuel-angot.jpg" },
  { role: "Co-Présidente", prenom: "Stéphanie Altinier", photo: "/images/club/bureau/stephanie-altinier.jpg" },
  { role: "Secrétaire", prenom: "Prénom à venir", photo: "/images/club/bureau/secretaire.jpg" },
  { role: "Trésorier(e)", prenom: "Prénom à venir", photo: "/images/club/bureau/tresorier.jpg" },
];

const INSTITUTIONS = [
  { nom: "FFBB", logo: "/images/affiliations/ffbb.svg" },
  { nom: "Ligue Occitanie", logo: "/images/affiliations/ligue-occitanie.png" },
  { nom: "Comité 31 Haute-Garonne", logo: "/images/affiliations/comite-31.png" },
];

const REPERES = [
  { chiffre: "1923", label: "Fondation du club" },
  { chiffre: "200+", label: "licenciés aujourd'hui" },
  { chiffre: "15", label: "équipes" },
  { chiffre: "103 ans", label: "d'histoire" },
];

const GYMNASES = [
  { nom: "Gymnase Fernand Daydé", adresse: "Verfeil (31590)" },
  { nom: "Gymnase Jean-Louis Lahore", adresse: "Verfeil (31590)" },
  { nom: "Gymnase de Gragnague", adresse: "Gragnague (31380)" },
];

/* Carte coach / bureau : photo ronde (avec fallback) + identité. */
function CartePersonne({ prenom, dessous, badge, photo }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-bordure bg-white p-6 text-center shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
      <PhotoAvecFallback
        src={photo}
        alt={prenom}
        className="mb-4 h-24 w-24 rounded-full object-cover"
      />
      <span className="font-display text-[18px] font-semibold uppercase leading-tight">{prenom}</span>
      {dessous && <p className="mt-1 text-[14px] text-neutral-600">{dessous}</p>}
      {badge && (
        <span className="mt-3 inline-flex items-center rounded-full bg-vert px-3 py-1 font-display text-[12px] uppercase tracking-wide text-white">
          {badge}
        </span>
      )}
    </div>
  );
}

export default function LeClub() {
  return (
    <>
      <Seo
        titre="Le Club"
        description="Fondé sur le respect, la solidarité et le partage, le Basket Club Verfeillois forme des joueurs épanouis dans un cadre familial depuis 1923."
        chemin="/le-club"
      />
      <SectionHero
        titre="Le Basket Club Verfeillois"
        accroche="Un projet sportif et éducatif : faire grandir les jeunes de Verfeil, sur le terrain comme en dehors, dans le respect et le plaisir du jeu."
      />

      {/* Section 1 — Mot des Co-Présidents */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 md:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            {/* PHOTO — à remplacer (photo d'ambiance : joie, esprit d'équipe) */}
            <div className="aspect-[4/3] w-full rounded-xl bg-coquille shadow-[0_14px_40px_rgba(22,22,22,0.10)]" aria-hidden />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-3 font-display text-[13px] uppercase tracking-[0.2em] text-rouge">Mot des Co-Présidents</p>
            <blockquote className="border-l-4 border-vert pl-5 text-[clamp(17px,2.4vw,20px)] italic leading-relaxed text-neutral-700">
              « Bienvenue au Basket Club Verfeillois. Depuis plus de 100 ans, notre club accueille
              les jeunes de Verfeil dans un esprit de respect, de progression et de plaisir du
              jeu. Notre priorité : un encadrement diplômé et bienveillant, pour que votre enfant
              s'épanouisse autant sur le terrain qu'en dehors. »
            </blockquote>
            <p className="mt-4 pl-5 font-display text-[14px] uppercase tracking-wide text-neutral-500">
              — Pierre-Emmanuel Angot et Stéphanie Altinier, Co-Présidents du BCV
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — L'encadrement */}
      <section className="bg-coquille py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
              L'encadrement
            </h2>
            <p className="mt-4 max-w-[60ch] text-[17px] text-neutral-600">
              Des entraîneurs diplômés et bienveillants, pour chaque catégorie.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COACHS.map((c, i) => (
              <Reveal key={c.prenom} delay={i * 0.06}>
                <CartePersonne prenom={c.prenom} dessous={c.equipes} badge={c.diplome} photo={c.photo} />
              </Reveal>
            ))}
            {/* Carte vide pour un futur coach */}
            <Reveal delay={COACHS.length * 0.06}>
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-bordure bg-white/60 p-6 text-center">
                <div className="mb-4 h-24 w-24 rounded-full border-2 border-dashed border-bordure" aria-hidden />
                <span className="font-display text-[16px] uppercase text-neutral-400">Coach à venir</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 3 — Le Bureau & garanties institutionnelles */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
              Le Bureau
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {BUREAU.map((m, i) => (
              <Reveal key={m.role} delay={i * 0.06}>
                <CartePersonne prenom={m.prenom} dessous={m.role} photo={m.photo} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mb-6 mt-16 text-center font-display text-[13px] uppercase tracking-[0.2em] text-rouge">
              Affilié et reconnu par
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {INSTITUTIONS.map((inst, i) => (
              <Reveal key={inst.nom} delay={i * 0.06}>
                <div className="flex h-24 items-center justify-center rounded-lg border border-bordure bg-coquille px-6">
                  <img
                    src={inst.logo}
                    alt={inst.nom}
                    className="max-h-14 w-auto max-w-[85%] object-contain"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Notre histoire & infrastructures */}
      <section className="bg-coquille py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
              Notre histoire
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {REPERES.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.06}>
                <div className="rounded-xl border border-bordure bg-white p-7 text-center shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                  <div className="font-display text-[clamp(30px,4.5vw,44px)] font-bold leading-none text-rouge">
                    {r.chiffre}
                    <span className="mx-auto mt-3 block h-[3px] w-8 rounded bg-vert" />
                  </div>
                  <p className="mt-3 text-[14px] text-neutral-600">{r.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h3 className="mb-6 mt-16 font-display text-[20px] font-semibold uppercase tracking-tight">
              Nos gymnases
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {GYMNASES.map((g, i) => (
              <Reveal key={g.nom} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                  <IconMapPin className="mt-0.5 h-6 w-6 shrink-0 text-rouge" stroke={1.7} />
                  <div>
                    <span className="font-display text-[16px] font-semibold uppercase leading-tight">{g.nom}</span>
                    <p className="mt-1 text-[14px] text-neutral-600">{g.adresse}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA double */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-bordure bg-white p-10 text-center shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:p-14">
              <h2 className="font-display text-[clamp(24px,3.6vw,36px)] font-bold uppercase leading-tight tracking-tight">
                Envie de faire partie de l'aventure ?
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/inscriptions"
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-rouge px-8 font-display text-[16px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-xl"
                >
                  Inscrire mon enfant / Rejoindre le club <IconArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-[52px] items-center rounded-lg border-2 border-vert px-8 font-display text-[16px] uppercase tracking-wide text-vert-fonce transition-all hover:-translate-y-0.5 hover:bg-vert hover:text-white"
                >
                  Devenir bénévole / Nous aider
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
