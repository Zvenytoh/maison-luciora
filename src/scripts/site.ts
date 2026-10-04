const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const dialog = document.querySelector<HTMLDialogElement>('#mobile-menu');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');

if (dialog && toggle) {
  toggle.addEventListener('click', () => { dialog.showModal(); toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; });
  const close = () => dialog.close();
  dialog.querySelector('.menu-close')?.addEventListener('click', close);
  dialog.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  dialog.addEventListener('close', () => { toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; });
}

const header = document.querySelector('#site-header');
const hero = document.querySelector<HTMLElement>('[data-parallax]');
const manifesto = Array.from(document.querySelectorAll<HTMLElement>('[data-manifesto-line]'));
let ticking = false;
function updateScroll() {
  const scrollY = window.scrollY;
  header?.classList.toggle('is-scrolled', scrollY > 80);
  if (!reducedMotion.matches) {
    if (hero && window.innerWidth > 767 && scrollY < window.innerHeight * 1.5) hero.style.transform = `translateY(${-Math.min(scrollY * .035, 25)}px)`;
    manifesto.forEach(line => {
      const y = line.getBoundingClientRect().top;
      line.style.opacity = String(Math.max(.46, Math.min(1, 1 - Math.abs(y - window.innerHeight * .46) / (window.innerHeight * .6))));
    });
  }
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } }, { passive: true });
updateScroll();

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-image-reveal]');
  // Mark above-the-fold content before enabling motion so it remains immediately visible.
  targets.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible'); });
  document.documentElement.classList.add('motion-enabled');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .06, rootMargin: '0px 0px -20px 0px' });
  targets.forEach(el => observer.observe(el));
  // Anchor navigation should never arrive on hidden content.
  window.addEventListener('hashchange', () => document.querySelectorAll('[data-reveal], [data-image-reveal]').forEach(el => el.classList.add('is-visible')));
}

document.querySelectorAll<HTMLAnchorElement>('[data-intention]').forEach(link => {
  const show = () => {
    const preview = link.closest('section')?.querySelector<HTMLElement>('[data-intention-preview]');
    if (!preview) return;
    preview.querySelectorAll<HTMLElement>('[data-preview-artwork]').forEach(el => { el.hidden = el.dataset.previewArtwork !== link.dataset.intention; });
  };
  link.addEventListener('pointerenter', show);
  link.addEventListener('focus', show);
});

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    document.documentElement.classList.remove('motion-enabled');
    if (hero) hero.style.transform = '';
    manifesto.forEach(line => line.style.opacity = '1');
  }
});
