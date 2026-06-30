import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  animate,
  useScroll,
  useTransform,
  useMotionValue,
} from "motion/react";
import {
  IconCalendarEvent,
  IconTrophy,
  IconMail,
  IconClipboardList,
  IconArrowRight,
  IconArrowNarrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconMenu2,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMapPin,
} from "@tabler/icons-react";

const EASE = [0.16, 1, 0.3, 1];
const LOGO = "/logo-bcv.png";
const LOGO_BLANC = "/logo-bcv-blanc.png";
const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ---------- helpers motion ---------- */
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Stat({ value, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);
  return (
    <div ref={ref} className="flex-1 min-w-[150px] border-r border-bordure last:border-r-0 px-6 py-12 text-center">
      <div className="font-display font-bold text-rouge leading-none text-[clamp(38px,5.4vw,52px)]">
        {n}
        {suffix}
        <span className="mx-auto mt-2.5 block h-[3px] w-7 rounded bg-vert" />
      </div>
      <span className="mt-2 block text-[13px] uppercase tracking-[0.06em] text-neutral-500">
        {label}
      </span>
    </div>
  );
}

/* ---------- sections ---------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Le Club", "Équipes", "Planning", "Actus", "Contact"];
  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all ${
        scrolled ? "border-bordure bg-white/90 shadow-sm" : "border-transparent bg-white/70"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-6 py-3">
        <a href="#" className="flex items-center gap-3" aria-label="Accueil BCV">
          <img src={LOGO} alt="Basket Club Verfeillois" className="h-12 w-12 object-contain" />
          <span className="hidden font-display text-[20px] font-bold uppercase leading-none tracking-tight sm:block">
            Basket Club<br /><span className="text-rouge">Verfeillois</span>
          </span>
        </a>
        <nav className="ml-6 hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className="font-display text-[14px] uppercase tracking-wide text-encre/80 transition-colors hover:text-rouge"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#inscriptions"
          className="ml-auto inline-flex min-h-[44px] items-center rounded-lg bg-rouge px-5 font-display text-[14px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-lg"
        >
          S'inscrire
        </a>
        <button className="md:hidden" aria-label="Menu">
          <IconMenu2 className="text-encre" />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax multi-couches : la photo descend, le logo filigrane contre-bouge, léger zoom.
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const words = ["Le", "basket"];
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
              à Verfeil
            </motion.span>
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
            className="mt-5 max-w-[40ch] text-[clamp(17px,2.2vw,19px)] leading-relaxed text-[#ffe3e5]"
          >
            Du mini-basket aux seniors. On joue, on progresse, on gagne ensemble.
            Saison 2026-2027 : inscriptions ouvertes.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <a
              href="#inscriptions"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-white px-8 font-display text-[16px] uppercase tracking-wide text-rouge-fonce transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Rejoindre le club
            </a>
            <a
              href="#planning"
              className="group inline-flex items-center gap-2 border-b-2 border-vert-vif pb-1 font-display text-[15px] uppercase tracking-wide text-white transition-colors hover:text-vert-vif"
            >
              Voir les créneaux
              <IconArrowNarrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
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

function Stats() {
  return (
    <section className="border-b border-bordure" aria-label="Le club en chiffres">
      <div className="mx-auto flex max-w-[1180px] flex-wrap px-6">
        <Stat value={180} label="licenciés" />
        <Stat value={12} label="équipes" />
        <Stat value={40} label="ans d'existence" />
        <Stat value={8} label="éducateurs diplômés" />
      </div>
    </section>
  );
}

function Bento() {
  const cards = [
    {
      titre: "Inscriptions",
      sous: "Tarifs, démarches et permanences de septembre",
      icon: IconClipboardList,
      href: "#inscriptions",
      cls: "md:col-span-2 md:row-span-2 bg-rouge text-white hover:bg-rouge-fonce justify-between",
      big: true,
    },
    { titre: "Planning", sous: "Horaires d'entraînement", icon: IconCalendarEvent, href: "#planning", cls: "bg-white" },
    {
      titre: "Prochains matchs",
      sous: "Calendrier & résultats",
      icon: IconTrophy,
      href: "#actus",
      cls: "bg-vert text-white hover:bg-vert-fonce",
      green: true,
    },
    { titre: "Contact", sous: "Qui contacter ?", icon: IconMail, href: "#contact", cls: "bg-white" },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const dark = c.big || c.green;
            return (
              <Reveal key={c.titre} delay={i * 0.06} className={c.cls.includes("col-span-2") ? "md:col-span-2 md:row-span-2" : ""}>
                <motion.a
                  href={c.href}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={`flex h-full flex-col gap-1.5 rounded-xl border p-7 shadow-[0_8px_24px_rgba(22,22,22,0.06)] ${
                    dark ? "border-transparent" : "border-bordure hover:border-[#f3c9cd]"
                  } ${c.cls}`}
                >
                  <Icon className={`${c.big ? "h-9 w-9" : "h-7 w-7"} ${dark ? "text-white" : "text-rouge"}`} stroke={1.7} />
                  <div className={c.big ? "mt-auto" : ""}>
                    <span className={`font-display uppercase leading-tight ${c.big ? "text-[clamp(24px,3vw,34px)]" : "text-[19px]"} ${dark ? "text-white" : "text-encre"}`}>
                      {c.titre}
                    </span>
                    <p className={`text-[14px] ${c.big ? "text-[#ffd7da]" : c.green ? "text-[#eaffef]" : "text-neutral-500"}`}>
                      {c.sous}
                    </p>
                  </div>
                </motion.a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
          <p className="mt-5 max-w-[55ch] text-[17px] leading-relaxed text-neutral-600">
            Depuis 1984, le BCV fait grandir les jeunes de Verfeil sur et en dehors du terrain.
            Encadrement diplômé, esprit d'équipe et bonne humeur : ici, on vient progresser autant
            que se faire des amis.
          </p>
          <a
            href="#le-club"
            className="mt-7 inline-flex min-h-[48px] items-center rounded-lg border-2 border-vert px-7 font-display text-[16px] uppercase tracking-wide text-vert-fonce transition-all hover:-translate-y-0.5 hover:bg-vert hover:text-white"
          >
            Découvrir le club
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Equipes() {
  const eq = [
    { age: "Baby / U7", det: "3 à 6 ans", seed: "baby" },
    { age: "U9 · U11", det: "7 à 10 ans", seed: "u9" },
    { age: "U13 · U15", det: "11 à 14 ans", seed: "u13" },
    { age: "U17 · U18", det: "15 à 17 ans", seed: "u17" },
    { age: "Seniors", det: "18 ans et +", seed: "seniors" },
    { age: "Loisir", det: "Tous niveaux", seed: "loisir" },
  ];
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);

  // Calcule la distance de défilement possible (largeur du rail - largeur visible)
  useEffect(() => {
    const calc = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const diff = trackRef.current.scrollWidth - viewportRef.current.offsetWidth;
      setMaxDrag(diff > 0 ? diff : 0);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Flèches : avance/recule d'une carte (256px = 240 + 16 de gap)
  const move = (dir) => {
    const target = Math.max(-maxDrag, Math.min(0, x.get() - dir * 256));
    animate(x, target, { duration: 0.5, ease: EASE });
  };

  return (
    <section id="équipes" className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
                Trouvez la catégorie de votre enfant
              </h2>
              <p className="mt-4 max-w-[60ch] text-[17px] text-neutral-600">
                Du baby-basket aux seniors, chaque âge a son équipe. Faites glisser ou utilisez les flèches.
              </p>
            </div>
            {/* Flèches de navigation (cachées sur mobile, le drag suffit) */}
            <div className="hidden shrink-0 gap-3 sm:flex">
              <button
                onClick={() => move(-1)}
                aria-label="Catégorie précédente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bordure text-encre transition-colors hover:border-rouge hover:text-rouge"
              >
                <IconChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => move(1)}
                aria-label="Catégorie suivante"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bordure text-encre transition-colors hover:border-rouge hover:text-rouge"
              >
                <IconChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>

        <div ref={viewportRef} className="mt-8 overflow-hidden">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.08}
            style={{ x }}
            className="flex cursor-grab gap-4 active:cursor-grabbing"
          >
            {eq.map((e) => (
              <motion.a
                key={e.age}
                href="#équipes"
                onClick={(ev) => ev.preventDefault()}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="group relative block h-64 w-[240px] shrink-0 overflow-hidden rounded-xl border border-bordure shadow-[0_8px_24px_rgba(22,22,22,0.06)]"
              >
                <img
                  src={img(`bcv-${e.seed}`, 480, 520)}
                  alt={`Catégorie ${e.age}`}
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-encre/85 via-encre/20 to-transparent" />
                <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-rouge transition-transform duration-300 group-hover:scale-y-100" />
                <div className="absolute bottom-0 p-5 text-white">
                  <span className="font-display text-[22px] font-semibold uppercase">{e.age}</span>
                  <p className="text-[14px] text-white/80">{e.det}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Actus() {
  return (
    <section id="actus" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight">
            La vie du club
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <motion.a
              href="#actus"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-bordure shadow-[0_8px_24px_rgba(22,22,22,0.06)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={img("bcv-victoire-u13", 900, 560)} alt="Belle victoire des U13" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <time className="text-[13px] text-neutral-500">20 juin 2026</time>
                <h3 className="mt-1 font-display text-[22px] font-semibold uppercase leading-tight">
                  Belle victoire des U13 en finale !
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 font-display text-[14px] uppercase tracking-wide text-rouge">
                  Lire l'article <IconArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          </Reveal>
          <div className="grid gap-6">
            {[
              { d: "14 juin 2026", t: "Tournoi de fin de saison", s: "tournoi" },
              { d: "5 juin 2026", t: "Portrait : notre coach U15", s: "coach" },
            ].map((a, i) => (
              <Reveal key={a.t} delay={0.1 + i * 0.08}>
                <motion.a
                  href="#actus"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="group grid grid-cols-[130px_1fr] overflow-hidden rounded-xl border border-bordure shadow-[0_8px_24px_rgba(22,22,22,0.06)]"
                >
                  <img src={img(`bcv-${a.s}`, 260, 260)} alt={a.t} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-5">
                    <time className="text-[13px] text-neutral-500">{a.d}</time>
                    <h3 className="mt-1 font-display text-[18px] font-semibold uppercase leading-tight">{a.t}</h3>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <a href="#actus" className="inline-flex items-center gap-1 font-display text-[14px] uppercase tracking-wide text-rouge hover:underline">
            Toutes les actualités <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Inscriptions() {
  return (
    <section id="inscriptions" className="bg-vert py-16 md:py-20">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-8 px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-bold uppercase leading-none tracking-tight text-white">
            Inscriptions ouvertes
          </h2>
          <p className="mt-2 max-w-[50ch] text-[17px] text-[#eaffef]">
            Permanences au gymnase les samedis de septembre, de 10h à 12h. Pass'Sport et coupons ANCV acceptés.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href="#contact"
            className="inline-flex min-h-[56px] items-center rounded-lg bg-white px-9 font-display text-[18px] uppercase tracking-wide text-vert-fonce transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            S'inscrire
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Partenaires() {
  const reduce = useReducedMotion();
  const logos = ["Mairie de Verfeil", "Crédit Mutuel", "Intersport", "Garage Central", "Boulangerie Pace", "Décathlon"];
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
              className="flex h-24 w-52 shrink-0 items-center justify-center rounded-lg border border-bordure bg-coquille font-display text-[15px] uppercase tracking-wide text-neutral-400"
            >
              {l}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-coquille py-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <div className="grid items-center gap-10 rounded-2xl border border-bordure bg-white p-8 shadow-[0_8px_24px_rgba(22,22,22,0.06)] md:grid-cols-2 md:p-12">
            <div>
              <h2 className="font-display text-[clamp(24px,3.6vw,36px)] font-bold uppercase leading-none tracking-tight">
                Restez informés
              </h2>
              <p className="mt-2 text-[16px] text-neutral-600">
                Recevez les actus du club et les dates importantes par e-mail.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="mb-2 block font-display font-semibold uppercase text-[14px] tracking-wide">
                Votre adresse e-mail
              </label>
              <div className="flex flex-wrap gap-3">
                <input
                  id="email"
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
                J'accepte de recevoir les e-mails du club et j'ai lu les{" "}
                <a href="#" className="text-vert-fonce underline">mentions légales</a>.
              </label>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t-4 border-rouge bg-coquille pt-16">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={LOGO} alt="Basket Club Verfeillois" className="mb-4 h-14 w-auto" />
          <p className="text-[14px] text-neutral-600">Gymnase municipal<br />31590 Verfeil</p>
          <a href="mailto:contact@bcv-verfeil.fr" className="mt-2 inline-block text-[14px] text-neutral-600 hover:text-encre">
            contact@bcv-verfeil.fr
          </a>
        </div>
        {[
          { t: "Navigation", l: ["Le Club", "Équipes", "Planning", "Actualités", "Inscriptions"] },
          { t: "Suivez-nous", l: ["Facebook", "Instagram"] },
          { t: "Informations", l: ["Mentions légales", "Confidentialité (RGPD)"] },
        ].map((col) => (
          <div key={col.t}>
            <p className="mb-3 font-display text-[14px] font-semibold uppercase text-encre">{col.t}</p>
            <ul className="flex flex-col gap-1.5">
              {col.l.map((l) => (
                <li key={l}>
                  <a href="#" className="inline-flex items-center gap-1.5 text-[14px] text-neutral-600 hover:text-encre hover:underline">
                    {l === "Facebook" && <IconBrandFacebook className="h-4 w-4" />}
                    {l === "Instagram" && <IconBrandInstagram className="h-4 w-4" />}
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-[1180px] border-t border-bordure px-6 py-5 text-[13px] text-neutral-500">
        © 2026 Basket Club Verfeillois. Tous droits réservés.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Bento />
        <Club />
        <Equipes />
        <Actus />
        <Inscriptions />
        <Partenaires />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
