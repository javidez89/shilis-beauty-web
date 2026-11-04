import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {root} from '../scripts/seo.mjs';
import {secureHtml, publicHtml, isPublicAsset} from '../scripts/security.mjs';

assert.throws(() => secureHtml('<head><meta charset="utf-8"><script>alert(1)</script></head>'));
assert.throws(() => secureHtml('<head><meta charset="utf-8"></head><img onerror="alert(1)">'));
for (const file of ['assets/.env', 'assets/img/.private/logo.png', 'assets/js/agenda-settings.js', 'assets/js/main.js.map', 'assets/img/README.md', '../assets/img/a.png', 'assets/img/a.key']) assert(!isPublicAsset(file), file);
for (const file of ['assets/js/main.js', 'assets/js/booking.js', 'assets/css/styles.css', 'assets/img/responsive/portada-v3-480.webp']) assert(isPublicAsset(file), file);

execFileSync(process.execPath, ['scripts/build_vercel.mjs'], {cwd: root, env: {...process.env, SITE_URL: 'https://shilispeluqueria.com/', VERCEL_ENV: ''}, encoding: 'utf8'});
const output = path.join(root, 'dist');
for (const file of publicHtml) {
  const html = fs.readFileSync(path.join(output, file), 'utf8');
  assert.equal((html.match(/http-equiv="Content-Security-Policy"/g) || []).length, 1, file);
  const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
  for (const directive of ["default-src 'none'", "script-src 'self'", "style-src 'self'", "form-action 'none'", "object-src 'none'", "base-uri 'self'", 'frame-src https://www.google.com']) assert(policy.includes(directive), file);
  assert(!/unsafe-inline|unsafe-eval|frame-ancestors/.test(policy), file);
  assert(html.includes('<meta name="referrer" content="strict-origin-when-cross-origin">'), file);
  assert(html.indexOf('Content-Security-Policy') < html.indexOf('<script') || !html.includes('<script'), file);
  if (html.includes('<base ')) assert(html.indexOf('Content-Security-Policy') < html.indexOf('<base '), file);
  for (const [, attrs, content] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc=/.test(attrs)) continue;
    assert(attrs.includes('application/ld+json'));
    assert(policy.includes(`'sha256-${createHash('sha256').update(content).digest('base64')}'`), file);
  }
  assert(!/<[a-z][^>]*\s(?:on\w+|style)\s*=/i.test(html), file);
  if (html.includes('id="reservation-form"')) assert(html.includes('type="submit" data-booking-submit disabled'), file);
}
for (const file of ['assets/img/README.md', 'assets/js/agenda-settings.js', '.env', '.git/HEAD', 'admin/index.html']) assert(!fs.existsSync(path.join(output, file)), file);

// Exercise the real submit handler with a local fake window: no WhatsApp request is sent.
const submit = {disabled: true}, handlers = {}, opened = [];
const nombre = {value: 'Cliente de prueba', addEventListener() {}, setCustomValidity() {}};
const values = {nombre: nombre.value, servicio: 'Cepillados', fecha: '', hora: '10:00', mensaje: '<img src=x onerror=alert(1)> & ?text=otro'};
const form = {elements: {nombre}, querySelector: () => submit, reportValidity: () => true,
  addEventListener(type, callback) { assert(submit.disabled, 'Install interception before enabling submit'); handlers[type] = callback; }};
const document = {getElementById: () => form};
let prevented = false;
const window = {document, open(...args) { assert(prevented); opened.push(args); }};
class FormData { *[Symbol.iterator]() { yield* Object.entries(values); } }
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/booking.js'), 'utf8'), {window, document, FormData});
assert.equal(submit.disabled, false);
handlers.submit({preventDefault() { prevented = true; }});
assert.equal(opened.length, 1);
const link = new URL(opened[0][0]);
assert.equal(link.origin, 'https://wa.me');
assert.equal(link.pathname, '/573187862277');
assert.equal([...link.searchParams.keys()].join(','), 'text');
assert(link.searchParams.get('text').includes(values.mensaje));
assert.equal(opened[0][2], 'noopener,noreferrer');
console.log('PASS CSP hashes, blocked native form submission, encoded WhatsApp data and public-asset boundaries.');
