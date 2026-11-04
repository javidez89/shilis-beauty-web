const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/main.js'), 'utf8');

function scenario({home = true, hash = '', seen = false, blockedStorage = false} = {}) {
  const events = new Map();
  const node = () => ({
    addEventListener(type, handler) { this[type] = handler; },
    getClientRects: () => [1], focus() { this.focused = true; }
  });
  const close = node(), manual = node(), bookingClose = node(), logo = node();
  const image = {}, noticeClose = node();
  const notice = {hidden: false, querySelector: () => noticeClose};
  const classes = new Set(); classes.remove = classes.delete;
  const poster = {...node(), open: false,
    showModal() { this.open = true; },
    close() { this.open = false; this.closeEvent(); },
    querySelector: () => image, querySelectorAll: () => [close],
    addEventListener(type, handler) { this[type === 'close' ? 'closeEvent' : type] = handler; }
  };
  const booking = {...node(), open: false,
    showModal() { this.open = true; }, querySelector: () => bookingClose
  };
  const document = {
    body: {classList: classes}, getElementById: () => poster,
    querySelector(selector) {
      return ({'.booking-dialog': booking, '[data-launch-notice]': notice,
        '[data-featured-slider]': home ? {} : null, '.logo-link': logo,
        'dialog[open]': poster.open || booking.open ? {} : null})[selector] || null;
    },
    querySelectorAll: selector => selector === '[data-launch-open]' ? [manual] : [],
    addEventListener: (type, handler) => events.set(type, handler),
    dispatchEvent: event => events.get(event.type)?.(event)
  };
  vm.runInNewContext(source, {document, location: {hash},
    CustomEvent: function(type) { this.type = type; },
    sessionStorage: {
      getItem() { if (blockedStorage) throw Error('blocked'); return seen ? 'seen' : null; },
      setItem() { if (blockedStorage) throw Error('blocked'); seen = true; }
    }
  });
  return {poster, booking, close, manual, logo, classes, image};
}

for (const options of [{}, {seen: true}, {blockedStorage: true}]) {
  const s = scenario(options);
  assert.equal(s.poster.open, true, 'Homepage must open the poster, even after an earlier visit');
  assert.equal(s.classes.has('launch-open'), true);
  assert.equal(s.image.fetchPriority, 'high');
  s.close.click();
  assert.equal(s.poster.open, false);
  assert.equal(s.classes.has('launch-open'), false);
  assert.equal(s.logo.focused, true);
  s.manual.click();
  assert.equal(s.poster.open, true, 'The manual poster link must keep working');
}
const page = scenario({home: false});
assert.equal(page.poster.open, false, 'Do not interrupt other pages');
page.manual.click(); assert.equal(page.poster.open, true);
const direct = scenario({hash: '#agenda-tu-momento'});
assert.equal(direct.booking.open, true, 'Booking links must still open the form');
assert.equal(direct.poster.open, false, 'Do not cover a direct booking with the poster');
direct.manual.click(); assert.equal(direct.poster.open, false, 'Do not stack dialogs');
console.log('PASS automatic homepage poster, repeat visits, blocked storage, close/reopen and direct WhatsApp booking.');
