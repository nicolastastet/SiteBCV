// AJOUTER UN ARTICLE : dupliquer un objet ci-dessous, changer slug/titre/date/extrait/categorie.
// Créer le fichier Markdown correspondant dans src/content/articles/[slug].md
// TODO Phase 4 : remplacer par lecture automatique via Decap CMS
//
// categorie : "recits" | "vie-club" | "galerie"
// corps : tableau de paragraphes (texte statique en attendant le CMS).

export const articles = [
  {
    slug: "victoire-u13g1-balma",
    titre: "Belle victoire des U13G1 face à Balma !",
    categorie: "recits",
    date: "2026-06-28",
    extrait: "Nos U13 ont livré une belle performance samedi dernier...",
    corps: [
      "Nos U13 Garçons 1 ont livré une belle performance samedi dernier au gymnase Fernand Daydé, s'imposant 54 à 48 face à une solide équipe de Balma BC.",
      "Menés à la mi-temps, les jeunes du BCV ont su hausser le ton en seconde période, portés par une défense agressive et une belle adresse à trois points.",
      "Bravo à toute l'équipe et à leur coach pour ce match plein de caractère. Rendez-vous la semaine prochaine pour la suite du championnat !",
    ],
  },
  {
    slug: "tournoi-fin-saison-2026",
    titre: "Tournoi de fin de saison : retour en images",
    categorie: "galerie",
    date: "2026-06-21",
    extrait: "Retour en photos sur notre tournoi annuel de fin de saison...",
    corps: [
      "Retour en photos sur notre tournoi annuel de fin de saison, qui a réuni toutes les catégories du club dans une ambiance conviviale et festive.",
      "Une journée sous le signe du basket, du partage et de la bonne humeur, clôturée par un grand goûter offert par le club.",
    ],
  },
  {
    slug: "portrait-coach-lucas",
    titre: "Portrait : Lucas, coach des U15",
    categorie: "vie-club",
    date: "2026-06-14",
    extrait: "Cette semaine, on s'est assis avec Lucas pour parler basket et bénévolat...",
    corps: [
      "Cette semaine, on s'est assis avec Lucas pour parler basket et bénévolat.",
      "Licencié au club depuis son plus jeune âge, Lucas encadre aujourd'hui les U15 Garçons avec passion et pédagogie.",
      "« Ce que j'aime, c'est voir les jeunes progresser et prendre du plaisir sur le terrain », nous confie-t-il.",
    ],
  },
  {
    slug: "victoire-sf1-colomiers",
    titre: "SF1 : victoire bonifiée face à Colomiers",
    categorie: "recits",
    date: "2026-06-07",
    extrait: "Superbe match des Seniors Femmes 1 ce dimanche...",
    corps: [
      "Superbe match des Seniors Femmes 1 ce dimanche, qui s'imposent 72 à 55 face à Colomiers.",
      "Une victoire collective et maîtrisée, qui permet à l'équipe de consolider sa place au classement.",
    ],
  },
  {
    slug: "assemblee-generale-2026",
    titre: "Assemblée générale 2026 : les grandes décisions",
    categorie: "vie-club",
    date: "2026-05-30",
    extrait: "L'assemblée générale s'est tenue vendredi soir au gymnase Daydé...",
    corps: [
      "L'assemblée générale s'est tenue vendredi soir au gymnase Fernand Daydé, en présence de nombreux licenciés, parents et bénévoles.",
      "Au programme : bilan de la saison écoulée, présentation du projet sportif et appel aux bonnes volontés pour renforcer l'équipe de bénévoles.",
      "Merci à toutes et tous pour votre engagement au service du club.",
    ],
  },
  {
    slug: "galerie-matchs-mai",
    titre: "Les plus belles photos de mai",
    categorie: "galerie",
    date: "2026-05-24",
    extrait: "Une sélection des meilleurs clichés du mois de mai...",
    corps: [
      "Une sélection des meilleurs clichés du mois de mai, entre matchs disputés et moments de convivialité.",
      "Un grand merci à nos photographes bénévoles pour ces belles images de la vie du club.",
    ],
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
