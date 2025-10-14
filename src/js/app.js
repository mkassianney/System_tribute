const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const links = document.querySelectorAll("nav a");
const content = document.getElementById("content");

toggle.addEventListener("click", () => {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    menu.classList.add("w-full");
    menu.classList.add("h-[35vh]");
    menu.style.maxHeight = menu.scrollHeight + "px";
    menu.style.opacity = "1";
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
    menu.classList.remove("w-full");
    menu.classList.remove("h-[35vh]");
    menu.style.maxHeight = "0";
    menu.style.opacity = "0";
  }
});

 async function loadAllPages(pages) {
  for (const page of pages) {
    try {
      const response = await fetch(`../src/views/${page}`);
      if (!response.ok) throw new Error(`Página ${page} não encontrada`);

      const html = await response.text();
      const section = document.createElement("section");
      section.id = page.replace(".html", "");
      section.innerHTML = html;
      section.classList.add("transition-all", "duration-500", "opacity-0", "translate-y-4","w-full");

      content.appendChild(section);

      requestAnimationFrame(() => {
        section.classList.remove("opacity-0", "translate-y-4");
      });

    } catch (err) {
      console.error(err);
      const section = document.createElement("section");
      section.innerHTML = `<h2 class="text-center text-red-600 py-12">Erro ao carregar ${page}</h2>`;
      content.appendChild(section);
    }
  }
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function animateSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.classList.add("opacity-0", "translate-y-4");

  requestAnimationFrame(() => {
    section.classList.remove("opacity-0", "translate-y-4");
  });
}

  const pages = ["about.html", "history.html", "discography.html", "members.html", "store.html"];

  document.addEventListener("DOMContentLoaded", async () => {
    await loadAllPages(pages);
    
    links.forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.dataset.page;

        scrollToSection(id);
        animateSection(id);

        if (!menu.classList.contains("hidden")) menu.classList.add("hidden");
        history.pushState({ page: id }, "", `#${id}`);
      });
    });

    const initialHash = location.hash.replace("#", "") || "index";
    scrollToSection(initialHash);
    animateSection(initialHash);

    window.addEventListener("popstate", (event) => {
      const id = event.state ? event.state.page : "index";
      scrollToSection(id);
      animateSection(id);
    });
  });

 