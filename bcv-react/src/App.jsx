import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
import LeClub from "./pages/LeClub.jsx";
import Equipes from "./pages/Equipes.jsx";
import EquipesMiniBasket from "./pages/EquipesMiniBasket.jsx";
import EquipesJeunes from "./pages/EquipesJeunes.jsx";
import EquipesSeniors from "./pages/EquipesSeniors.jsx";
import FicheEquipe from "./pages/FicheEquipe.jsx";
import Planning from "./pages/Planning.jsx";
import Calendrier from "./pages/Calendrier.jsx";
import Actus from "./pages/Actus.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import Inscriptions from "./pages/Inscriptions.jsx";
import Contact from "./pages/Contact.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/le-club" element={<LeClub />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/equipes/mini-basket" element={<EquipesMiniBasket />} />
        <Route path="/equipes/jeunes" element={<EquipesJeunes />} />
        <Route path="/equipes/seniors" element={<EquipesSeniors />} />
        <Route path="/equipes/:slug" element={<FicheEquipe />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/calendrier" element={<Calendrier />} />
        <Route path="/actus" element={<Actus />} />
        <Route path="/actus/:slug" element={<ArticlePage />} />
        <Route path="/inscriptions" element={<Inscriptions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
