import { services } from './data.js';
import { insights } from './insightsData.js';

export const siteUrl = 'https://ijazahmadca.vercel.app';
const image = siteUrl + '/images/ijaz-ahmad-profile.jpeg';
const descriptions = {
  '/': 'Professional audit, taxation, regulatory compliance, financial advisory, risk management and business consulting services in Pakistan.',
  '/about': 'Learn about IJAZ AHMAD & Co., its professional values, approach and accounting and advisory services in Pakistan.',
  '/services': 'Explore audit and assurance, tax and regulatory compliance, and advisory and consulting services.',
  '/industries': 'Explore the sectors served by IJAZ AHMAD & Co., including SMEs, financial services, development and industry.',
  '/leadership': 'Meet the professionals at IJAZ AHMAD & Co. and explore their qualifications.',
  '/contact': 'Contact IJAZ AHMAD & Co. to discuss your audit, tax, regulatory compliance or advisory requirements.',
  '/insights': 'Explore practical professional insights on taxation, audit, financial reporting, governance and business management.',
  ...Object.fromEntries(services.map(s => ['/services/' + s.slug, s.summary])),
  ...Object.fromEntries(insights.map(a => ['/insights/' + a.slug, a.summary])),
};
export const publicPaths = Object.keys(descriptions);
const urlFor = p => siteUrl + (p === '/' ? '/' : p);
function meta(attribute, name, value) {
  let el = document.head.querySelector('meta[' + attribute + '="' + name + '"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}
export function applyPageSeo(pathname, title) {
  const known = Object.hasOwn(descriptions, pathname);
  const description = known ? descriptions[pathname] : 'The requested page could not be found.';
  const pageTitle = title || 'Page Not Found | IJAZ AHMAD & Co.';
  document.title = pageTitle;
  meta('name', 'description', description);
  meta('name', 'robots', known ? 'index, follow' : 'noindex, follow');
  meta('property', 'og:title', pageTitle);
  meta('property', 'og:description', description);
  meta('property', 'og:type', known && pathname.startsWith('/insights/') ? 'article' : 'website');
  meta('property', 'og:image', image);
  meta('name', 'twitter:title', pageTitle);
  meta('name', 'twitter:description', description);
  meta('name', 'twitter:image', image);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (known) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = urlFor(pathname);
    meta('property', 'og:url', urlFor(pathname));
  } else {
    canonical?.remove();
    document.head.querySelector('meta[property="og:url"]')?.remove();
  }
  document.getElementById('professional-schema')?.remove();
  if (pathname === '/') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'professional-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Person',
      name: 'Ijaz Ahmad', jobTitle: 'Chartered Accountant',
      url: urlFor('/'), image,
    });
    document.head.appendChild(script);
  }
}
