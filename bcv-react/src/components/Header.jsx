import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { LOGO } from "../lib.js";

// Liens de navigation principaux (routes réelles).
const LIENS = [
  { label: "Le Club", to: "/le-club" },
  { label: "Équipes", to: "/equipes" },
  { label: "Planning", to: "/planning" },
  { label: "Calendrier", to: "/calendrier" },
  { label: "Actus", to: "/actus" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => {
    setMenuOuvert(false);
  }, [location.pathname]);

  const lienClasse = ({ isActive }) =>
    `font-display text-[14px] uppercase tracking-wide transition-colors hover:text-rouge ${
      isActive ? "text-rouge" : "text-encre/80"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all ${
        scrolled ? "border-bordure bg-white/90 shadow-sm" : "border-transparent bg-white/70"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-6 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Accueil BCV">
          <img src={LOGO} alt="Basket Club Verfeillois" className="h-12 w-12 object-contain" />
          <span className="hidden font-display text-[20px] font-bold uppercase leading-none tracking-tight sm:block">
            Basket Club<br /><span className="text-rouge">Verfeillois</span>
          </span>
        </Link>
        <nav className="ml-6 hidden items-center gap-7 md:flex">
          {LIENS.map((l) => (
            <NavLink key={l.to} to={l.to} className={lienClasse}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/inscriptions"
          className="ml-auto inline-flex min-h-[44px] items-center rounded-lg bg-rouge px-5 font-display text-[14px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-lg"
        >
          S'inscrire
        </Link>
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOuvert}
          onClick={() => setMenuOuvert((v) => !v)}
        >
          {menuOuvert ? <IconX className="text-encre" /> : <IconMenu2 className="text-encre" />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOuvert && (
        <nav className="border-t border-bordure bg-white px-6 py-3 md:hidden" aria-label="Navigation mobile">
          {LIENS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex min-h-[44px] items-center font-display text-[15px] uppercase tracking-wide transition-colors hover:text-rouge ${
                  isActive ? "text-rouge" : "text-encre"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
