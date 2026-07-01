// Cloudflare Pages Function — démarrage du flux OAuth GitHub pour Decap CMS.
// Route : /api/auth (référencée par public/admin/config.yml → auth_endpoint: api/auth).
// GITHUB_CLIENT_ID est une variable d'environnement Cloudflare (jamais committée).
export async function onRequest({ env }) {
  const clientId = env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response("GITHUB_CLIENT_ID non configuré côté Cloudflare.", { status: 500 });
  }
  const scope = "repo,user";
  const state = crypto.randomUUID();
  const url =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}`;
  return Response.redirect(url, 302);
}
