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

## Exception CSP pour /redaction (Decap CMS)

L'interface d'administration (`/redaction`, éditeur Decap CMS) a besoin d'appeler
l'API GitHub et d'injecter du CSS inline dans son éditeur. Une règle `_headers`
dédiée `/redaction/*` **remplace** la CSP globale **uniquement pour cette page** :

```
default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
img-src 'self' data: https://avatars.githubusercontent.com;
connect-src 'self' https://api.github.com https://github.com; frame-ancestors 'none'
```

- Le bundle Decap est **auto-hébergé** (`/redaction/decap-cms.js`, bundlé via npm par
  `vite.admin.config.js`) — **jamais chargé depuis un CDN**. Le `<script>` est externe
  (`script-src 'self'`), pas inline.
- `script-src 'unsafe-eval'` est requis : le bundle Decap contient `Function("return this")()`
  (détection du global par **lodash**, exécutée au chargement) et `eval` (**js-sha256**,
  utilisé pour les SHA Git du backend GitHub). Sans `'unsafe-eval'`, Decap plante
  immédiatement. Assouplissement **strictement limité à `/redaction`**.
- `style-src 'unsafe-inline'` : nécessaire car Decap injecte son CSS au runtime.
- `connect-src … api.github.com github.com` : backend GitHub de Decap.
- **Le reste du site (toutes les pages hors `/redaction`) conserve la CSP stricte globale**
  (`script-src 'self'` sans `unsafe-eval` ni `unsafe-inline`) — l'assouplissement ne
  concerne que la page d'admin, non indexée et réservée aux bénévoles authentifiés.
- `Cross-Origin-Opener-Policy: same-origin-allow-popups` est posé sur `/redaction/*`
  (au lieu du `same-origin` global) : sans ça, l'aller-retour cross-origin de la
  popup OAuth vers GitHub couperait `window.opener` et le login échouerait à 100%.
  Le site public garde `same-origin`.
- Le token OAuth est échangé côté serveur par des **Cloudflare Pages Functions**
  (`functions/api/auth.js`, `functions/api/callback.js`). La page popup de callback
  sert une CSP dédiée `default-src 'none'; script-src 'unsafe-inline'` + `COOP: unsafe-none`
  (uniquement le script de handshake `postMessage`). Le handshake est **restreint à
  l'origine du site** : la popup ne répond qu'aux messages de cette origine et n'émet
  le token que vers elle (`targetOrigin` explicite, jamais `"*"`) → pas d'exfiltration
  possible vers un opener tiers. `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` sont des
  **variables d'environnement Cloudflare, jamais committées**.

> ⚠️ **Déploiement Cloudflare Pages** : les Functions (`functions/` à la racine du
> dépôt) ne sont détectées que si le **Root directory** du projet Cloudflare Pages est
> la racine du dépôt (avec Build command `cd bcv-react && npm run build` et Output
> directory `bcv-react/dist`). Si le Root directory est `bcv-react`, déplacer
> `functions/` dans `bcv-react/functions/`. Sans ça, `/api/auth` et `/api/callback`
> renvoient 404 et l'authentification CMS est inopérante.

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
