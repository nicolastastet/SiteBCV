import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IconArrowLeft, IconBrandFacebook, IconBrandWhatsapp } from "@tabler/icons-react";
import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import PhotoAvecFallback from "../components/PhotoAvecFallback.jsx";
import BlocNewsletter from "../components/BlocNewsletter.jsx";
import { getArticle } from "../data/articles.js";
import { CATEGORIES, formatDateFr } from "../lib.js";

// Rendu Markdown → éléments React (aucun dangerouslySetInnerHTML, aucun eval → CSP 'self' OK).
// Les liens externes reçoivent target/rel de sécurité ; les images sont lazy-loadées.
const composantsMd = {
  a: ({ href = "", children }) =>
    /^https?:\/\//i.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
      <a href={href}>{children}</a>
    ),
  img: ({ src = "", alt = "" }) => <img src={src} alt={alt} loading="lazy" />,
};

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  // Slug inconnu : message propre, pas de crash.
  if (!article) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-6 py-20 text-center">
        <div>
          <h1 className="font-display text-[clamp(24px,4vw,36px)] font-bold uppercase tracking-tight">
            Article introuvable
          </h1>
          <p className="mx-auto mt-3 max-w-[42ch] text-[16px] text-neutral-600">
            Cet article n'existe pas ou a été déplacé.
          </p>
          <Link
            to="/actus"
            className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-rouge px-8 font-display text-[16px] uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-rouge-fonce hover:shadow-xl"
          >
            <IconArrowLeft className="h-5 w-5" /> Toutes les actualités
          </Link>
        </div>
      </section>
    );
  }

  const cat = CATEGORIES[article.categorie];
  const url = encodeURIComponent(window.location.href);

  return (
    <>
      <SectionHero
        titre={article.titre}
        breadcrumb={[{ label: "Actualités", to: "/actus" }, { label: article.titre }]}
      />

      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-[760px] px-6">
          {/* Badge catégorie + date */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center rounded-full px-3 py-1 font-display text-[11px] uppercase tracking-wide ${cat.badge}`}>
                {cat.label}
              </span>
              <time className="text-[14px] text-neutral-500">{formatDateFr(article.date)}</time>
            </div>
          </Reveal>

          {/* Image à la une */}
          <Reveal>
            <PhotoAvecFallback
              src={article.image}
              alt={article.titre}
              className="mt-6 aspect-[16/9] w-full rounded-[10px]"
            />
          </Reveal>

          {/* Corps de l'article (Markdown rendu en éléments React) */}
          <Reveal>
            <div className="prose-bcv mt-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={composantsMd}>
                {article.body}
              </ReactMarkdown>
            </div>
          </Reveal>

          {/* Partage social */}
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-bordure pt-6">
              <span className="font-display text-[13px] uppercase tracking-wide text-neutral-500">Partager</span>
              {/* Partage natif — liens <a> simples, aucun JS, compatible CSP */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partager sur Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-bordure text-encre transition-colors hover:border-rouge hover:text-rouge"
              >
                <IconBrandFacebook className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/?text=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partager sur WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-bordure text-encre transition-colors hover:border-vert hover:text-vert"
              >
                <IconBrandWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </Reveal>

          {/* Retour */}
          <Reveal>
            <Link
              to="/actus"
              className="mt-10 inline-flex items-center gap-2 font-display text-[14px] uppercase tracking-wide text-rouge hover:underline"
            >
              <IconArrowLeft className="h-4 w-4" /> Toutes les actualités
            </Link>
          </Reveal>
        </div>
      </article>

      <BlocNewsletter
        titre="Vous avez aimé cet article ?"
        texte="Recevez nos actus directement dans votre boîte mail."
      />
    </>
  );
}
