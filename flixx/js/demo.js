const globalData = {
    currentPage: window.location.pathname,
};

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "3b3f391c070b491aa50399a2a2811dda";

async function displayPopularMovies() {
    const { results } = await fetchApiData('movie/popular');

    results.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <a href="movie-details.html?id=${item.id}">
            ${item.poster_path ? `
                <img
                src="https://image.tmdb.org/t/p/w500${item.poster_path}"
                class="card-img-top"
                alt="Movie Title"
                />
            ` : `
                <img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title"
                />
            `}
            </a>
            <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${item.release_date}</small>
            </p>
            </div>
        `;

        document.querySelector("#popular-movies").appendChild(div);
    });
}

async function displayPopularTvshow() {

    const { results } = await fetchApiData('tv/popular');

    results.forEach((tvshow) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <a href="tv-details.html?id=${tvshow.id}">
        ${tvshow.poster_path ? `
        <img
        src="https://image.tmdb.org/t/p/w500${tvshow.poster_path}"
        class="card-img-top"
        alt="Show Title"
      />` : `
      <img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="Show Title"
      />
    `}
        </a>
        <div class="card-body">
          <h5 class="card-title">${tvshow.name}</h5>
          <p class="card-text">
            <small class="text-muted">Aired: ${tvshow.first_air_date}</small>
          </p>
        </div>
        `
        document.querySelector("#popular-shows").appendChild(div);
    });
}

async function displayMovieDetail() {

    const movieId = document.location.search.split("=")[1];

    const movie = await fetchApiData(`movie/${movieId}`);

    displayBackgroundImage("movie", movie.backdrop_path);
    const div = document.createElement("div");
    div.classList.add("details-top");
    div.innerHTML = `
    <div class="details-item">
    <div>
      ${movie.poster_path ? `
      <img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt = "Movie Title" />
        ` : `
        < img
    src = "../images/no-image.jpg"
    class="card-img-top"
    alt = "Movie Title"
        /> `
        }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      ${movie.genres.map((item) => `<li>${item.name}</li>`).join("")}
      <a href=${movie.homepage} target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
      </div>
      <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $ ${AddCommaToNum(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $ ${AddCommaToNum(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${AddCommaToNum(movie.runtime)} minutes</li>
        <li><span class="text-secondary">Status:</span> ${AddCommaToNum(movie.status)}</li>
      </ul>
      <h4>Production Companies</h4>
      ${movie.production_companies.map((item) => `<span>${item.name}</span>`)}
    </div>
    `;

    document.querySelector("#movie-details").appendChild(div);
}

async function displayTvShowDetail() {

    const showId = window.location.search.split("=")[1];
    const show = await fetchApiData(`tv/${showId}`);

    displayBackgroundImage("show", show.backdrop_path);
    const div = document.createElement("div");
    div.classList.add('details-top');
    div.innerHTML = `
    <div class="details-item">
    <div>
      ${show.poster_path ?
            `<img
         src="https://image.tmdb.org/t/p/w500${show.poster_path}"
         class="card-img-top"
         alt="Show Name"/>
        ` : `
        <img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="Show Name"
      />`
        }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average} / 10
      </p>
      <p class="text-muted">Release Date: ${show.first_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      ${show.genres.map((item) => `<li>${item.name}</li>`).join("")}
      <a href=${show.homepage} target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes
        }</li>
      <li>
        <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
      </li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    ${show.production_companies.map((item) => `<span>${item.name}</span>`)}
  </div>
    `;

    document.querySelector("#show-details").appendChild(div);
}

function AddCommaToNum(num) {
    return num.toLocaleString();
}

function displayBackgroundImage(title, image) {

    const overlayDiv = document.createElement("div");
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${image})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.2';

    if (title === "movie") {
        document.querySelector("#movie-details").appendChild(overlayDiv);
    } else {
        document.querySelector("#show-details").appendChild(overlayDiv);
    }

}
async function fetchApiData(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    console.log(await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`));
    const data = await response.json();
    console.log(data);
    return data;
}

function init() {
    switch (globalData.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/movie-details.html':
            displayMovieDetail();
            break;
        case '/search.html':
            console.log("Search");
            break;
        case '/shows.html':
            displayPopularTvshow();
            break;
        case '/tv-details.html':
            displayTvShowDetail();
            break;
    }
}

document.addEventListener("DOMContentLoaded", init);
