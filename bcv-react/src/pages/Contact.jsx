import { useState } from "react";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconClock,
  IconCheck,
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";

const MOTIFS = [
  "Question générale",
  "Inscription / Licence",
  "Sponsoring / Partenariat",
  "Question financière (cotisation, remboursement)",
  "Presse / Média",
];

export default function Contact() {
  const [envoye, setEnvoye] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Honeypot : champ caché rempli = bot → on ignore.
    if (e.target.site_internet?.value) return;
    // Phase 2 : confirmation côté client uniquement, pas d'envoi serveur.
    // TODO Phase 4 : brancher backend — validation serveur, CSRF, rate-limiting.
    setEnvoye(true);
  };

  return (
    <>
      <SectionHero titre="Contact" accroche="Une question ? Écrivez-nous, on vous répond vite." />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Formulaire */}
          <Reveal>
            {envoye ? (
              <div className="flex items-start gap-3 rounded-2xl border border-vert/30 bg-white p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                <IconCheck className="mt-0.5 h-7 w-7 shrink-0 text-vert" stroke={2} />
                <div>
                  <p className="font-display text-[18px] font-semibold uppercase text-vert-fonce">Message envoyé</p>
                  <p className="mt-1 text-[15px] text-neutral-600">Merci ! Nous vous répondrons dès que possible.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative grid gap-5 rounded-2xl border border-bordure bg-white p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:p-9">
                {/* TODO Phase 4 : brancher backend — validation serveur, CSRF, rate-limiting */}
                {/* Honeypot anti-bot : invisible pour l'utilisateur. */}
                <div className="absolute left-[-9999px]" aria-hidden>
                  <label htmlFor="site_internet">Ne pas remplir</label>
                  <input id="site_internet" name="site_internet" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="nom" className="mb-1.5 block font-display text-[13px] font-semibold uppercase tracking-wide">
                    Nom <span className="text-rouge">*</span>
                  </label>
                  <input id="nom" name="nom" type="text" required className="w-full rounded-lg border border-bordure px-4 py-3 text-[16px] outline-none focus:border-rouge focus:ring-4 focus:ring-rouge/10" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-display text-[13px] font-semibold uppercase tracking-wide">
                    Email <span className="text-rouge">*</span>
                  </label>
                  <input id="email" name="email" type="email" required className="w-full rounded-lg border border-bordure px-4 py-3 text-[16px] outline-none focus:border-rouge focus:ring-4 focus:ring-rouge/10" />
                </div>
                <div>
                  <label htmlFor="motif" className="mb-1.5 block font-display text-[13px] font-semibold uppercase tracking-wide">
                    Motif <span className="text-rouge">*</span>
                  </label>
                  <select id="motif" name="motif" required defaultValue="" className="w-full rounded-lg border border-bordure bg-white px-4 py-3 text-[16px] outline-none focus:border-rouge focus:ring-4 focus:ring-rouge/10">
                    <option value="" disabled>Choisir un motif…</option>
                    {MOTIFS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block font-display text-[13px] font-semibold uppercase tracking-wide">
                    Message <span className="text-rouge">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={5} className="w-full rounded-lg border border-bordure px-4 py-3 text-[16px] outline-none focus:border-rouge focus:ring-4 focus:ring-rouge/10" />
                </div>

                <label className="flex items-start gap-2.5 text-[14px] text-neutral-600">
                  <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0" />
                  <span>
                    J'accepte que mes informations soient utilisées par le club pour traiter ma demande,
                    conformément aux mentions légales. <span className="text-rouge">*</span>
                  </span>
                </label>

                <button type="submit" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-rouge px-8 font-display text-[16px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-xl">
                  Envoyer <IconArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}
          </Reveal>

          {/* Coordonnées */}
          <Reveal delay={0.1}>
            <div className="grid gap-6">
              <div className="rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                <p className="mb-4 font-display text-[14px] font-semibold uppercase tracking-wide text-rouge">Nous joindre</p>
                <ul className="grid gap-3 text-[15px]">
                  <li className="flex items-center gap-3">
                    <IconMail className="h-5 w-5 shrink-0 text-rouge" stroke={1.7} />
                    <a href="mailto:contact@bcv-verfeil.fr" className="text-neutral-700 hover:text-encre hover:underline">contact@bcv-verfeil.fr</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <IconPhone className="h-5 w-5 shrink-0 text-rouge" stroke={1.7} />
                    {/* TODO : remplacer par le vrai numéro */}
                    <span className="text-neutral-700">06 XX XX XX XX</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                <p className="mb-4 font-display text-[14px] font-semibold uppercase tracking-wide text-rouge">Adresse</p>
                <div className="flex items-start gap-3">
                  <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-rouge" stroke={1.7} />
                  <div className="text-[15px] text-neutral-700">
                    <p>Gymnase municipal, 31590 Verfeil</p>
                    <a
                      href="https://maps.google.com/?q=Gymnase+Verfeil+31590"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-display text-[13px] uppercase tracking-wide text-rouge hover:underline"
                    >
                      Voir sur Google Maps <IconArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-coquille p-6">
                <IconClock className="mt-0.5 h-6 w-6 shrink-0 text-vert" stroke={1.7} />
                <div>
                  <p className="font-display text-[14px] font-semibold uppercase tracking-wide">Permanences</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">
                    Pour les inscriptions : les samedis de septembre, de 10h à 12h au gymnase.
                    Hors de ces horaires, contactez-nous via le formulaire.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-bordure bg-white p-6 shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                <p className="mb-4 font-display text-[14px] font-semibold uppercase tracking-wide text-rouge">Suivez-nous</p>
                <div className="flex gap-3">
                  {/* TODO : URL Facebook BCV */}
                  <a href="#" rel="noopener noreferrer" aria-label="Facebook BCV" className="flex h-11 w-11 items-center justify-center rounded-lg border border-bordure text-encre transition-colors hover:border-rouge hover:text-rouge">
                    <IconBrandFacebook className="h-5 w-5" />
                  </a>
                  {/* TODO : URL Instagram BCV */}
                  <a href="#" rel="noopener noreferrer" aria-label="Instagram BCV" className="flex h-11 w-11 items-center justify-center rounded-lg border border-bordure text-encre transition-colors hover:border-rouge hover:text-rouge">
                    <IconBrandInstagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
