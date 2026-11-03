import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const legacyBase = 'https://javidez89.github.io/shilis-beauty-web/';
export const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Shili’s, Avenida Medina 8 # 7-29, Mesitas del Colegio, Cundinamarca, Colombia');
export const pages = {
  'index.html': ['Peluquería en Mesitas del Colegio | Shili’s', 'Shili’s Alta Peluquería y Belleza en Mesitas del Colegio. Cabello, uñas y mirada en Avenida Medina 8 # 7-29. Todos los días, 9 a. m.–7 p. m.'],
  'servicios.html': ['Servicios de peluquería y belleza en Mesitas | Shili’s', 'Descubre cepillados, cortes, queratinas, manicure, pedicure, cejas y peinados en Shili’s, Mesitas del Colegio. Consulta precios y citas por WhatsApp.'],
  'galeria.html': ['Inspiración de cabello, uñas y belleza | Shili’s Mesitas', 'Explora ideas de cabello, manicure, pedicure y cejas. Comparte tu inspiración con Shili’s en Mesitas del Colegio y consulta tu próximo servicio.'],
  'nosotros.html': ['Shili’s Alta Peluquería y Belleza en Mesitas del Colegio', 'Conoce Shili’s: tu estilo, tu momento. Peluquería y belleza en Mesitas del Colegio, Cundinamarca. Visítanos en Avenida Medina 8 # 7-29.'],
  'contacto.html': ['Citas, ubicación y horario en Mesitas | Shili’s', 'Agenda por WhatsApp al 318 786 2277. Shili’s: Avenida Medina 8 # 7-29, Mesitas del Colegio. Abierto todos los días de 9 a. m. a 7 p. m.'],
};
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function normalizeBase(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.search || url.hash || url.username || url.password) throw new Error('SITE_URL must be an HTTPS website URL');
  return url.href.replace(/\/?$/, '/');
}
function graph(base, file, source) {
  const pageUrl = base + (file === 'index.html' ? '' : file);
  const business = {
    '@type': 'BeautySalon', '@id': base + '#salon',
    name: 'Shili’s Alta Peluquería y Belleza', url: base,
    description: 'Peluquería y servicios de belleza en Mesitas del Colegio, Cundinamarca.',
    telephone: '+573187862277', logo: base + 'assets/img/logo-oficial.png', image: base + 'assets/img/logo-oficial.png', hasMap: maps,
    address: {'@type': 'PostalAddress', streetAddress: 'Avenida Medina 8 # 7-29', addressLocality: 'Mesitas del Colegio', addressRegion: 'Cundinamarca', addressCountry: 'CO'},
    openingHoursSpecification: {'@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => 'https://schema.org/' + d), opens: '09:00', closes: '19:00'},
  };
  const nodes = [business, {'@type': 'WebSite', '@id': base + '#website', url: base, name: business.name, inLanguage: 'es-CO', publisher: {'@id': business['@id']}},
    {'@type': file === 'contacto.html' ? 'ContactPage' : file === 'nosotros.html' ? 'AboutPage' : file === 'galeria.html' ? 'CollectionPage' : 'WebPage', '@id': pageUrl + '#webpage', url: pageUrl, name: pages[file][0], description: pages[file][1], inLanguage: 'es-CO', isPartOf: {'@id': base + '#website'}, about: {'@id': business['@id']}}];
  if (file !== 'index.html') nodes.push({'@type': 'BreadcrumbList', itemListElement: [
    {'@type': 'ListItem', position: 1, name: 'Inicio', item: base},
    {'@type': 'ListItem', position: 2, name: {'servicios.html': 'Servicios', 'galeria.html': 'Galería', 'nosotros.html': 'Nosotras', 'contacto.html': 'Contacto'}[file], item: pageUrl},
  ]});
  if (file === 'servicios.html') {
    const services = [...source.matchAll(/<article class="service-detail" id="([^"]+)"[\s\S]*?<h2>([^<]+)<\/h2><p>([^<]+)<\/p>/g)];
    if (services.length !== 14) throw new Error('Expected 14 visible services');
    business.hasOfferCatalog = {'@type': 'OfferCatalog', name: 'Servicios de Shili’s', itemListElement: services.map(([, id, name, description]) => ({'@type': 'Offer', itemOffered: {'@type': 'Service', '@id': base + 'servicios.html#' + id, name, description, url: base + 'servicios.html#' + id, provider: {'@id': business['@id']}, areaServed: 'Mesitas del Colegio, Cundinamarca'}}))};
  }
  return {'@context': 'https://schema.org', '@graph': nodes};
}
export function applySeo(directory, {base = legacyBase, preview = false} = {}) {
  base = normalizeBase(base);
  for (const [file, [title, description]] of Object.entries(pages)) {
    const target = path.join(directory, file);
    let source = fs.readFileSync(target, 'utf8');
    const url = base + (file === 'index.html' ? '' : file);
    source = source.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(description)}">`)
      .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${escape(url)}">`)
      .replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="${preview ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">`)
      .replace(/<meta property="og:(title|description|url|image)" content="[^"]*">/g, (_, key) => `<meta property="og:${key}" content="${escape({title, description, url, image: base + 'assets/img/logo-oficial.png'}[key])}">`)
      .replace(/<meta name="twitter:(title|description|image)"[^>]*>/g, '')
      .replace('</head>', `<meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${escape(base)}assets/img/logo-oficial.png"></head>`)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(graph(base, file, source)).replaceAll('<', '\\u003c')}</script>`);
    fs.writeFileSync(target, source);
  }
  fs.writeFileSync(path.join(directory, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + Object.keys(pages).map(file => `  <url><loc>${escape(base + (file === 'index.html' ? '' : file))}</loc></url>`).join('\n') + '\n</urlset>\n');
  fs.writeFileSync(path.join(directory, 'robots.txt'), preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
  return base;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log('SEO generated for ' + applySeo(root, {base: process.env.SITE_URL || legacyBase}));
