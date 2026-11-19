const articles = [
  {
    id: 'lgpd', category: 'juridico', label: 'JURÍDICO · PRIVACIDADE',
    title: 'O impacto da LGPD na comunicação com devedores',
    intro: 'A recuperação de crédito precisa conciliar eficiência, transparência e respeito aos dados pessoais.',
    body: [
      'A comunicação com devedores envolve informações pessoais e financeiras. Por isso, as equipes precisam conhecer a finalidade do tratamento, limitar o uso ao necessário e manter canais seguros.',
      'O conteúdo publicado pela MCSA destaca a importância de processos claros, treinamento e cuidado para que a abordagem preserve a privacidade e evite exposição indevida.'
    ]
  },
  {
    id: 'dados', category: 'dados', label: 'DADOS · ESTRATÉGIA',
    title: 'Como criar uma estratégia de recuperação baseada em dados',
    intro: 'Informações bem organizadas ajudam a entender prioridades e escolher a abordagem para cada carteira.',
    body: [
      'Uma estratégia orientada por dados começa pela qualidade das informações e pela leitura do histórico de cada crédito. A partir daí, é possível segmentar casos, organizar prioridades e acompanhar indicadores.',
      'A análise contínua mostra o que funcionou e onde ajustar a régua de atuação, conectando decisões operacionais a resultados mensuráveis.'
    ]
  },
  {
    id: 'ia', category: 'tecnologia', label: 'TECNOLOGIA · INOVAÇÃO',
    title: 'Como a inteligência artificial pode ajudar na recuperação de crédito',
    intro: 'A tecnologia pode apoiar a análise de grandes carteiras e tornar os fluxos de trabalho mais eficientes.',
    body: [
      'Ferramentas de inteligência artificial podem auxiliar a identificar padrões, organizar informações e apoiar a priorização de casos. A aplicação responsável depende de dados adequados e supervisão humana.',
      'No contexto jurídico, decisões e comunicações também precisam respeitar as regras de privacidade e as particularidades de cada situação.'
    ]
  },
  {
    id: 'seguranca', category: 'tecnologia', label: 'TECNOLOGIA · SEGURANÇA',
    title: 'Segurança da informação na recuperação de créditos',
    intro: 'Proteger informações sensíveis é parte essencial de qualquer operação de recuperação.',
    body: [
      'Carteiras de crédito reúnem dados que exigem controle de acesso, armazenamento cuidadoso e processos claros de comunicação.',
      'A segurança precisa fazer parte da rotina das equipes e da escolha das ferramentas utilizadas ao longo da operação.'
    ]
  },
  {
    id: 'negociacao', category: 'juridico', label: 'JURÍDICO · NEGOCIAÇÃO',
    title: 'A arte da negociação em situações complexas',
    intro: 'Profissionais preparados ajudam a construir caminhos viáveis em conversas delicadas.',
    body: [
      'Em créditos complexos, a qualidade da negociação depende de escuta, conhecimento do caso e clareza sobre as possibilidades de acordo.',
      'A abordagem especializada pode reduzir atritos e buscar uma solução compatível com os objetivos de recuperação e a realidade apresentada.'
    ]
  },
  {
    id: 'risco', category: 'dados', label: 'DADOS · ANÁLISE',
    title: 'Mapeamento de risco com apoio da tecnologia',
    intro: 'O risco de uma carteira pode ser compreendido com informações consistentes e análise estruturada.',
    body: [
      'O mapeamento organiza sinais relevantes para identificar prioridades e orientar os próximos passos da recuperação.',
      'Tecnologia e análise humana se complementam: os indicadores ajudam a enxergar padrões, enquanto a equipe interpreta o contexto de cada caso.'
    ]
  },
  {
    id: 'especializacao', category: 'juridico', label: 'JURÍDICO · ESPECIALIZAÇÃO',
    title: 'Por que contar com um escritório especializado',
    intro: 'A recuperação de crédito exige uma combinação de técnica jurídica, organização e capacidade de negociação.',
    body: [
      'Uma equipe especializada pode estruturar a carteira, definir prioridades e conduzir interações com mais consistência.',
      'A atuação deve considerar tanto o resultado financeiro quanto a preservação da reputação e dos relacionamentos da empresa.'
    ]
  },
  {
    id: 'terceirizacao', category: 'juridico', label: 'JURÍDICO · GESTÃO',
    title: 'Terceirização especializada e reputação',
    intro: 'A forma de conduzir a cobrança influencia a percepção sobre a empresa credora.',
    body: [
      'Processos claros e profissionais preparados ajudam a manter a comunicação coerente em diferentes etapas da recuperação.',
      'Ao escolher parceiros, vale avaliar a capacidade técnica, a governança e o cuidado com dados e com a experiência das pessoas envolvidas.'
    ]
  },
  {
    id: 'alto-valor', category: 'dados', label: 'DADOS · ESTRATÉGIA',
    title: 'Créditos complexos e de alto valor',
    intro: 'Casos de maior complexidade pedem leitura individual e decisões proporcionais ao seu potencial.',
    body: [
      'Créditos de alto valor podem envolver histórico extenso e múltiplas possibilidades de negociação. O diagnóstico é o ponto de partida para entender riscos e oportunidades.',
      'Com informações organizadas, a equipe pode construir uma estratégia mais adequada e acompanhar seu desempenho ao longo do tempo.'
    ]
  }
];

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  menu.classList.toggle('open', !open);
});
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const grid = document.getElementById('article-grid');
const dialog = document.getElementById('article-dialog');
const renderArticles = (filter = 'todos') => {
  const visible = articles.filter(article => filter === 'todos' || article.category === filter);
  grid.innerHTML = visible.map(article => `
    <button class="article-card reveal visible" type="button" data-article="${article.id}">
      <span>${article.label}</span><h3>${article.title}</h3><b aria-hidden="true">↗</b>
    </button>`).join('');
};
renderArticles();

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderArticles(button.dataset.filter);
}));
grid.addEventListener('click', event => {
  const card = event.target.closest('[data-article]');
  if (!card) return;
  const article = articles.find(item => item.id === card.dataset.article);
  if (!article) return;
  document.getElementById('article-dialog-category').textContent = article.label;
  document.getElementById('article-dialog-title').textContent = article.title;
  document.getElementById('article-dialog-intro').textContent = article.intro;
  document.getElementById('article-dialog-body').replaceChildren(...article.body.map(text => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
  }));
  dialog.showModal();
  document.body.style.overflow = 'hidden';
});
const closeDialog = () => {
  if (dialog.open) dialog.close();
  document.body.style.overflow = '';
};
dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('cancel', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
dialog.querySelector('.dialog-contact').addEventListener('click', closeDialog);

document.querySelectorAll('.method-list details').forEach(detail => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  document.querySelectorAll('.method-list details').forEach(other => {
    if (other !== detail) other.open = false;
  });
}));

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    showToast('Copiado para a área de transferência');
  } catch {
    showToast(button.dataset.copy);
  }
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
