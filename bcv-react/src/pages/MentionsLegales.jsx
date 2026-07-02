import SectionHero from "../components/SectionHero.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";

// Placeholder visible (rouge) pour les infos que Nicolas doit compléter avant publication.
function AComplete({ children }) {
  return (
    <mark className="rounded bg-rouge/10 px-1.5 py-0.5 font-semibold text-rouge">
      [À COMPLÉTER PAR NICOLAS{children ? ` — ${children}` : ""}]
    </mark>
  );
}

export default function MentionsLegales() {
  return (
    <>
      <Seo
        titre="Mentions légales & Confidentialité"
        description="Mentions légales, droit à l'image, politique de confidentialité (RGPD) et cookies du Basket Club Verfeillois."
        chemin="/mentions-legales"
      />
      <SectionHero
        titre="Mentions légales & Confidentialité"
        accroche="Informations légales, droit à l'image et protection de vos données personnelles."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-6 text-[16px] leading-relaxed text-neutral-700">
          <Reveal>
            {/* Éditeur */}
            <h2 className="font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Éditeur du site
            </h2>
            <p className="mt-4">Le site basketclubverfeillois.fr est édité par :</p>
            <p className="mt-3">
              <span className="font-semibold text-encre">Basket Club Verfeillois (BCV)</span><br />
              Association loi 1901, fondée en 1923<br />
              Siège social :{" "}
              <AComplete>
                incohérence détectée entre « 3 rue Vauraise, 31590 Verfeil » (footer actuel) et « Gymnase municipal, 31590 Verfeil » (page Contact) : confirmer l'adresse exacte du siège social de l'association avant publication
              </AComplete>
              <br />
              Numéro RNA : <AComplete />
              <br />
              Directeurs de la publication : Pierre-Emmanuel Angot et Stéphanie Altinier, Co-Présidents du Basket Club Verfeillois<br />
              Contact :{" "}
              <a href="mailto:correspondantebcv@gmail.com" className="text-rouge hover:underline">correspondantebcv@gmail.com</a>
            </p>
          </Reveal>

          {/* Hébergement */}
          <Reveal>
            <h2 className="mt-12 font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Hébergement
            </h2>
            <p className="mt-4">Le site est hébergé par :</p>
            <p className="mt-3">
              <span className="font-semibold text-encre">Cloudflare, Inc.</span><br />
              101 Townsend Street, San Francisco, CA 94107, États-Unis
            </p>
          </Reveal>

          {/* Propriété intellectuelle */}
          <Reveal>
            <h2 className="mt-12 font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Propriété intellectuelle
            </h2>
            <p className="mt-4">
              Les textes, photographies et éléments graphiques du site sont la propriété du Basket Club
              Verfeillois, sauf mention contraire.
            </p>
            <p className="mt-3">
              Les logos de la Fédération Française de BasketBall (FFBB), de la Ligue Régionale d'Occitanie
              de Basketball et du Comité Départemental de Basket-ball de la Haute-Garonne sont la propriété
              de ces organismes respectifs. Ils sont reproduits sur ce site pour identifier l'affiliation
              du club à ces structures fédérales.
            </p>
            <p className="mt-3">
              Toute reproduction ou utilisation des contenus du site sans autorisation préalable est
              interdite, sauf mention contraire.
            </p>
          </Reveal>

          {/* Droit à l'image */}
          <Reveal>
            <h2 className="mt-12 font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Droit à l'image
            </h2>
            <p className="mt-4">
              Le club publie sur ce site des photographies de ses licencié(e)s, y compris mineur(e)s,
              prises lors des entraînements, matchs et événements du club.
            </p>
            <p className="mt-3">
              Le consentement à la diffusion de l'image des licencié(e)s — y compris pour les mineur(e)s,
              recueilli auprès du représentant légal — est obtenu chaque saison lors de la prise ou du
              renouvellement de la licence FFBB, via une case dédiée prévue à cet effet dans le formulaire
              de licence fédéral.
            </p>
            <p className="mt-3">
              Toute personne, ou tout représentant légal d'un(e) licencié(e) mineur(e), souhaitant retirer
              son consentement ou demander le retrait d'une photographie déjà publiée peut contacter le club
              à tout moment à l'adresse{" "}
              <a href="mailto:correspondantebcv@gmail.com" className="text-rouge hover:underline">correspondantebcv@gmail.com</a>.
              La demande sera traitée dans les meilleurs délais.
            </p>
          </Reveal>

          {/* Données personnelles (RGPD) */}
          <Reveal>
            <h2 className="mt-12 font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Données personnelles (RGPD)
            </h2>

            <h3 className="mt-6 font-display text-[18px] font-semibold uppercase tracking-tight text-encre">Données collectées</h3>
            <p className="mt-3">Le site collecte des données personnelles via :</p>
            <ul className="mt-2 list-disc pl-6">
              <li>Le formulaire de contact (nom, email, message, motif de contact)</li>
              <li>Le formulaire de pré-inscription (nom et date de naissance de l'enfant ou du joueur, email et téléphone du parent ou du joueur, catégorie pressentie)</li>
              <li>Le formulaire d'inscription à la newsletter (adresse email)</li>
            </ul>

            <h3 className="mt-6 font-display text-[18px] font-semibold uppercase tracking-tight text-encre">Finalité et base légale</h3>
            <p className="mt-3">
              Ces données sont utilisées uniquement pour répondre à votre demande, traiter votre
              pré-inscription, ou vous envoyer les actualités du club si vous y avez consenti. Le traitement
              repose sur votre consentement (case à cocher lors de l'envoi de chaque formulaire) ou sur
              l'intérêt légitime du club à répondre aux demandes qui lui sont adressées.
            </p>

            <h3 className="mt-6 font-display text-[18px] font-semibold uppercase tracking-tight text-encre">Destinataires</h3>
            <p className="mt-3">
              Ces données sont destinées aux bénévoles du club en charge des inscriptions, de la
              communication et de la vie associative. La newsletter est envoyée via un prestataire technique
              externe (Formspree), hébergé dans l'Union Européenne.
            </p>

            <h3 className="mt-6 font-display text-[18px] font-semibold uppercase tracking-tight text-encre">Durée de conservation</h3>
            <p className="mt-3">
              Les données de contact sont conservées 3 ans à compter du dernier échange. Les données
              d'inscription sont conservées le temps de la saison sportive en cours, puis archivées
              conformément aux obligations comptables et associatives standards.
            </p>

            <h3 className="mt-6 font-display text-[18px] font-semibold uppercase tracking-tight text-encre">Vos droits</h3>
            <p className="mt-3">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un
              droit d'accès, de rectification, d'effacement, d'opposition et de portabilité sur vos données
              personnelles. Pour exercer ces droits, contactez le club à{" "}
              <a href="mailto:correspondantebcv@gmail.com" className="text-rouge hover:underline">correspondantebcv@gmail.com</a>.
            </p>
            <p className="mt-3">
              Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale
              de l'Informatique et des Libertés (CNIL) —{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-rouge hover:underline">www.cnil.fr</a>{" "}
              — si vous estimez que vos droits ne sont pas respectés.
            </p>
          </Reveal>

          {/* Cookies */}
          <Reveal>
            <h2 className="mt-12 font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Cookies
            </h2>
            <p className="mt-4">
              Ce site n'utilise aucun cookie de mesure d'audience ni traceur publicitaire. Aucune donnée de
              navigation n'est collectée à des fins statistiques ou commerciales.
            </p>
          </Reveal>

          {/* Liens externes */}
          <Reveal>
            <h2 className="mt-12 font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Liens externes
            </h2>
            <p className="mt-4">
              Ce site contient des liens vers des sites tiers (Fédération Française de BasketBall, réseaux
              sociaux, sites de clubs partenaires ou adverses, mairie de Verfeil). Le Basket Club Verfeillois
              n'est pas responsable du contenu de ces sites externes.
            </p>
          </Reveal>

          {/* Droit applicable */}
          <Reveal>
            <h2 className="mt-12 font-display text-[clamp(22px,3.4vw,30px)] font-bold uppercase leading-none tracking-tight text-encre">
              Droit applicable
            </h2>
            <p className="mt-4">
              Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution
              amiable, les tribunaux français seront seuls compétents.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
