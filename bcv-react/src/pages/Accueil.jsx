import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  IconCalendar,
  IconTrophy,
  IconMail,
  IconClipboard,
  IconArrowRight,
  IconArrowNarrowRight,
  IconMapPin,
  IconBallBasketball,
  IconRun,
} from "@tabler/icons-react";
import Reveal from "../components/Reveal.jsx";
import Stat from "../components/Stat.jsx";
import Seo from "../components/Seo.jsx";
import { EASE, LOGO_BLANC, img } from "../lib.js";

const JSONLD_CLUB = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Basket Club Verfeillois",
  url: "https://basketclubverfeillois.fr",
  sport: "Basketball",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Verfeil",
    postalCode: "31590",
    addressCountry: "FR",
  },
};

/* ---------- Hero ---------- */
function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax multi-couches : la photo descend, le logo filigrane contre-bouge, léger zoom.
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const words = ["Le", "basket", "à"];
  return (
    <section ref={ref} className="relative overflow-hidden bg-rouge">
      {/* Conteneur plafonné : au-delà de ~1800px le fond rouge remplit, le layout reste centré (évite l'étirement sur écrans ultra-larges) */}
      <div className="relative mx-auto w-full max-w-[1800px] md:flex md:min-h-[640px] md:items-center">
        <motion.img
          src={LOGO_BLANC}
          alt=""
          aria-hidden
          style={{ y: yLogo }}
          initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -12 }}
          animate={{ opacity: 0.07, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="pointer-events-none absolute -left-24 -top-24 z-0 hidden h-[520px] w-[520px] select-none md:block"
        />

        {/* Photo droite avec diagonale */}
        <div
          className="absolute inset-y-0 right-0 z-[5] hidden w-[55%] overflow-hidden md:block lg:w-[56%]"
          style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          <motion.img
            src="/hero-equipe.jpg"
            alt="Les équipes du Basket Club Verfeillois réunies au gymnase lors du tournoi"
            style={{ y: yImg, scale: scaleImg }}
            className="absolute inset-x-0 -top-24 h-[calc(100%+12rem)] w-full origin-center object-cover object-[center_35%]"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 z-10 w-full bg-rouge-fonce"
            style={{ clipPath: "polygon(12% 0, 15% 0, 3% 100%, 0% 100%)" }}
          />
        </div>

        {/* Texte gauche */}
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6">
          <div className="flex flex-col justify-center py-16 md:max-w-[520px] md:py-24">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4 font-display text-[13px] uppercase tracking-[0.2em] text-[#ffd7da]"
            >
              <IconMapPin className="-mt-1 mr-1 inline h-4 w-4" /> Verfeil · Haute-Garonne
            </motion.p>
            <h1 className="font-display text-[clamp(46px,7vw,76px)] font-bold uppercase leading-[0.9] tracking-tight text-white">
              <span className="block overflow-hidden">
                {words.map((w, i) => (
                  <motion.span
                    key={w}
                    className="mr-3 inline-block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="block text-vert-vif"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
              >
                Verfeil
              </motion.span>
            </h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="mt-5 font-display text-[clamp(15px,2vw,18px)] uppercase tracking-wide text-white"
            >
              Le basket à Verfeil, pour tous, depuis 1923
            </motion.p>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: EASE }}
              className="mt-3 max-w-[46ch] text-[clamp(17px,2.2vw,19px)] leading-relaxed text-[#ffe3e5]"
            >
              De l'école de basket aux équipes Seniors, rejoignez un club familial où
              convivialité rime avec esprit de compétition.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <Link
                to="/inscriptions"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-white px-8 font-display text-[16px] uppercase tracking-wide text-rouge-fonce transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Rejoindre le club
              </Link>
              <Link
                to="/equipes"
                className="group inline-flex items-center gap-2 border-b-2 border-vert-vif pb-1 font-display text-[15px] uppercase tracking-wide text-white transition-colors hover:text-vert-vif"
              >
                Découvrir les équipes
                <IconArrowNarrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Photo mobile */}
        <div className="block md:hidden px-6 pb-12">
          <img
            src="/hero-equipe.jpg"
            alt="Les équipes du Basket Club Verfeillois réunies au gymnase lors du tournoi"
            className="aspect-video w-full rounded-xl object-cover object-[center_35%]"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 z-20 h-12 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 18%, 100% 100%)" }}
      />
    </section>
  );
}

/* ---------- Bandeau chiffres ---------- */
function Stats() {
  return (
    <section className="border-b border-bordure" aria-label="Le club en chiffres">
      <div className="mx-auto flex max-w-[1180px] flex-wrap px-6">
        <Stat value={200} suffix="+" label="Licenciés" />
        <Stat value={15} label="Équipes engagées" />
        <Stat value={103} label="Années d'histoire" />
        <Stat value={2} label="Gymnases pour s'entraîner" />
      </div>
    </section>
  );
}

/* ---------- Accès rapides (4 blocs) ---------- */
function Bento() {
  const cards = [
    { titre: "Planning d'entraînement", sous: "Horaires d'entraînement", icon: IconCalendar, to: "/planning" },
    { titre: "Prochains matchs", sous: "Calendrier & résultats", icon: IconTrophy, to: "/calendrier" },
    { titre: "Contact", sous: "Qui contacter ?", icon: IconMail, to: "/contact" },
    { titre: "Inscriptions", sous: "Tarifs & démarches", icon: IconClipboard, to: "/inscriptions", rouge: true },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const rouge = c.rouge;
            return (
              <Reveal key={c.titre} delay={i * 0.06}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: EASE }} className="h-full">
                  <Link
                    to={c.to}
                    className={`flex h-full min-h-[160px] flex-col gap-1.5 rounded-xl border p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)] ${
                      rouge ? "border-transparent bg-rouge text-white hover:bg-rouge-fonce" : "border-bordure bg-white hover:border-[#f3c9cd]"
                    }`}
                  >
                    <Icon className={`h-8 w-8 ${rouge ? "text-white" : "text-rouge"}`} stroke={1.7} />
                    <div className="mt-auto">
                      <span className={`font-display text-[19px] uppercase leading-tight ${rouge ? "text-white" : "text-encre"}`}>
                        {c.titre}
                      </span>
                      <p className={`text-[14px] ${rouge ? "text-[#ffd7da]" : "text-neutral-500"}`}>
                        {c.sous}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Le club en bref ---------- */
function Club() {
  return (
    <section id="le-club" className="bg-coquille py-20 md:py-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 md:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <img
            src={img("bcv-entrainement-gymnase", 900, 680)}
            alt="Entraînement au gymnase municipal"
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-[0_14px_40px_rgba(22,22,22,0.12)]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-3 font-display text-[13px] uppercase tracking-[0.2em] text-rouge">Le club</p>
          <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
            Un club familial, sportif & éducatif
          </h2>
          <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-neutral-600">
            Fondé sur des valeurs de respect, de solidarité et de partage, le Basket Club
            Verfeillois est une véritable institution locale. Au-delà des résultats sur le
            terrain, notre projet est d'accompagner et de former des joueurs épanouis dans un
            cadre profondément familial. Venez transpirer, progresser et vibrer avec nous sur
            les parquets !
          </p>
          <Link
            to="/le-club"
            className="mt-7 inline-flex min-h-[48px] items-center rounded-lg border-2 border-vert px-7 font-display text-[16px] uppercase tracking-wide text-vert-fonce transition-all hover:-translate-y-0.5 hover:bg-vert hover:text-white"
          >
            Découvrir le club
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Aperçu équipes / catégories (3 vignettes) ---------- */
function ApercuEquipes() {
  const familles = [
    {
      nom: "Mini Basket",
      desc: "Apprendre les bases du jeu et se développer en s'amusant dès le plus jeune âge.",
      to: "/equipes/mini-basket",
      icon: IconBallBasketball,
    },
    {
      nom: "Les Jeunes",
      desc: "Se perfectionner, forger son esprit d'équipe et goûter à l'adrénaline de la compétition.",
      to: "/equipes/jeunes",
      icon: IconRun,
    },
    {
      nom: "Pôle Seniors",
      desc: "Du basket intense sur le terrain, suivi de nos troisièmes mi-temps au club-house !",
      to: "/equipes/seniors",
      icon: IconTrophy,
    },
  ];
  return (
    <section id="equipes" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
            Trouvez la catégorie de votre enfant
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {familles.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.nom} delay={i * 0.08}>
                <Link
                  to={f.to}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-bordure bg-white shadow-[0_8px_24px_rgba(22,22,22,0.06)] transition-all hover:-translate-y-1.5 hover:border-[#f3c9cd] hover:shadow-[0_16px_40px_rgba(22,22,22,0.12)]"
                >
                  {/* PHOTO — à remplacer */}
                  <div className="flex aspect-[16/10] items-center justify-center bg-coquille">
                    <Icon className="h-14 w-14 text-rouge" stroke={1.4} />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="font-display text-[clamp(20px,2.6vw,26px)] font-bold uppercase leading-none tracking-tight">
                      {f.nom}
                    </span>
                    <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">{f.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1 font-display text-[14px] uppercase tracking-wide text-rouge">
                      Découvrir
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
  );
}

/* ---------- Les coulisses du BCV (actualités) ---------- */
function Actus() {
  {/* TODO Phase 4 : remplacer par données Decap CMS */}
  const articles = [
    { t: "Résumé du week-end", d: "Date à venir" },
    { t: "Vie du club", d: "Date à venir" },
    { t: "Galerie photos", d: "Date à venir" },
  ];
  return (
    <section id="actus" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
            Les coulisses du BCV
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-bordure shadow-[0_8px_24px_rgba(22,22,22,0.06)]">
                {/* PHOTO — à remplacer */}
                <div className="aspect-[16/10] bg-coquille" aria-hidden />
                <div className="p-6">
                  <time className="text-[13px] text-neutral-500">{a.d}</time>
                  <h3 className="mt-1 font-display text-[20px] font-semibold uppercase leading-tight">{a.t}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/actus" className="inline-flex items-center gap-1 font-display text-[14px] uppercase tracking-wide text-rouge hover:underline">
            Lire toutes nos actualités <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bandeau Inscriptions ---------- */
function BandeauInscriptions() {
  return (
    <section className="bg-vert py-16 md:py-20">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-8 px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight text-white">
            Prêt à mouiller le maillot ?
          </h2>
          {/* TODO rentrée sept. 2026 : remplacer par :
            "Rejoignez-nous pour la saison 2026/2027 — Pass'Sport et coupons ANCV acceptés."
          */}
          <p className="mt-2 max-w-[52ch] text-[17px] text-[#eaffef]">
            Les entraînements reprennent prochainement, encore un peu de patience !
            Retrouvez les horaires, les tarifs et toutes les modalités dans très peu de temps.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            to="/inscriptions"
            className="inline-flex min-h-[56px] items-center rounded-lg bg-white px-9 font-display text-[18px] uppercase tracking-wide text-vert-fonce transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Je veux m'inscrire
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Partenaires (marquee) ---------- */
function Partenaires() {
  const reduce = useReducedMotion();
  {/* TODO : remplacer par les vrais logos partenaires */}
  const logos = ["Partenaire", "Partenaire", "Partenaire", "Partenaire", "Partenaire", "Partenaire"];
  // Un "bloc" assez large pour couvrir un écran ultra-large (34" ≈ 3440px), puis dupliqué pour la boucle -50%.
  const bloc = [...logos, ...logos, ...logos];
  const row = [...bloc, ...bloc];
  return (
    <section className="overflow-hidden py-16" aria-label="Nos partenaires">
      <p className="mb-8 text-center font-display text-[13px] uppercase tracking-[0.2em] text-rouge">
        Ils soutiennent le club
      </p>
      <div className="group relative flex overflow-hidden">
        {/* Dégradés blancs sur les bords : les logos apparaissent / disparaissent en douceur */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent md:w-40" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent md:w-40" />

        <motion.div
          className="flex shrink-0 gap-4 pr-4"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {row.map((l, i) => (
            <div
              key={i}
              className="flex h-20 w-52 shrink-0 items-center justify-center rounded-lg border border-bordure bg-coquille font-display text-[15px] uppercase tracking-wide text-neutral-400"
            >
              {l}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Newsletter ---------- */
function Newsletter() {
  return (
    <section id="newsletter" className="bg-coquille py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="grid items-center gap-10 rounded-2xl border border-bordure bg-white p-8 shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:grid-cols-2 md:p-12">
            <div>
              <h2 className="font-display text-[clamp(24px,3.6vw,36px)] font-bold uppercase leading-none tracking-tight">
                Ne manquez aucune info !
              </h2>
              <p className="mt-2 max-w-[46ch] text-[16px] text-neutral-600">
                Inscrivez-vous pour recevoir les derniers résultats, les événements du club
                et les bonnes nouvelles du BCV directement dans votre boîte mail.
              </p>
            </div>
            {/* TODO Phase 4 : brancher Formspree */}
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              {/* Honeypot anti-bot : invisible pour l'utilisateur, piège pour les robots. */}
              <div className="absolute left-[-9999px]" aria-hidden>
                <label htmlFor="site_internet">Ne pas remplir</label>
                <input id="site_internet" name="site_internet" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <label htmlFor="email" className="mb-2 block font-display font-semibold uppercase text-[14px] tracking-wide">
                Votre adresse e-mail
              </label>
              <div className="flex flex-wrap gap-3">
                <input
                  id="email"
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
                  <a href="#" className="text-vert-fonce underline">mentions légales</a>.
                </span>
              </label>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Accueil() {
  return (
    <>
      <Seo
        titre="Accueil"
        description="Club de basket à Verfeil (31). Du mini-basket aux seniors, rejoignez une famille de plus de 200 licenciés."
        chemin="/"
        jsonLd={JSONLD_CLUB}
      />
      <Hero />
      <Stats />
      <Bento />
      <Club />
      <ApercuEquipes />
      <Actus />
      <BandeauInscriptions />
      <Partenaires />
      <Newsletter />
    </>
  );
}
