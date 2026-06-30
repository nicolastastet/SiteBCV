# Sécurité de la landing page BCV

Ce document explique **ce qui est déjà sécurisé dans le code** et **ce que vous devez faire au déploiement** pour qu'aucune faille ne soit exploitable. Écrit pour être compris sans être développeur.

---

## 1. Ce qui est déjà fait dans le code

| Protection | Comment | Contre quoi |
| --- | --- | --- |
| **Aucun JavaScript** | Le menu mobile utilise l'élément natif `<details>` | Supprime tout risque d'injection de script (XSS) |
| **CSP `script-src 'none'`** | Balise `<meta>` dans `index.html` + en-têtes | Même un script injecté ne s'exécuterait pas |
| **CSS externe, zéro style en ligne** | Tout est dans `style.css` | Permet une CSP stricte sans faille |
| **Polices auto-hébergées** | `@font-face` local, pas de CDN Google | Pas de dépendance tierce + conformité RGPD |
| **Liens externes protégés** | `rel="noopener noreferrer"` | Détournement d'onglet (tabnabbing) |
| **Formulaire durci** | `type=email`, `maxlength`, honeypot, consentement | Spam de bots, données invalides |
| **Pas de secret dans le code** | Aucune clé API, aucun mot de passe | Fuite d'identifiants |

---

## 2. À FAIRE au déploiement (indispensable)

### a) Activer les en-têtes de sécurité
Les en-têtes HTTP sont la **protection principale** d'un site statique. Choisissez selon votre hébergeur :
- **Netlify / Cloudflare Pages / GitHub Pages (via Cloudflare)** → déposez le fichier `_headers` à la racine.
- **Hébergeur Apache (OVH, o2switch, Ionos…)** → déposez le fichier `.htaccess` à la racine.

Vérifiez ensuite le résultat sur **https://securityheaders.com** (objectif : note A ou A+).

### b) Servir le site en HTTPS uniquement
Activez le certificat SSL gratuit (Let's Encrypt, inclus chez tous les hébergeurs modernes). Le `.htaccess` force déjà la redirection vers HTTPS.

### c) Auto-héberger les polices
Pour éviter de charger Google Fonts (fuite d'adresses IP = problème RGPD) :
1. Téléchargez Poppins (600/700) et Inter (400/500) au format `.woff2` via **google-webfonts-helper** (gwfh.mranftl.com) ou **fontsource.org**.
2. Placez les fichiers dans un dossier `fonts/`.
3. Les noms attendus par `style.css` sont `fonts/poppins-600.woff2` et `fonts/inter-400.woff2` (adaptez si besoin).

> En attendant, le site reste fonctionnel : il bascule proprement sur les polices système.

---

## 3. Le formulaire newsletter — point d'attention n°1

Une page **statique ne peut pas sécuriser un formulaire à elle seule**. Le code client fait sa part (validation, honeypot, consentement), mais le **backend qui reçoit l'e-mail DOIT** :

- [ ] **Valider l'e-mail côté serveur** (ne jamais faire confiance au navigateur).
- [ ] **Échapper / nettoyer** toute donnée avant stockage ou affichage (anti-injection / XSS stocké).
- [ ] **Poser un jeton anti-CSRF** sur le formulaire.
- [ ] **Limiter le débit** (rate limiting) par IP (anti-spam, anti-déni de service).
- [ ] **Rejeter l'envoi si le champ piège `site_internet` est rempli** (c'est un bot).
- [ ] **Journaliser** les envois (traçabilité).

### Proposition : éviter de coder un backend tout de suite
Pour un club, deux options simples et plus sûres que de développer soi-même :
1. **Service de formulaire respectueux du RGPD** (hébergé en UE) qui reçoit l'envoi sans backend à maintenir.
2. **Petit backend dédié** plus tard (ex. une fonction serverless), quand le reste du site sera en place.

> Mon conseil : garder la landing 100 % statique pour l'instant, et brancher le formulaire à l'étape « Blog / CMS + newsletter » de la roadmap.

---

## 4. Correspondance OWASP Top 10 (2021)

| Risque OWASP | Traitement ici |
| --- | --- |
| **A01 — Contrôle d'accès** | Anti-clickjacking (`X-Frame-Options: DENY`, `frame-ancestors 'none'`) |
| **A02 — Défaillances cryptographiques** | HTTPS forcé + HSTS ; aucun secret dans le code |
| **A03 — Injection** | Pas de JS, CSP stricte ; validation/échappement à faire côté backend du formulaire |
| **A04 — Conception non sécurisée** | Surface minimale (statique, sans JS), honeypot anti-bot |
| **A05 — Mauvaise configuration** | En-têtes de sécurité, listing de dossiers désactivé, en-têtes serveur masqués |
| **A06 — Composants vulnérables** | Aucune librairie tierce, polices auto-hébergées (pas de CDN) |
| **A07 — Authentification** | Sans objet (pas de connexion) — à revoir si un espace membre est ajouté |
| **A08 — Intégrité logicielle/données** | Pas de script externe ; tout est servi depuis votre domaine |
| **A09 — Journalisation** | À activer côté hébergeur (logs d'accès) |
| **A10 — SSRF** | Sans objet pour un site statique |

---

## 5. Fichiers du projet

```
bcv-landing/
├── index.html            ← la page (sémantique, accessible, sans JS)
├── style.css             ← tout le style (variables faciles à modifier en haut)
├── _headers              ← en-têtes sécurité (Netlify / Cloudflare)
├── .htaccess             ← en-têtes sécurité + HTTPS (Apache / OVH)
├── README-securite.md    ← ce fichier
└── fonts/                ← (à créer) polices .woff2 auto-hébergées
```
