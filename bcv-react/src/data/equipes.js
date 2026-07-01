// Source unique des familles et équipes du club.
// Sert aux pages catégorie (niveau 2) et aux fiches équipe (niveau 3).

export const FAMILLES = {
  "mini-basket": { slug: "mini-basket", nom: "Mini Basket", tranche: "De 5 à 10 ans" },
  jeunes: { slug: "jeunes", nom: "Jeunes", tranche: "De 11 à 17 ans" },
  seniors: { slug: "seniors", nom: "Seniors", tranche: "18 ans et plus" },
};

export const EQUIPES = [
  // Mini Basket
  { slug: "u7-u9", nom: "U7-U9", age: "5 à 8 ans", famille: "mini-basket" },
  { slug: "u11-mixte", nom: "U11 Mixte", age: "9-10 ans", famille: "mini-basket" },
  { slug: "u11-filles", nom: "U11 Filles", age: "9-10 ans", famille: "mini-basket" },
  { slug: "u11-garcons", nom: "U11 Garçons", age: "9-10 ans", famille: "mini-basket" },
  // Jeunes
  { slug: "u13-filles-1", nom: "U13 Filles 1", age: "11-12 ans", famille: "jeunes" },
  { slug: "u13-filles-2", nom: "U13 Filles 2", age: "11-12 ans", famille: "jeunes", note: "à confirmer" },
  { slug: "u13-garcons-1", nom: "U13 Garçons 1", age: "11-12 ans", famille: "jeunes" },
  { slug: "u13-garcons-2", nom: "U13 Garçons 2", age: "11-12 ans", famille: "jeunes" },
  { slug: "u15-filles-1", nom: "U15 Filles 1", age: "13-14 ans", famille: "jeunes" },
  { slug: "u15-filles-2", nom: "U15 Filles 2", age: "13-14 ans", famille: "jeunes" },
  { slug: "u15-garcons", nom: "U15 Garçons", age: "13-14 ans", famille: "jeunes" },
  { slug: "u18-garcons", nom: "U18 Garçons", age: "15-17 ans", famille: "jeunes" },
  { slug: "u18-filles-1", nom: "U18 Filles 1", age: "15-17 ans", famille: "jeunes" },
  { slug: "u18-filles-2", nom: "U18 Filles 2", age: "15-17 ans", famille: "jeunes" },
  // Seniors
  { slug: "seniors-femmes-1", nom: "Seniors Femmes 1", age: "", famille: "seniors" },
  { slug: "seniors-femmes-2", nom: "Seniors Femmes 2", age: "", famille: "seniors" },
  { slug: "seniors-garcons-1", nom: "Seniors Garçons 1", age: "", famille: "seniors" },
  { slug: "seniors-garcons-2", nom: "Seniors Garçons 2", age: "", famille: "seniors" },
];

export const getEquipe = (slug) => EQUIPES.find((e) => e.slug === slug);
export const getEquipesParFamille = (famille) => EQUIPES.filter((e) => e.famille === famille);
