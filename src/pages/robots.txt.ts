import type { APIRoute } from 'astro';
import { absolute, isPreview } from '../lib/url';

// Preview builds (e.g. github.io) are kept out of search engines entirely.
export const GET: APIRoute = () =>
  new Response(
    isPreview
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap-index.xml')}\n`,
  );
