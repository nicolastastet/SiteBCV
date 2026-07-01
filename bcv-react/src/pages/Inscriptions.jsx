import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconRefresh,
  IconUserPlus,
  IconArrowRight,
  IconCheck,
  IconStethoscope,
  IconPhoto,
  IconId,
  IconAlertTriangle,
} from "@tabler/icons-react";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";

const CATEGORIES = ["U7", "U9", "U11", "U13", "U15", "U18", "Seniors", "Loisir", "Je ne sais pas — laissez le club déterminer"];

const ETAPES = [
  { t: "Remplir le formulaire", d: "Complétez le formulaire de pré-inscription ci-dessous." },
  { t: "Le club saisit votre email", d: "Le club enregistre votre email dans FBI, la plateforme fédérale." },
  { t: "La FFBB vous envoie un email", d: "Vous recevez un email de la FFBB pour créer votre dossier en ligne." },
  { t: "Vous complétez votre dossier", d: "Sur le site FFBB — c'est là qu'est proposée l'option assurance (Option A : U7 à U20 inclus / étudiants · Option B : U20+ Seniors)." },
  { t: "Vous réglez la licence auprès du club", d: "Le règlement se fait auprès du club (voir section Paiement), séparément du site FFBB." },
];

const TARIFS = [
  { cat: "U7", prix: "160 €" },
  { cat: "U9", prix: "170 €" },
  { cat: "U11 à U13", prix: "180 €" },
  { cat: "U15", prix: "195 €" },
  { cat: "U18 à Seniors", prix: "210 €" },
];

const DOCUMENTS = [
  { icon: IconStethoscope, t: "Questionnaire de santé / certificat médical", d: "selon votre profil" },
  { icon: IconPhoto, t: "Photo d'identité", d: "" },
  { icon: IconId, t: "Pièce d'identité", d: "" },
];

const FAQ = [
  {
    q: "Je n'ai pas reçu le mail FFBB, que faire ?",
    r: "Vérifiez vos spams. Si le problème persiste, contactez-nous via la page Contact.",
  },
  {
    q: "Comment utiliser mon Pass'Sport ?",
    r: "Le Pass'Sport est accepté en complément d'un règlement par chèque. Apportez votre coupon lors d'une permanence.",
  },
  {
    q: "Mon enfant change de catégorie en cours de saison, que se passe-t-il ?",
    r: "Contactez-nous — nous vous expliquerons la démarche selon votre situation.",
  },
];

/* Champ de formulaire avec label visible. */
function Champ({ id, label, type = "text", required = true, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-display text-[13px] font-semibold uppercase tracking-wide">
        {label} {required && <span className="text-rouge">*</span>}
      </label>
      {children || (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          className="w-full rounded-lg border border-bordure px-4 py-3 text-[16px] outline-none focus:border-rouge focus:ring-4 focus:ring-rouge/10"
        />
      )}
    </div>
  );
}

export default function Inscriptions() {
  const [envoye, setEnvoye] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Honeypot : si le champ caché est rempli, c'est un bot → on ignore.
    if (e.target.site_internet?.value) return;
    // Phase 2 : confirmation côté client uniquement, pas d'envoi serveur.
    // TODO Phase 4 : brancher backend — validation serveur, CSRF, rate-limiting.
    setEnvoye(true);
  };

  return (
    <>
      <Seo
        titre="Inscriptions & Licence"
        description="Rejoignez le BCV : tarifs, démarches et permanences d'inscription pour la saison 2026-2027."
        chemin="/inscriptions"
      />
      {/* En-tête + bifurcation */}
      <section className="relative overflow-hidden bg-rouge">
        <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-20 pt-12 md:pt-16">
          <h1 className="font-display text-[clamp(34px,6vw,60px)] font-bold uppercase leading-[0.95] tracking-tight text-white">
            Inscriptions / Licence
          </h1>
          <p className="mt-4 max-w-[55ch] text-[clamp(16px,2.2vw,19px)] leading-relaxed text-[#ffe3e5]">
            Choisissez votre situation pour accéder directement aux bonnes démarches.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href="#renouvellement"
              className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1"
            >
              <IconRefresh className="h-9 w-9 shrink-0 text-rouge" stroke={1.7} />
              <span className="flex-1 font-display text-[18px] font-semibold uppercase leading-tight text-encre">
                Je suis déjà licencié(e), je renouvelle
              </span>
              <IconArrowRight className="h-5 w-5 shrink-0 text-rouge transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#premiere-inscription"
              className="group flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1"
            >
              <IconUserPlus className="h-9 w-9 shrink-0 text-vert" stroke={1.7} />
              <span className="flex-1 font-display text-[18px] font-semibold uppercase leading-tight text-encre">
                Je m'inscris pour la première fois
              </span>
              <IconArrowRight className="h-5 w-5 shrink-0 text-rouge transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <div aria-hidden className="absolute bottom-0 left-0 right-0 z-0 h-10 bg-white" style={{ clipPath: "polygon(0 100%, 100% 35%, 100% 100%)" }} />
      </section>

      {/* Renouvellement */}
      <section id="renouvellement" className="scroll-mt-24 bg-coquille py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Renouvellement
            </h2>
            <p className="mt-5 max-w-[68ch] text-[17px] leading-relaxed text-neutral-700">
              Un email de renouvellement vous est envoyé directement par la FFBB. Aucune démarche
              auprès du club n'est nécessaire pour le déclencher. Vérifiez vos spams si vous ne le
              recevez pas. Pour le règlement, référez-vous à la section Paiement ci-dessous.
            </p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 font-display text-[15px] uppercase tracking-wide text-rouge hover:underline">
              Une question ? Contactez-nous <IconArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Première inscription — étapes */}
      <section id="premiere-inscription" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Première inscription
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-5">
            {ETAPES.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <li className="flex gap-5 rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rouge font-display text-[18px] font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-display text-[17px] font-semibold uppercase leading-tight">{s.t}</span>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{s.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-coquille p-5">
              <IconAlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-rouge" stroke={1.7} />
              <p className="text-[15px] font-medium text-neutral-700">
                Le règlement de la licence se fait auprès du club, séparément du site FFBB.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Formulaire de pré-inscription */}
      <section id="formulaire" className="scroll-mt-24 bg-coquille py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Formulaire de pré-inscription
            </h2>
          </Reveal>
          <Reveal>
            {envoye ? (
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-vert/30 bg-white p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                <IconCheck className="mt-0.5 h-7 w-7 shrink-0 text-vert" stroke={2} />
                <div>
                  <p className="font-display text-[18px] font-semibold uppercase text-vert-fonce">Demande envoyée</p>
                  <p className="mt-1 text-[15px] text-neutral-600">
                    Merci ! Le club vous recontactera pour la suite des démarches. Vous recevrez ensuite un email de la FFBB.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative mt-8 grid gap-5 rounded-2xl border border-bordure bg-white p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:p-9">
                {/* TODO Phase 4 : brancher backend — validation serveur, CSRF, rate-limiting */}
                {/* Honeypot anti-bot : invisible pour l'utilisateur, piège pour les robots. */}
                <div className="absolute left-[-9999px]" aria-hidden>
                  <label htmlFor="site_internet">Ne pas remplir</label>
                  <input id="site_internet" name="site_internet" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <Champ id="nom" label="Prénom et nom de l'enfant / joueur" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Champ id="naissance" label="Date de naissance" type="date" />
                  <Champ id="telephone" label="Téléphone" type="tel" />
                </div>
                <Champ id="email" label="Email parent / joueur" type="email" />
                <Champ id="categorie" label="Catégorie pressentie">
                  <select
                    id="categorie"
                    name="categorie"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-bordure bg-white px-4 py-3 text-[16px] outline-none focus:border-rouge focus:ring-4 focus:ring-rouge/10"
                  >
                    <option value="" disabled>Choisir une catégorie…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Champ>

                <label className="flex items-start gap-2.5 text-[14px] text-neutral-600">
                  <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0" />
                  <span>
                    J'accepte que les informations saisies soient utilisées par le club pour traiter ma demande
                    d'inscription, conformément aux mentions légales. <span className="text-rouge">*</span>
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-rouge px-8 font-display text-[16px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-xl"
                >
                  Envoyer ma pré-inscription <IconArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Grille tarifaire */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Tarifs des licences
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-8 overflow-hidden rounded-xl border border-bordure shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b border-bordure bg-white px-6 py-4 font-display text-[13px] uppercase tracking-wide">Catégorie</th>
                    <th className="border-b border-bordure bg-white px-6 py-4 text-right font-display text-[13px] uppercase tracking-wide">Tarif licence</th>
                  </tr>
                </thead>
                <tbody>
                  {TARIFS.map((t, i) => (
                    <tr key={t.cat} className={i % 2 ? "bg-coquille/50" : "bg-white"}>
                      <td className="border-b border-bordure px-6 py-4 font-display text-[16px] font-semibold uppercase">{t.cat}</td>
                      <td className="border-b border-bordure px-6 py-4 text-right text-[16px] tabular-nums text-neutral-700">{t.prix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-neutral-500">
              Une option assurance complémentaire est proposée directement sur le site FFBB lors de la
              création / renouvellement de la licence (Option A : U7 à U20 / étudiants · Option B : U20+ en
              activité à Seniors). Son coût est géré par la FFBB, pas par le club.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Documents requis */}
      <section className="bg-coquille py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Documents requis
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {DOCUMENTS.map((d, i) => {
              const Icon = d.icon;
              return (
                <Reveal key={d.t} delay={i * 0.06}>
                  <div className="flex h-full items-start gap-3 rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                    <Icon className="mt-0.5 h-7 w-7 shrink-0 text-rouge" stroke={1.7} />
                    <div>
                      <span className="font-display text-[15px] font-semibold uppercase leading-tight">{d.t}</span>
                      {d.d && <p className="mt-1 text-[14px] text-neutral-500">{d.d}</p>}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Paiement */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Paiement
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-8 grid gap-5">
              {/* TODO : remplacer # par le vrai lien HelloAsso */}
              <a
                href="#"
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-lg bg-rouge px-8 font-display text-[17px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-xl"
              >
                Payer ma licence en ligne (HelloAsso)
              </a>
              <p className="text-[16px] leading-relaxed text-neutral-700">
                <span className="font-semibold">Par chèque</span> à l'ordre du BCV, remis au club lors des permanences.
              </p>
              <div className="rounded-xl bg-coquille p-5 text-[15px] leading-relaxed text-neutral-700">
                Le Pass'Sport et les coupons ANCV sont acceptés <span className="font-semibold">uniquement</span> en
                complément d'un règlement par chèque au club — non utilisables via HelloAsso.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ parents */}
      <section className="bg-coquille py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <h2 className="font-display text-[clamp(24px,3.6vw,34px)] font-bold uppercase leading-none tracking-tight">
              Questions fréquentes
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <details className="group rounded-xl border border-bordure bg-white px-6 py-4 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[16px] font-semibold uppercase leading-tight">
                    {item.q}
                    <IconArrowRight className="h-5 w-5 shrink-0 text-rouge transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{item.r}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
