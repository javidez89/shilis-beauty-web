import fs from 'node:fs';
import path from 'node:path';
import {root, pages, applySeo, legacyBase, normalizeBase} from './seo.mjs';

// Explicit publication list keeps source files, private settings and tests out of hosting.
const output = path.join(root, 'dist');
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Unsafe output directory');
if (fs.existsSync(output)) fs.rmSync(output, {recursive: true});
fs.mkdirSync(output);
for (const file of [...Object.keys(pages), '404.html', 'assets', 'demo-agenda']) fs.cpSync(path.join(root, file), path.join(output, file), {recursive: true});
fs.mkdirSync(path.join(output, 'docs'));
for (const file of ['manual-marca.html', 'manual-marca.pdf']) fs.copyFileSync(path.join(root, 'docs', file), path.join(output, 'docs', file));
if (process.env.VERCEL === '1' && !process.env.SITE_URL && !process.env.VERCEL_PROJECT_PRODUCTION_URL) throw new Error('Missing stable production URL. Enable Vercel system environment variables or set SITE_URL.');
const base = normalizeBase(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : legacyBase));
const preview = process.env.VERCEL_ENV === 'preview';
applySeo(output, {base, preview});
const errorPath = path.join(output, '404.html');
let errorPage = fs.readFileSync(errorPath, 'utf8').replaceAll('/shilis-beauty-web/', base);
errorPage = errorPage.replace(/(href|src)="(assets\/|index\.html)/g, `$1="${base}$2`);
fs.writeFileSync(errorPath, errorPage);
if (preview) {
  for (const file of ['404.html', 'docs/manual-marca.html', 'demo-agenda/index.html', 'demo-agenda/simulador.html']) {
    const target = path.join(output, file);
    let html = fs.readFileSync(target, 'utf8').replace(/<meta name="robots"[^>]*>/g, '');
    fs.writeFileSync(target, html.replace('</head>', '<meta name="robots" content="noindex,follow"></head>'));
  }
}
console.log(`Built ${preview ? 'non-indexable preview' : 'production site'} for ${base}`);
