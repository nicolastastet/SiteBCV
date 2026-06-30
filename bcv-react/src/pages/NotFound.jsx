import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6 py-20 text-center">
      <div>
        <p className="font-display text-[clamp(64px,12vw,120px)] font-bold leading-none text-rouge">404</p>
        <h1 className="mt-4 font-display text-[clamp(24px,4vw,36px)] font-bold uppercase tracking-tight">
          Page introuvable
        </h1>
        <p className="mx-auto mt-3 max-w-[42ch] text-[16px] text-neutral-600">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-rouge px-8 font-display text-[16px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-xl"
        >
          <IconArrowLeft className="h-5 w-5" /> Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
