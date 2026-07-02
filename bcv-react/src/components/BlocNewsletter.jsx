import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import Reveal from "./Reveal.jsx";

// Bloc newsletter réutilisable (Accueil-like) — titre/texte paramétrables.
export default function BlocNewsletter({ titre, texte }) {
  const [envoye, setEnvoye] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Honeypot : champ caché rempli = bot → on ignore.
    if (e.target.site_internet?.value) return;
    // TODO Phase 4 : brancher Formspree
    setEnvoye(true);
  };

  return (
    <section className="bg-coquille py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="grid items-center gap-10 rounded-2xl border border-bordure bg-white p-8 shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:grid-cols-2 md:p-12">
            <div>
              <h2 className="font-display text-[clamp(24px,3.6vw,36px)] font-bold uppercase leading-none tracking-tight">
                {titre}
              </h2>
              <p className="mt-2 max-w-[46ch] text-[16px] text-neutral-600">{texte}</p>
            </div>

            {envoye ? (
              <div className="flex items-start gap-3 rounded-xl border border-vert/30 bg-coquille p-6">
                <IconCheck className="mt-0.5 h-7 w-7 shrink-0 text-vert" stroke={2} />
                <div>
                  <p className="font-display text-[17px] font-semibold uppercase text-vert-fonce">Merci !</p>
                  <p className="mt-1 text-[15px] text-neutral-600">Votre inscription à la newsletter est bien prise en compte.</p>
                </div>
              </div>
            ) : (
              /* TODO Phase 4 : brancher Formspree */
              <form onSubmit={onSubmit} className="relative">
                {/* Honeypot anti-bot : invisible pour l'utilisateur, piège pour les robots. */}
                <div className="absolute left-[-9999px]" aria-hidden>
                  <label htmlFor="site_internet_nl">Ne pas remplir</label>
                  <input id="site_internet_nl" name="site_internet" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <label htmlFor="email_nl" className="mb-2 block font-display text-[14px] font-semibold uppercase tracking-wide">
                  Votre adresse e-mail
                </label>
                <div className="flex flex-wrap gap-3">
                  <input
                    id="email_nl"
                    name="email"
                    type="email"
                    required
                    placeholder="prenom@exemple.fr"
                    className="min-w-0 flex-1 rounded-lg border border-bordure px-4 py-3.5 text-[16px] outline-none focus:border-vert focus:ring-4 focus:ring-vert/15"
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-[52px] items-center rounded-lg bg-rouge px-6 font-display text-[15px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce"
                  >
                    S'abonner
                  </button>
                </div>
                <label className="mt-3 flex items-start gap-2 text-[14px] text-neutral-500">
                  <input type="checkbox" required className="mt-1" />
                  <span>
                    J'accepte de recevoir les e-mails du club et j'ai lu les{" "}
                    <a href="/mentions-legales" target="_blank" rel="noopener noreferrer" className="text-vert-fonce underline">mentions légales</a>.
                  </span>
                </label>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
