
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

document.addEventListener("DOMContentLoaded", async () => {
  const pages = ["about.html", "history.html", "members.html", "discography.html", "store.html"];
  const content = document.getElementById("content");

  for (const page of pages) {
    try {
      const response = await fetch(page);
      const html = await response.text();
      const section = document.createElement("section");
      section.innerHTML = html;
      content.appendChild(section);
    } catch (err) {
      console.error("Erro ao carregar:", page, err);
    }
  }
});