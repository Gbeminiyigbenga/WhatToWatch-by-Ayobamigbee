const apiKey = "b6f0e8e1";

// Define search terms for each mood
const moodKeywords = {
  "Feel-Good": ["Paddington 2", "La La Land", "The Intouchables"],
  "Thriller": ["Knives Out", "Gone Girl", "Prisoners"],
  "Romance": ["Pride and Prejudice", "About Time", "Call Me by Your Name"],
  "Horror": ["Pearl", "Hereditary", "The Conjuring"],
  "Surprise Me": ["Inception", "Coco", "Get Out", "Titanic", "Parasite"]
};

const moodButtons = document.querySelectorAll(".mood-btn");
const recImage = document.querySelector(".poster");
const recTitle = document.querySelector(".card-content h2");
const recDesc = document.querySelector(".card-content p:nth-of-type(1)");
const recPlatform = document.querySelector(".card-content p:nth-of-type(2)");

async function fetchMovieData(title) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

moodButtons.forEach(button => {
  button.addEventListener("click", async () => {
    const mood = button.textContent;
    const keywordList = moodKeywords[mood] || moodKeywords["Surprise Me"];
    const randomIndex = Math.floor(Math.random() * keywordList.length);
    const movieTitle = keywordList[randomIndex];

    const movieData = await fetchMovieData(movieTitle);

    if (movieData && movieData.Response === "True") {
      recImage.src = movieData.Poster;
      recImage.alt = `${movieData.Title} Poster`;
      recTitle.textContent = `${movieData.Title} (${movieData.Year})`;
      recDesc.textContent = movieData.Plot;
      recPlatform.innerHTML = `<strong>Genre:</strong> ${movieData.Genre}`;
    } else {
      recTitle.textContent = "Oops! Movie not found.";
      recDesc.textContent = "";
      recImage.src = "assets/images/placeholder.jpg"; // Optional fallback image
      recPlatform.textContent = "";
    }
  });
});
