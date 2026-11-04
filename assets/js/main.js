/* Progressive enhancement; no framework or tracking required. */
(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  // Load map previews near the visitor, rather than during the first screen.
  const maps = document.querySelectorAll('iframe[data-map-src]');
  const loadMap = frame => { frame.src = frame.dataset.mapSrc; frame.removeAttribute('data-map-src'); };
  if (maps.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { loadMap(entry.target); observer.unobserve(entry.target); }
      });
    }, {rootMargin: '200px'});
    maps.forEach(frame => observer.observe(frame));
  } else maps.forEach(loadMap);
  document.querySelectorAll('[data-service-slider]').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = [...track.children];
    const dots = [...slider.querySelectorAll('[data-slide]')];
    const pause = slider.querySelector('[data-slider-pause]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let paused = motion.matches;
    let timer;
    let turns = [];
    const cancelTurn = () => { turns.forEach(turn => turn.cancel()); turns = []; };
    const turn = (previous, next, direction) => {
      cancelTurn();
      if (previous === next || motion.matches || typeof slides[next].animate !== 'function') return;
      const face = 'perspective(1200px) translateX(0) rotateY(0deg) scale(1)';
      turns = [
        slides[previous].animate([
          {transform: face, opacity: 1},
          {transform: `perspective(1200px) translateX(${-direction * 24}px) rotateY(${-direction * 18}deg) scale(.95)`, opacity: .5}
        ], {duration: 560, easing: 'cubic-bezier(.22,.75,.25,1)'}),
        slides[next].animate([
          {transform: `perspective(1200px) translateX(${direction * 24}px) rotateY(${direction * 18}deg) scale(.95)`, opacity: .5},
          {transform: face, opacity: 1}
        ], {duration: 680, easing: 'cubic-bezier(.22,.75,.25,1)'})
      ];
    };
    const render = () => {
      dots.forEach((dot, i) => {
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      const currentDot = dots[index];
      if (currentDot) {
        const strip = currentDot.parentElement;
        const dotBounds = currentDot.getBoundingClientRect();
        const stripBounds = strip.getBoundingClientRect();
        if (dotBounds.left < stripBounds.left) strip.scrollLeft -= stripBounds.left - dotBounds.left;
        else if (dotBounds.right > stripBounds.right) strip.scrollLeft += dotBounds.right - stripBounds.right;
      }
      slides.forEach((slide, i) => { slide.inert = i !== index; });
      slider.querySelector('[data-slider-count]').textContent = `${String(index + 1).padStart(2, '0')} / ${slides.length}`;
      pause.setAttribute('aria-pressed', String(paused));
      pause.setAttribute('aria-label', paused ? 'Reproducir carrusel' : 'Pausar carrusel');
      pause.textContent = paused ? '▶' : 'Ⅱ';
    };
    const go = target => {
      const previous = index;
      const direction = target < index ? -1 : 1;
      index = (target + slides.length) % slides.length;
      track.scrollTo({ left: index * track.clientWidth, behavior: motion.matches ? 'instant' : 'smooth' });
      turn(previous, index, direction);
      render();
    };
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        if (!paused && !document.hidden && !slider.matches(':hover') && !slider.contains(document.activeElement) && !document.querySelector('dialog[open]')) go(index + 1);
      }, slider.hasAttribute('data-featured-slider') ? 8000 : 5000);
    };
    slider.querySelectorAll('[data-slider-prev]').forEach(button => button.addEventListener('click', () => { go(index - 1); restart(); }));
    slider.querySelectorAll('[data-slider-next]').forEach(button => button.addEventListener('click', () => { go(index + 1); restart(); }));
    slider.querySelectorAll('.slide-photo').forEach(photo => photo.addEventListener('click', event => {
      if (event.target.closest('button')) return;
      const bounds = photo.getBoundingClientRect();
      go(index + (event.clientX < bounds.left + bounds.width / 2 ? -1 : 1));
      restart();
    }));
    slider.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.target.closest('input, select, textarea')) return;
      event.preventDefault();
      go(index + (event.key === 'ArrowLeft' ? -1 : 1));
      restart();
    });
    pause.addEventListener('click', () => { paused = !paused; render(); restart(); });
    dots.forEach(dot => dot.addEventListener('click', () => { go(Number(dot.dataset.slide)); restart(); }));
    let scrollTimer;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        index = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
        render();
      }, 120);
    }, { passive: true });
    new ResizeObserver(() => { track.scrollTo({ left: index * track.clientWidth, behavior: 'instant' }); }).observe(track);
    motion.addEventListener('change', () => { cancelTurn(); paused = motion.matches; render(); });
    document.addEventListener('shilis:launch-closed', () => { go(0); restart(); });
    render();
    restart();
  });
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-primary-nav]');
  if (toggle && nav) {
    const close = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) close(); });
  }
  const dialog = document.querySelector('.booking-dialog');
  if (dialog) {
    let opener;
    const openBooking = button => {
      opener = button;
      if (button?.dataset.service) dialog.querySelector('#servicio').value = button.dataset.service;
      nav?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('booking-open');
    };
    document.querySelectorAll('[data-booking-open]').forEach(button => {
      button.addEventListener('click', () => openBooking(button));
    });
    dialog.querySelector('[data-booking-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('booking-open');
      if (opener?.getClientRects().length) opener.focus();
      else toggle?.focus();
    });
    if (location.hash === '#agenda-tu-momento') openBooking();
  }
})();

/* Show the renovation poster on arrival at home; keep booking deep links direct. */
(() => {
  'use strict';
  const announcement = document.getElementById('novedad-shilis');
  if (!announcement || typeof announcement.showModal !== 'function') return;
  const sessionKey = 'shilis-renovacion-2026-11';
  const notice = document.querySelector('[data-launch-notice]');
  let opener = null;
  const wasSeen = () => { try { return sessionStorage.getItem(sessionKey) === 'seen'; } catch { return false; } };
  const dismissNotice = () => {
    if (notice) notice.hidden = true;
    try { sessionStorage.setItem(sessionKey, 'seen'); } catch { /* Works without storage. */ }
  };
  const open = (trigger = null) => {
    if (announcement.open || document.querySelector('dialog[open]')) return;
    opener = trigger;
    announcement.showModal();
    document.body.classList.add('launch-open');
    dismissNotice();
  };
  announcement.querySelectorAll('[data-launch-close]').forEach(button => button.addEventListener('click', () => announcement.close()));
  announcement.addEventListener('click', event => { if (event.target === announcement) announcement.close(); });
  announcement.addEventListener('close', () => {
    document.body.classList.remove('launch-open');
    const focusTarget = opener?.getClientRects().length ? opener : document.querySelector('.logo-link');
    focusTarget?.focus({preventScroll:true});
    document.dispatchEvent(new CustomEvent('shilis:launch-closed'));
  });
  document.querySelectorAll('[data-launch-open]').forEach(button => button.addEventListener('click', () => open(button)));
  notice?.querySelector('[data-notice-close]')?.addEventListener('click', dismissNotice);
  if (notice && (wasSeen() || location.hash === '#agenda-tu-momento')) notice.hidden = true;
  if (document.querySelector('[data-featured-slider]') && location.hash !== '#agenda-tu-momento') {
    const poster = announcement.querySelector('img');
    if (poster) {
      poster.loading = 'eager';
      poster.fetchPriority = 'high';
    }
    open();
  }
})();
