const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const pointerMotion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
const hero = document.querySelector('.hero');
const portrait = hero.querySelector('.photo-frame');
const methodList = document.querySelector('.method-list');
const steps = [...methodList.children];
const stepLinks = [...document.querySelectorAll('.method-nav a')];
const progress = document.querySelector('.scroll-progress');
const ticker = document.querySelector('.hero-ticker');
const tickerToggle = ticker.querySelector('button');
const clamp = value => Math.max(0, Math.min(1, value));

document.documentElement.classList.add('js');
requestAnimationFrame(() => hero.classList.add('hero-ready'));

tickerToggle.hidden = false;
tickerToggle.addEventListener('click', () => {
  const paused = ticker.classList.toggle('paused');
  tickerToggle.textContent = paused ? '▶' : 'Ⅱ';
  tickerToggle.setAttribute('aria-label', paused ? 'Retomar faixa de empresas' : 'Pausar faixa de empresas');
});

let currentStep = -1;
function updateScene() {
  const y = Math.max(window.scrollY, 0);
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? clamp(y / range) : 0})`;

  if (!reduceMotion.matches && y <= hero.offsetHeight) {
    const zoom = 1.025 + clamp(y / hero.offsetHeight) * .085;
    portrait.style.setProperty('--portrait-scale', zoom.toFixed(3));
  }

  const listBox = methodList.getBoundingClientRect();
  const readingLine = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)
    + parseFloat(getComputedStyle(steps[0]).scrollMarginTop) + 2;
  methodList.style.setProperty('--method-progress', clamp((readingLine - listBox.top + 32) / listBox.height).toFixed(3));
  let active = 0;
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].getBoundingClientRect().top > readingLine) break;
    active = i;
  }
  if (active !== currentStep) {
    steps.forEach((step, i) => {
      step.classList.toggle('is-current', i === active);
      if (i === active) stepLinks[i].setAttribute('aria-current', 'step');
      else stepLinks[i].removeAttribute('aria-current');
    });
    currentStep = active;
  }
}

let scheduled = false;
function scheduleScene() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    updateScene();
  });
}
window.addEventListener('scroll', scheduleScene, { passive: true });
window.addEventListener('resize', scheduleScene);
window.addEventListener('load', scheduleScene);
if ('ResizeObserver' in window) new ResizeObserver(scheduleScene).observe(document.body);
scheduleScene();

for (const surface of [portrait, ...document.querySelectorAll('.solution-card')]) {
  function clearPointer() {
    for (const key of ['--light-x', '--light-y', '--portrait-x', '--portrait-y']) {
      surface.style.removeProperty(key);
    }
  }
  surface.addEventListener('pointermove', event => {
    if (!pointerMotion.matches) return;
    const rect = surface.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width);
    const y = clamp((event.clientY - rect.top) / rect.height);
    surface.style.setProperty('--light-x', `${x * 100}%`);
    surface.style.setProperty('--light-y', `${y * 100}%`);
    if (surface === portrait) {
      surface.style.setProperty('--portrait-x', `${(x - .5) * 6}px`);
      surface.style.setProperty('--portrait-y', `${(y - .5) * 6}px`);
    }
  });
  surface.addEventListener('pointerleave', clearPointer);
  pointerMotion.addEventListener('change', clearPointer);
}

const counters = [...hero.querySelectorAll('[data-count]')];
function runCounter(node) {
  const target = Number(node.dataset.count);
  const suffix = node.dataset.suffix || '';
  const start = performance.now();
  function tick(now) {
    const t = reduceMotion.matches ? 1 : clamp((now - start) / 1050);
    node.textContent = `${Math.round(target * (1 - (1 - t) ** 3))}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if ('IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      if (!reduceMotion.matches) counters.forEach(runCounter);
      countObserver.disconnect();
    }
  }, { threshold: .3 });
  countObserver.observe(hero.querySelector('.hero-markers'));

  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => link.classList.toggle('is-current', link.hash === `#${entry.target.id}`));
    }
  }, { rootMargin: '-25% 0px -65% 0px' });
  links.forEach(link => sectionObserver.observe(document.querySelector(link.hash)));
}
