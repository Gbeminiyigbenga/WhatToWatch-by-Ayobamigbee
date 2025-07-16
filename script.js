
const apiKey = "b6f0e8e1";
const grid = document.getElementById("recommendation-grid");

const moodTerms = {
  "Feel-Good": "comedy",
  "Thriller": "thriller",
  "Romance": "romance",
  "Horror": "horror",
  "Surprise Me": "movie"
};

async function fetchMoviesByKeyword(keyword) {
  const page = Math.floor(Math.random() * 3) + 1; // Page 1 to 3
  const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&page=${page}&apikey=${apiKey}`);
  const data = await res.json();
  return data.Search || [];
}

async function fetchMovieDetails(imdbID) {
  const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  return await res.json();
}

function clearGrid() {
  grid.innerHTML = "";
}

function createMovieCard(movie) {
  return `
    <div class="card">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "assets/images/default.jpg"}" class="poster" alt="${movie.Title} Poster">
      <div class="card-content">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p>${movie.Plot || "No description available."}</p>
        <p><strong>Genre:</strong> ${movie.Genre || "Unknown"}</p>
      </div>
    </div>
  `;
}

document.querySelectorAll(".mood-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const mood = button.textContent.trim();
    const keyword = moodTerms[mood] || "movie";
    clearGrid();
    const searchResults = await fetchMoviesByKeyword(keyword);

    for (let item of searchResults.slice(0, 6)) {
      const fullDetails = await fetchMovieDetails(item.imdbID);
      grid.innerHTML += createMovieCard(fullDetails);
    }
  });
});
