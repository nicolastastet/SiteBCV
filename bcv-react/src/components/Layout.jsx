import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// Remet le scroll en haut à chaque changement de page, ou défile vers l'ancre
// si l'URL en contient une (ex. /inscriptions#renouvellement).
function ScrollEnHaut() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Gabarit commun à toutes les pages : header sticky + contenu + pied de page.
export default function Layout() {
  return (
    <>
      <ScrollEnHaut />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
