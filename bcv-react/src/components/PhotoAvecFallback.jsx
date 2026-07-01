import { useState } from "react";

/**
 * Affiche une photo si le fichier existe, sinon retombe sur un placeholder
 * neutre (fond coquille, texte « Photo à venir »). Permet à Nicolas d'ajouter
 * des photos au fil de l'eau sans jamais toucher au code : il dépose le fichier
 * au bon chemin dans public/images/, il push, la photo apparaît au prochain build.
 *
 * `className` porte les dimensions/arrondi/ratio (aspect-*, h/w) — appliqué aussi
 * bien à l'image qu'au placeholder pour garder exactement le même gabarit. Le
 * recadrage centré (`object-cover object-center`) est garanti par le composant,
 * pour que la photo remplisse toujours son emplacement sans déformation ni bande.
 */
export default function PhotoAvecFallback({ src, alt, className = "" }) {
  const [erreur, setErreur] = useState(false);

  if (erreur) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-coquille px-2 text-center font-display text-[11px] uppercase leading-tight tracking-wide text-encre/40 ${className}`}
        role="img"
        aria-label={alt}
      >
        Photo à venir
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover object-center ${className}`}
      onError={() => setErreur(true)}
      loading="lazy"
    />
  );
}
