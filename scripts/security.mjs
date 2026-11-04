import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

export const publicHtml = ['index.html', 'servicios.html', 'galeria.html', 'nosotros.html', 'contacto.html', '404.html', 'docs/manual-marca.html', 'demo-agenda/index.html', 'demo-agenda/simulador.html'];

export function secureHtml(source) {
  source = source.replace(/<meta\s+http-equiv="Content-Security-Policy"[^>]*>/gi, '')
    .replace(/<meta\s+name="referrer"[^>]*>/gi, '')
    .replace(/<head>\s*(<base\b[^>]*>)\s*(<meta charset="utf-8">)/i, '<head>$2$1');
  if (/<[a-z][^>]*\s(?:on\w+|style)\s*=/i.test(source)) throw new Error('Move inline handlers and styles to the approved local files');
  const hashes = [];
  for (const [, attributes, content] of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc\s*=/i.test(attributes) || !content.trim()) continue;
    if (!/\btype="application\/ld\+json"/i.test(attributes)) throw new Error('Executable inline scripts are not allowed');
    hashes.push(`'sha256-${createHash('sha256').update(content).digest('base64')}'`);
  }
  const policy = ["default-src 'none'", `script-src 'self'${hashes.length ? ' ' + hashes.join(' ') : ''}`,
    "style-src 'self'", "img-src 'self' data:", "font-src 'self'", 'frame-src https://www.google.com',
    "connect-src 'none'", "object-src 'none'", "base-uri 'self'", "form-action 'none'"].join('; ');
  const tags = `<meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="referrer" content="strict-origin-when-cross-origin">`;
  if (!/<meta charset="utf-8">/i.test(source)) throw new Error('Missing UTF-8 declaration');
  return source.replace(/<meta charset="utf-8">/i, match => match + tags);
}

export function isPublicAsset(relative) {
  const name = relative.replaceAll('\\', '/');
  if (name.split('/').some(part => !part || part.startsWith('.'))) return false;
  if (['assets/js/main.js', 'assets/js/booking.js', 'assets/css/styles.css'].includes(name)) return true;
  return name.startsWith('assets/img/') && /\.(?:png|jpe?g|webp|svg|ico)$/i.test(name);
}

export function copyPublicAssets(root, output) {
  fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), {recursive: true, filter: source => {
    const relative = path.relative(root, source).replaceAll('\\', '/');
    const stat = fs.lstatSync(source);
    if (stat.isSymbolicLink()) throw new Error('Symbolic links are not public assets');
    if (stat.isDirectory()) return ['assets', 'assets/js', 'assets/css', 'assets/img'].includes(relative) || (relative.startsWith('assets/img/') && !relative.split('/').some(part => part.startsWith('.')));
    return isPublicAsset(relative);
  }});
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  for (const file of publicHtml) {
    const target = path.join(root, file);
    fs.writeFileSync(target, secureHtml(fs.readFileSync(target, 'utf8')));
  }
  console.log('Browser protections generated for all nine public HTML documents.');
}
