document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const hero = document.querySelector('.hero');
if (hero) requestAnimationFrame(() => hero.classList.add('hero-ready'));

const progress = document.querySelector('.scroll-progress');
let scrollQueued = false;
function updateProgress() {
  const length = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${length > 0 ? Math.min(1, window.scrollY / length) : 0})`;
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const counters = [...document.querySelectorAll('[data-count]')];
function runCounter(node) {
  const target = Number(node.dataset.count);
  const suffix = node.dataset.suffix || '';
  if (!Number.isFinite(target) || reduceMotion.matches) {
    node.textContent = `${target}${suffix}`;
    return;
  }
  const duration = 1300;
  let start;
  function tick(now) {
    start ??= now;
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    node.textContent = `${Math.round(target * eased)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if ('IntersectionObserver' in window && counters.length) {
  const countObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      counters.forEach(runCounter);
      countObserver.disconnect();
    }
  }, { threshold: .3 });
  countObserver.observe(document.querySelector('.hero-markers'));
}

if (finePointer.matches && !reduceMotion.matches) {
  document.querySelectorAll('.solution-card, .award-card, .article-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(850px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
  document.querySelectorAll('.button, .header-action').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .09;
      const y = (event.clientY - rect.top - rect.height / 2) * .09;
      button.style.translate = `${x}px ${y}px`;
    });
    button.addEventListener('pointerleave', () => { button.style.translate = ''; });
  });
}

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
    }
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}
