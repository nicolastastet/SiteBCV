// Cloudflare Pages Function — échange du code OAuth GitHub contre un access token,
// puis renvoi du token à Decap CMS via postMessage (fenêtre popup).
// Route : /api/callback (= Authorization callback URL de l'OAuth App GitHub).
// GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET : variables d'environnement Cloudflare
// (jamais committées dans le code ni dans Git).

// Lit la valeur d'un cookie depuis l'en-tête Cookie de la requête.
function lireCookie(request, nom) {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${nom}=([^;]+)`));
  return m ? m[1] : null;
}

export async function onRequest({ request, env }) {
  // Origine de confiance = l'origine qui sert cette Function. La page Decap (/redaction)
  // qui a ouvert la popup est TOUJOURS sur cette même origine ; un opener tiers
  // (page attaquante) a forcément une autre origine → il sera rejeté. S'adapte
  // automatiquement à la prod et aux déploiements de preview.
  const trustedOrigin = new URL(request.url).origin;
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return popupResponse(trustedOrigin, "error", { message: "Code d'autorisation manquant." });
  }

  // Anti-CSRF : le `state` reçu de GitHub doit correspondre à celui déposé en cookie
  // par auth.js. Sinon, requête de login forgée → rejet avant tout échange de token.
  const stateRecu = searchParams.get("state");
  const stateAttendu = lireCookie(request, "bcv_oauth_state");
  if (!stateRecu || !stateAttendu || stateRecu !== stateAttendu) {
    return popupResponse(trustedOrigin, "error", { message: "Échec de la vérification anti-CSRF (state invalide)." });
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return popupResponse(trustedOrigin, "error", { message: "Identifiants OAuth non configurés côté Cloudflare." });
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "BCV-Decap-CMS",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const data = await tokenRes.json();

    if (data.error || !data.access_token) {
      return popupResponse(trustedOrigin, "error", {
        message: data.error_description || "Échec de l'échange du token GitHub.",
      });
    }

    return popupResponse(trustedOrigin, "success", { token: data.access_token, provider: "github" });
  } catch (err) {
    return popupResponse(trustedOrigin, "error", { message: "Erreur réseau lors de l'authentification." });
  }
}

/**
 * Page popup qui transmet le résultat à Decap via postMessage.
 * - Le token (contenu) est injecté proprement comme littéral JS via JSON.stringify.
 * - Le handshake est restreint à `trustedOrigin` : on ne répond qu'aux messages
 *   provenant de cette origine, et on n'émet QUE vers cette origine (targetOrigin
 *   explicite, jamais "*"). Empêche l'exfiltration du token vers un opener tiers.
 * - Le cookie de state anti-CSRF (usage unique) est purgé ici.
 */
function popupResponse(trustedOrigin, status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html>
<html lang="fr">
  <head><meta charset="utf-8" /><title>Authentification…</title></head>
  <body>
    <script>
      (function () {
        var TRUSTED = ${JSON.stringify(trustedOrigin)};
        var MESSAGE = ${JSON.stringify(message)};
        function receiveMessage(e) {
          if (e.origin !== TRUSTED) return;
          window.opener.postMessage(MESSAGE, TRUSTED);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", TRUSTED);
      })();
    </script>
  </body>
</html>`;
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // CSP dédiée à cette réponse popup : seul le script inline du handshake est autorisé.
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'",
      // La popup doit rester dans le groupe de contexte de l'opener pour que
      // window.opener soit préservé (le handshake postMessage en dépend).
      "Cross-Origin-Opener-Policy": "unsafe-none",
      // Purge le cookie de state (usage unique).
      "Set-Cookie": "bcv_oauth_state=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax",
    },
  });
}
