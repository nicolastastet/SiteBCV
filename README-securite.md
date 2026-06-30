# Sécurité — Site BCV (React/Vite) · modèle ADR-005

> Site public, audience incluant des mineurs. Ce document décrit le modèle de
> sécurité du site après bascule sur React/Vite, et comment le vérifier.
> Il remplace le modèle « zéro-JS » précédent (ADR-001/003/004).

## Principe : build statique = CSP stricte possible

Le site est un **SPA React buildé par Vite, sans SSR**. Le build de production
ne contient **aucun JS ni CSS inline** : tout est servi en fichiers externes
hashés. Vérifié sur le build réel — `dist/index.html` ne référence que
`/assets/*.js` (module externe) et `/assets/*.css`, aucun `<script>` ni
`<style>` inline. Framer Motion n'injecte pas de balise `<style>` au runtime
(animations via propriétés CSSOM, non concernées par la CSP).

Conséquence : on peut appliquer `script-src 'self'` et `style-src 'self'`
**sans `unsafe-inline` ni `unsafe-eval`**.

## CSP appliquée (fichier `bcv-react/public/_headers`)

```
default-src 'self'; base-uri 'self'; object-src 'none';
script-src 'self'; style-src 'self';
img-src 'self' data: https://picsum.photos;
font-src 'self'; form-action 'self' https://formspree.io;
frame-ancestors 'none'; upgrade-insecure-requests
```

- `img-src … https://picsum.photos` : **temporaire**, le temps que les vraies
  photos remplacent les placeholders. À retirer ensuite → `img-src 'self' data:`.
- `form-action … https://formspree.io` : prêt pour le branchement Formspree de
  la newsletter (sinon sans effet).
- Autres en-têtes posés : `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`,
  `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`.

## Polices auto-hébergées (RGPD)

Les polices Oswald + Inter sont **auto-hébergées** dans `bcv-react/public/fonts/`
(woff2, sous-ensembles latin + latin-ext), déclarées en `@font-face` dans
`src/index.css`. Le `<link>` Google Fonts a été retiré de `index.html`.
→ Aucun appel à `googleapis.com` / `gstatic.com` : pas de fuite d'IP visiteur.

## Dépendances (OWASP A06)

- `npm audit` à intégrer au pipeline ; **Dependabot** activé (`.github/dependabot.yml`).
- État au 30/06/2026 : 2 alertes `npm audit` (esbuild/vite) — **uniquement le
  serveur de développement**, sans impact sur le site statique en production.
  Le correctif demande un bump majeur de Vite : à planifier, non bloquant.

## Mapping OWASP (résumé)

| Risque | Traitement |
| --- | --- |
| A01 Contrôle d'accès | `frame-ancestors 'none'`, `X-Frame-Options: DENY` |
| A02 Crypto | HTTPS + HSTS (Cloudflare), aucun secret committé |
| A03 Injection | `script-src 'self'` strict ; pas de `dangerouslySetInnerHTML` |
| A04 Conception | honeypot anti-bot à ajouter sur le formulaire newsletter |
| A05 Mauvaise config | en-têtes via `_headers`, CSP vérifiée |
| A06 Composants | `npm audit` + Dependabot |
| A08 Intégrité | secrets Decap en variables d'env Cloudflare ; lockfile figé |

## Procédure de vérification avant mise en ligne

1. Déployer d'abord la CSP en **Content-Security-Policy-Report-Only**, charger
   le site, vérifier **zéro violation** en console (surtout `style-src`).
2. Basculer en CSP applicative.
3. Scanner sur **securityheaders.com** (objectif A/A+) et **Google CSP Evaluator**.
4. Vérifier qu'aucune ressource externe ne s'est glissée (onglet réseau).

## À faire côté sécurité (rappel)

- [ ] Honeypot + consentement RGPD sur le formulaire newsletter (au branchement Formspree).
- [ ] Secrets OAuth Decap CMS en variables d'environnement Cloudflare (jamais committés).
- [ ] Retirer `picsum.photos` de la CSP une fois les vraies photos en place.
- [ ] Planifier le bump Vite (alerte esbuild dev-only).
