const blogMenuButton = document.querySelector('.menu-button');
const blogMenu = document.querySelector('.nav');
blogMenuButton.addEventListener('click', () => {
  const open = blogMenuButton.getAttribute('aria-expanded') === 'true';
  blogMenuButton.setAttribute('aria-expanded', String(!open));
  blogMenuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  blogMenu.classList.toggle('open', !open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  blogMenu.classList.remove('open');
  blogMenuButton.setAttribute('aria-expanded', 'false');
  blogMenuButton.setAttribute('aria-label', 'Abrir menu');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const articleUrl = article => `blog.html?artigo=${encodeURIComponent(article.slug)}`;
const dateLabel = value => new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
const shortDate = value => new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`)).replace('.', '');
const make = (tag, className, value) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value) element.textContent = value;
  return element;
};

function makeCard(article, index) {
  const link = make('a', 'blog-post-card');
  link.href = articleUrl(article);
  link.setAttribute('aria-label', `Ler artigo: ${article.title}`);
  const art = make('div', 'post-art');
  art.dataset.tone = ['light', 'dark', 'warm'][index % 3];
  art.append(make('span', '', `MCSA / ${String(index + 1).padStart(2, '0')}`));
  const content = make('div', 'post-content');
  const meta = make('div', 'post-meta');
  meta.append(make('span', '', article.category));
  const time = make('time', '', shortDate(article.date));
  time.dateTime = article.date;
  meta.append(time);
  const arrow = make('span', 'post-arrow', 'Ler artigo');
  const arrowIcon = make('b', '', '↗');
  arrowIcon.setAttribute('aria-hidden', 'true');
  arrow.append(arrowIcon);
  content.append(meta, make('h3', '', article.title), make('p', '', article.excerpt), arrow);
  link.append(art, content);
  return link;
}

function initList() {
  const featured = blogArticles[0];
  document.getElementById('featured-link').href = articleUrl(featured);
  document.getElementById('featured-category').textContent = featured.category;
  document.getElementById('featured-date').textContent = dateLabel(featured.date);
  document.getElementById('featured-title').textContent = featured.title;
  document.getElementById('featured-excerpt').textContent = featured.excerpt;

  const grid = document.getElementById('blog-grid');
  const filters = document.getElementById('blog-filters');
  const search = document.getElementById('blog-search');
  const loadMore = document.getElementById('load-more');
  const count = document.getElementById('results-count');
  const empty = document.getElementById('empty-state');
  let category = 'Todos';
  let visibleCount = 9;
  const categories = ['Todos', ...new Set(blogArticles.map(article => article.category))];

  function render() {
    const term = search.value.trim().toLocaleLowerCase('pt-BR');
    const filtered = blogArticles.filter(article => {
      if (category !== 'Todos' && article.category !== category) return false;
      if (!term) return true;
      return [article.title, article.category, article.excerpt, ...article.blocks.map(block => block.text)].join(' ').toLocaleLowerCase('pt-BR').includes(term);
    });
    grid.replaceChildren(...filtered.slice(0, visibleCount).map((article, index) => makeCard(article, blogArticles.indexOf(article))));
    count.textContent = `${filtered.length} ${filtered.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}`;
    loadMore.hidden = filtered.length <= visibleCount;
    empty.hidden = filtered.length > 0;
  }

  for (const name of categories) {
    const button = make('button', `blog-filter${name === category ? ' active' : ''}`, name);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(name === category));
    button.addEventListener('click', () => {
      category = name;
      visibleCount = 9;
      filters.querySelectorAll('button').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      render();
    });
    filters.append(button);
  }
  search.addEventListener('input', () => { visibleCount = 9; render(); });
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { search.value = ''; render(); search.blur(); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      event.preventDefault();
      search.focus();
    }
  });
  loadMore.addEventListener('click', () => { visibleCount += 9; render(); });
  render();
}

function initArticle(article) {
  document.getElementById('blog-list-view').hidden = true;
  document.getElementById('blog-article-view').hidden = false;
  document.title = `${article.title} | Blog MCSA`;
  document.querySelector('meta[name="description"]').content = article.excerpt;
  document.getElementById('reading-category').textContent = article.category;
  const date = document.getElementById('reading-date');
  date.dateTime = article.date;
  date.textContent = dateLabel(article.date);
  document.getElementById('reading-minutes').textContent = `${article.minutes} min de leitura`;
  document.getElementById('reading-title').textContent = article.title;
  document.getElementById('reading-intro').textContent = article.excerpt;
  const body = document.getElementById('reading-body');
  let list = null;
  for (const block of article.blocks) {
    if (block.type === 'list') {
      if (!list) { list = make('ul'); body.append(list); }
      list.append(make('li', '', block.text));
    } else {
      list = null;
      body.append(make(block.type === 'heading' ? 'h2' : 'p', '', block.text));
    }
  }
  const related = blogArticles.filter(item => item !== article && item.category === article.category).slice(0, 2);
  const relatedGrid = document.getElementById('related-grid');
  for (const item of related) {
    const card = make('a', 'related-card');
    card.href = articleUrl(item);
    const arrow = make('b', '', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    card.append(make('span', '', item.category), make('strong', '', item.title), arrow);
    relatedGrid.append(card);
  }
  document.getElementById('copy-link').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      showToast('Link copiado');
    } catch { showToast('Copie o endereço da página no navegador'); }
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

const slug = new URLSearchParams(location.search).get('artigo');
const selected = blogArticles.find(article => article.slug === slug);
if (selected) initArticle(selected);
else initList();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
