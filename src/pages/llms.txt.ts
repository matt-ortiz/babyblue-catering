// A plain-language summary for AI assistants and answer engines (llmstxt.org).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, categories } from '../data/site';
import { priceLine } from '../lib/format';

export const GET: APIRoute = async () => {
  const catOrder = Object.keys(categories);
  const services = (await getCollection('services')).sort(
    (a, b) => catOrder.indexOf(a.data.category) - catOrder.indexOf(b.data.category) || a.data.order - b.data.order,
  );
  const lines = [
    `# ${site.name}`,
    '',
    `> Catering and private chef company based in ${site.city}, ${site.regionName}, owned by ${site.founder.name}. Serves ${site.serviceArea.join(', ')} and the Dallas–Fort Worth area. Phone ${site.phone}, email ${site.email}.`,
    '',
    'All packages include shopping, preparation, service and cleanup. Prices are starting points and are subject to sales tax and a 25% gratuity. BabyBlue does not hold a liquor license; clients provide alcohol.',
    '',
    '## Services',
    ...services.map((s) => `- [${s.data.title}](${site.url}/${s.id}/): ${s.data.cardBlurb} ${priceLine(s.data.price)}.`),
    '',
    '## More',
    `- [About Chef Jacob](${site.url}/about/)`,
    `- [FAQ](${site.url}/faq/)`,
    `- [Service area](${site.url}/service-area/)`,
    `- [Contact / inquiry](${site.url}/contact/)`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
