const retiredPages = new Set([
  '/sara',
  '/sara/',
  '/planner',
  '/planner/',
  '/engraving',
  '/engraving/',
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isRetiredArchive = url.pathname.startsWith('/archive/karrar-hanan-');

    if (retiredPages.has(url.pathname) || isRetiredArchive) {
      const notFound = await env.ASSETS.fetch(new URL('/404.html', url));
      const headers = new Headers(notFound.headers);
      headers.set('Cache-Control', 'no-store');
      headers.set('X-Robots-Tag', 'noindex');

      return new Response(notFound.body, {
        status: 404,
        headers,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
