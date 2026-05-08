const container = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");

let gamesData = [];
let selectedCategory = "All";

fetch("./data/games.json")
  .then(res => res.json())
  .then(data => {
    gamesData = data;
    applyFilters();
  });

function displayGames(games) {
  container.innerHTML = "";

  if (games.length === 0) {
    container.innerHTML = "<p>No games found</p>";
    return;
  }

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${game.thumbnail}">
      <h3>${game.title}</h3>
      <p>${game.category}</p>
      <a href="game.html?src=${encodeURIComponent(game.iframe)}" class="play-btn">Play</a>
    `;

    container.appendChild(card);
  });
}

function applyFilters() {
  const search = searchInput.value.toLowerCase();

  let filtered = gamesData;

  if (selectedCategory !== "All") {
    filtered = filtered.filter(g =>
      g.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (search) {
    filtered = filtered.filter(g =>
      g.title.toLowerCase().includes(search)
    );
  }

  displayGames(filtered);
}

searchInput.addEventListener("input", applyFilters);

function filterGames(category) {
  selectedCategory = category;
  applyFilters();

  document.querySelectorAll(".cat").forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent === category) {
      btn.classList.add("active");
    }
  });
}