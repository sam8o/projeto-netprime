// ========== CARROSSEL ==========
const allRows = document.querySelectorAll(".movie-row");

allRows.forEach((row) => {
  const container = row.querySelector(".movies");
  const leftBtn = row.querySelector(".arrow-left");
  const rightBtn = row.querySelector(".arrow-right");

  if (leftBtn && rightBtn && container) {
    leftBtn.addEventListener("click", () => {
      container.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      container.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
});

// ========== BARRA DE BUSCA ==========
const toggleSearch = document.querySelector(".search-icon i");
const searchBox = document.getElementById("searchbox");
const closeSearch = document.getElementById("closeSearch");

if (toggleSearch && searchBox && closeSearch) {
  toggleSearch.addEventListener("click", () => {
    searchBox.classList.toggle("active");
  });

  closeSearch.addEventListener("click", () => {
    searchBox.classList.remove("active");
  });
}

// ========== BOTÕES "MINHA LISTA" ==========
const addButtons = document.querySelectorAll(".add-to-list-btn");

addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Pega a imagem e o título com segurança
    const img = btn.closest(".movie-card")?.querySelector("img");
    const imgSrc = img?.getAttribute("src") || "./imgs/default.jpg";
    const title = img?.getAttribute("data-title") || "Título desconhecido";

    let lista = JSON.parse(localStorage.getItem("minhaLista")) || [];

    const exists = lista.some((item) => item.img === imgSrc);
    if (!exists) {
      lista.push({ img: imgSrc, title });
      localStorage.setItem("minhaLista", JSON.stringify(lista));
      alert(`${title} foi adicionado à sua lista.`);
    } else {
      alert("Esse filme já está na sua lista.");
    }
  });
});

// ========== FUNÇÃO DE TOAST ==========
function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = mensagem;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}

// ========== EXIBIR FILMES EM "MINHA LISTA" ==========
const listContainer = document.getElementById("myListContainer");
let savedList = JSON.parse(localStorage.getItem("minhaLista")) || [];

function mostrarFilmes() {
  if (!listContainer) return;

  listContainer.innerHTML = "";

  if (savedList.length === 0) {
    listContainer.innerHTML = "<p style='margin: 2rem;'>Nenhum filme na sua lista ainda.</p>";
    return;
  }

  savedList.forEach((filme, index) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const img = document.createElement("img");
    img.src = filme.img || "./imgs/default.jpg";
    img.alt = filme.title || "Filme sem título";

    const title = document.createElement("p");
    title.textContent = filme.title || "Título desconhecido";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover da Lista";
    removeBtn.classList.add("remove-from-list-btn");

    removeBtn.addEventListener("click", () => {
      card.classList.add("fade-out");

      setTimeout(() => {
        savedList.splice(index, 1);
        localStorage.setItem("minhaLista", JSON.stringify(savedList));
        mostrarFilmes();
        mostrarToast("Filme removido da lista ✅");
      }, 400);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(removeBtn);
    listContainer.appendChild(card);
  });
}

// Chama a função ao carregar a página "Minha Lista"
mostrarFilmes();



window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
  }
});
