import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {root, pages, legacyBase} from '../scripts/seo.mjs';
const output = path.join(root, 'dist');
const build = env => execFileSync(process.execPath, ['scripts/build_vercel.mjs'], {cwd: root, env: {...process.env, SITE_URL: '', VERCEL: '', VERCEL_ENV: '', VERCEL_PROJECT_PRODUCTION_URL: '', ...env}, encoding: 'utf8'});
const base = 'https://shilis-seo-test.vercel.app/';
const read = name => fs.readFileSync(path.join(output, name), 'utf8');
build({VERCEL: '1', VERCEL_ENV: 'production', VERCEL_PROJECT_PRODUCTION_URL: 'shilis-seo-test.vercel.app', VERCEL_URL: 'ephemeral-123.vercel.app'});
const titles = new Set();
for (const file of Object.keys(pages)) {
  const source = read(file);
  const canonical = base + (file === 'index.html' ? '' : file);
  assert(source.includes(`<link rel="canonical" href="${canonical}">`), file);
  assert(source.includes(`<meta property="og:url" content="${canonical}">`), file);
  assert(!source.includes('ephemeral-123') && !source.includes(legacyBase), file + ' stale origin');
  assert(source.includes('content="index,follow,max-image-preview:large"'), file);
  const graph = JSON.parse(source.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  const salon = graph.find(node => node['@type'] === 'BeautySalon');
  assert.equal(salon.url, base);
  assert.equal(salon.address.streetAddress, 'Avenida Medina 8 # 7-29');
  assert.equal(salon.openingHoursSpecification.opens, '09:00');
  assert.equal(salon.openingHoursSpecification.closes, '19:00');
  assert.equal(salon.openingHoursSpecification.dayOfWeek.length, 7);
  assert(!salon.aggregateRating && !salon.geo && !salon.sameAs, 'No invented reviews, coordinates or profiles');
  assert(source.includes('Todos los días: 9:00 a. m.–7:00 p. m.'));
  if (file === 'servicios.html') {
    const services = salon.hasOfferCatalog.itemListElement;
    assert.equal(services.length, 14);
    for (const offer of services) assert(source.includes(`id="${offer.itemOffered.url.split('#')[1]}"`));
  }
  titles.add(source.match(/<title>([^<]+)<\/title>/)[1]);
}
assert.equal(titles.size, 5);
assert.equal((read('sitemap.xml').match(/<loc>/g) || []).length, 5);
assert(read('robots.txt').includes(`Sitemap: ${base}sitemap.xml`));
for (const file of ['.git', 'scripts', 'tests', '.env', 'README.md', 'docs/DESPLIEGUE.md', 'admin.html', 'supabase']) assert(!fs.existsSync(path.join(output, file)), file + ' must not be published');
assert(read('404.html').includes(base + 'assets/'));
build({VERCEL: '1', VERCEL_ENV: 'preview', VERCEL_PROJECT_PRODUCTION_URL: 'shilis-seo-test.vercel.app'});
for (const file of [...Object.keys(pages), '404.html', 'docs/manual-marca.html', 'demo-agenda/index.html', 'demo-agenda/simulador.html']) assert(read(file).includes('content="noindex,follow"'), file);
assert.equal(read('robots.txt'), 'User-agent: *\nDisallow: /\n');
// GitHub Pages provides its actual custom domain through configure-pages.base_url.
// A domain migration must update all metadata together, including a root 404 page.
build({SITE_URL: 'https://shilispeluqueria.com'});
for (const file of Object.keys(pages)) {
  const source = read(file);
  const url = 'https://shilispeluqueria.com/' + (file === 'index.html' ? '' : file);
  assert(source.includes(`<link rel="canonical" href="${url}">`), file);
  assert(source.includes(`<meta property="og:url" content="${url}">`), file);
  assert(!source.includes(legacyBase), file + ' retains the previous origin');
}
assert(read('robots.txt').includes('Sitemap: https://shilispeluqueria.com/sitemap.xml'));
assert(read('404.html').includes('<base href="https://shilispeluqueria.com/">'));
build({});
assert(read('index.html').includes(`<link rel="canonical" href="${legacyBase}">`));
console.log('PASS: stable production URLs, local business data, 14 service anchors, preview noindex and publication boundaries.');
