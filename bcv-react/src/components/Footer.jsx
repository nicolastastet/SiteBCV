import { Link } from "react-router-dom";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import { LOGO } from "../lib.js";

// Liens internes du pied de page (routes réelles).
const NAVIGATION = [
  { label: "Le Club", to: "/le-club" },
  { label: "Équipes", to: "/equipes" },
  { label: "Planning", to: "/planning" },
  { label: "Inscriptions", to: "/inscriptions" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-rouge bg-coquille pt-16">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={LOGO} alt="Basket Club Verfeillois" className="mb-4 h-14 w-auto" />
          <p className="text-[14px] text-neutral-600">Gymnase municipal<br />31590 Verfeil</p>
          <a href="mailto:contact@bcv-verfeil.fr" className="mt-2 inline-block text-[14px] text-neutral-600 hover:text-encre">
            contact@bcv-verfeil.fr
          </a>
        </div>

        <div>
          <p className="mb-3 font-display text-[14px] font-semibold uppercase text-encre">Navigation</p>
          <ul className="flex flex-col gap-1.5">
            {NAVIGATION.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-[14px] text-neutral-600 hover:text-encre hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-display text-[14px] font-semibold uppercase text-encre">Suivez-nous</p>
          <ul className="flex flex-col gap-1.5">
            <li>
              {/* TODO : URL Facebook BCV */}
              <a href="#" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] text-neutral-600 hover:text-encre hover:underline">
                <IconBrandFacebook className="h-4 w-4" /> Facebook
              </a>
            </li>
            <li>
              {/* TODO : URL Instagram BCV */}
              <a href="#" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] text-neutral-600 hover:text-encre hover:underline">
                <IconBrandInstagram className="h-4 w-4" /> Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-display text-[14px] font-semibold uppercase text-encre">Informations</p>
          <ul className="flex flex-col gap-1.5">
            <li>
              {/* TODO Phase 4 : page Mentions légales */}
              <a href="#" className="text-[14px] text-neutral-600 hover:text-encre hover:underline">Mentions légales</a>
            </li>
            <li>
              {/* TODO Phase 4 : page Confidentialité (RGPD) */}
              <a href="#" className="text-[14px] text-neutral-600 hover:text-encre hover:underline">Confidentialité (RGPD)</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1180px] border-t border-bordure px-6 py-5 text-[13px] text-neutral-500">
        © 2026 Basket Club Verfeillois. Tous droits réservés.
      </div>
    </footer>
  );
}
