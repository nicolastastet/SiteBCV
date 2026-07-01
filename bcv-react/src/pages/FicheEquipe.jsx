import { useParams, Link } from "react-router-dom";
import { IconCalendarEvent, IconMapPin, IconUsers, IconArrowRight } from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import PhotoAvecFallback from "../components/PhotoAvecFallback.jsx";
import NotFound from "./NotFound.jsx";
import { getEquipe, FAMILLES } from "../data/equipes.js";

// Bloc « infos à venir » sobre, pour ne pas laisser de section vide.
function BlocInfo({ icon: Icon, titre }) {
  return (
    <div className="rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
      <div className="flex items-center gap-2.5">
        <Icon className="h-6 w-6 shrink-0 text-rouge" stroke={1.7} />
        <span className="font-display text-[16px] font-semibold uppercase leading-tight">{titre}</span>
      </div>
      <p className="mt-3 text-[15px] italic text-neutral-500">Infos à venir pour cette équipe.</p>
    </div>
  );
}

export default function FicheEquipe() {
  const { slug } = useParams();
  const equipe = getEquipe(slug);

  // Slug inconnu : page 404 propre plutôt qu'une fiche vide.
  if (!equipe) return <NotFound />;

  const famille = FAMILLES[equipe.famille];

  return (
    <>
      <SectionHero
        titre={equipe.nom}
        accroche={equipe.age || undefined}
        breadcrumb={[
          { label: "Équipes", to: "/equipes" },
          { label: famille.nom, to: `/equipes/${famille.slug}` },
          { label: equipe.nom },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          {/* Photo d'équipe : /images/equipes/[slug].jpg — placeholder tant que le fichier n'existe pas */}
          <Reveal>
            <PhotoAvecFallback
              src={`/images/equipes/${equipe.slug}.jpg`}
              alt={`Équipe ${equipe.nom}`}
              className="aspect-[16/7] w-full rounded-xl object-cover shadow-[0_14px_40px_rgba(22,22,22,0.10)]"
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal>
              <div className="rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                <div className="flex items-center gap-2.5">
                  <IconUsers className="h-6 w-6 shrink-0 text-rouge" stroke={1.7} />
                  <span className="font-display text-[16px] font-semibold uppercase leading-tight">Encadrement</span>
                </div>
                <p className="mt-3 text-[15px] text-neutral-600">
                  Retrouvez les coachs et le bureau sur la page{" "}
                  <Link to="/le-club" className="font-semibold text-rouge hover:underline">Le Club</Link>.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <BlocInfo icon={IconCalendarEvent} titre="Entraînements" />
            </Reveal>
            <Reveal delay={0.12}>
              <BlocInfo icon={IconMapPin} titre="Lieu(x)" />
            </Reveal>
          </div>

          {/* Aucune liste de joueurs affichée — protection des mineurs (RGPD). */}

          {/* CTA */}
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-coquille p-10 text-center">
              <h2 className="font-display text-[clamp(22px,3.4vw,32px)] font-bold uppercase leading-tight tracking-tight">
                Rejoindre l'équipe {equipe.nom}
              </h2>
              <Link
                to="/inscriptions"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-rouge px-8 font-display text-[16px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-xl"
              >
                S'inscrire dans cette catégorie <IconArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
