/* Progressive enhancement; no framework or tracking required. */
(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
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
  const form = document.querySelector('#reservation-form');
  if (form) {
    const nameInput = form.querySelector('#nombre');
    nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fullName = nameInput.value.trim().replace(/\s+/g, ' ');
      nameInput.setCustomValidity(fullName.length < 3 ? 'Escribe tu nombre completo.' : '');
      if (!form.reportValidity()) return;
      const f = new FormData(form);
      const service = String(f.get('servicio') || '').trim();
      const date = String(f.get('fecha') || '').trim();
      const time = String(f.get('hora') || '').trim();
      const note = String(f.get('mensaje') || '').trim();
      const lines = ["Hola, Shili's. Quisiera consultar disponibilidad para una cita.", `Nombre completo: ${fullName}.`, `Servicio: ${service}.`, date ? `Fecha preferida: ${date}.` : '', `Hora preferida: ${time}.`, note ? `Detalles: ${note}` : '', 'Quedo pendiente de su confirmación.'].filter(Boolean);
      window.open(`https://wa.me/573187862277?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
    });
  }
})();
