const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");
async function loadMovies(searchTerm) {
	const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=84de89e9`;
	const res = await fetch(`${URL}`);
	const data = await res.json();
	if (data.Response == "True") displayMovieList(data.Search);
}
function findMovies() {
	let searchTerm = movieSearchBox.value.trim();
	if (searchTerm.length > 0) {
		searchList.classList.remove("hide-search-list");
		loadMovies(searchTerm);
	} else {
		searchList.classList.add("hide-search-list");
	}
}
function displayMovieList(movies) {
	searchList.innerHTML = "";
	for (let idx = 0; idx < movies.length; idx++) {
		let movieListItem = document.createElement("div");
		movieListItem.dataset.id = movies[idx].imdbID;
		movieListItem.classList.add("search-list-item");
		if (movies[idx].Poster != "N/A") moviesPoster = movies[idx].Poster;
		else moviesPoster = "image_not_found.jpg";
		movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviesPoster}" alt="" />
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
		searchList.appendChild(movieListItem);
	}
	loadMovieDetails();
}
function loadMovieDetails() {
	const searchListMovies = searchList.querySelectorAll(".search-list-item");
	searchListMovies.forEach((movie) => {
		movie.addEventListener("click", async () => {
			searchList.classList.add("hide-search-list");
			movieSearchBox.value = "";
			const result = await fetch(
				`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`
			);
			const movieDetails = await result.json();
			displayMovieDetails(movieDetails);
		});
	});
}
function displayMovieDetails(details) {
	resultGrid.innerHTML = `
    <div class="movie-poster">
			<img src="${
				details.Poster != "N/A" ? details.Poster : "image_not_found.jpg"
			}" alt="" />
		</div>
		<div class="movie-info">
			<h3 class="movie-title">${details.Title}</h3>
			<ul class="movie-misc-info">
				<li class="year">Year: ${details.Year}</li>
				<li class="rated">${details.Rated}</li>
				<li class="release">${details.Released}</li>
			</ul>
			<p class="genre"><b>Genre: </b>${details.Genre}</p>
			<p class="writer">
		<b>Writer: </b>${details.Writer}
					</p>
    		<p class="actor">
    			<b>Actors: </b>${details.Actors}
    		</p>
    		<p class="plot">
    			<b>Plot: </b>${details.Plot}
			</p>
			<p class="language"><b>Language: </b>${details.Language}</p>
			<p class="awards">
				<i class="fa-solid fa-award"></i>${details.Awards}
			</p>
		</div>
    `;
}
