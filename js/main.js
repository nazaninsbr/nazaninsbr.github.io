document.addEventListener('DOMContentLoaded', () => {
  const allNavLinks = document.querySelectorAll('[data-page]');
  const pages = document.querySelectorAll('.page');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function showPage(id) {
    pages.forEach(p => p.classList.remove('active'));
    allNavLinks.forEach(a => a.classList.remove('active'));
    const target = document.getElementById('page-' + id);
    if (target) target.classList.add('active');
    document.querySelectorAll(`[data-page="${id}"]`).forEach(a => a.classList.add('active'));
    window.scrollTo(0, 0);
    history.pushState({ page: id }, '', '#' + id);
    if (mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open');
  }

  allNavLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });

  const validPages = ['home', 'publications', 'service', 'posters', 'cv', 'nonacademic'];
  const hash = window.location.hash.replace('#', '');
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage('home');
  }

  window.addEventListener('popstate', e => {
    if (e.state && e.state.page) showPage(e.state.page);
  });

  // Publication filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.pub-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
      });
    });
  });
});
