(() => {
  const button = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  const small = window.matchMedia('(max-width: 760px)');
  const setOpen = open => { nav.hidden = !open; button.setAttribute('aria-expanded', String(open)); };
  const sync = () => { button.hidden = !small.matches; setOpen(!small.matches); };
  sync(); small.addEventListener('change', sync);
  button.addEventListener('click', () => setOpen(nav.hidden));
  nav.addEventListener('click', event => { if(event.target.closest('a') && small.matches) setOpen(false); });
  document.addEventListener('keydown', event => { if(event.key === 'Escape' && small.matches && !nav.hidden) { setOpen(false); button.focus(); } });
  const year = document.querySelector('[data-year]');
  if(year) year.textContent = new Date().getFullYear();
  // Independent details remain open; do not collapse another case while reviewing images.
  const revealHash = () => { const id = decodeURIComponent(location.hash.slice(1)); const target = document.getElementById(id); if(target) { const details = target.closest('details'); if(details) details.open = true; } };
  window.addEventListener('hashchange', revealHash); revealHash();
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if(!link || !link.hash) return;
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    const details = target?.closest('details');
    if(details) details.open = true;
  });
  const dialog = document.querySelector('.image-dialog');
  let lastLink;
  if(dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('.shot-link').forEach(link => link.addEventListener('click', event => {
      if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); lastLink = link;
      const image = link.querySelector('img');
      dialog.querySelector('img').src = image.src;
      dialog.querySelector('img').alt = image.alt;
      dialog.querySelector('.dialog-title').textContent = image.alt + ' · ' + (link.dataset.imageNote || '敏感区域已遮盖');
      dialog.showModal(); dialog.querySelector('.dialog-content').scrollTop = 0;
    }));
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if(event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => { if(lastLink) lastLink.focus(); });
  }
  const sections = [...nav.querySelectorAll('a')].map(a => document.querySelector(a.hash)).filter(Boolean);
  let scheduled = false;
  const updateCurrent = () => {
    scheduled = false;
    const active = [...sections].reverse().find(s => s.getBoundingClientRect().top <= 150) || sections[0];
    nav.querySelectorAll('a').forEach(a => {
      if (active && a.hash === '#' + active.id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', () => { if(!scheduled) { scheduled = true; requestAnimationFrame(updateCurrent); } }, { passive: true });
  updateCurrent();
})();
