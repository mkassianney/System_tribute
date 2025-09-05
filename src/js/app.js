
  async function loadPage(page) {
    const response = await fetch(`${page}.html`);
    const html = await response.text();
    document.getElementById('app').innerHTML = html;
  }

  // Exemplo de navegação
  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      loadPage(link.dataset.page);
    });
  });

  // Carregar página inicial
  loadPage('index');

