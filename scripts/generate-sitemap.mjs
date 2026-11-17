import { writeFileSync } from 'node:fs';
import { siteUrl, publicPaths } from '../src/seo.js';
const urls = publicPaths.map(p => '  <url><loc>' + siteUrl + p + '</loc></url>').join('\n');
writeFileSync(new URL('../dist/sitemap.xml', import.meta.url), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n');
console.log('Generated sitemap.xml (' + publicPaths.length + ' URLs)');
