const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,

  },
  apiUrl: {
    API_KEY: "3b3f391c070b491aa50399a2a2811dda",
    API_URL: "https://api.themoviedb.org/3/",
  }
}

function highlightActivelink() {

  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  })
}

// Display Popular Movies (GET)
async function displayPopularMovies() {
  const { results } = await fetchApiData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${movie.poster_path ? `
            <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />
            ` : `
            <img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />
            `
      }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;

    document.querySelector("#popular-movies").appendChild(div);
  })
}

// Display Popular TV Show (GET)
async function displayPopularTvshow() {

  const { results } = await fetchApiData('tv/popular');

  results.forEach((tvShow) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="tv-details.html?id=${tvShow.id}">
        ${tvShow.poster_path ? `
        <img
        src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
        class="card-img-top"
        alt="Show Title"/>
        ` : `
        <imgsrc="../images/no-image.jpg"
        class="card-img-top"
        alt="Show Title"
        />
      `}
        </a>
        <div class="card-body">
          <h5 class="card-title">${tvShow.name}</h5>
          <p class="card-text">
            <small class="text-muted">Aired: ${tvShow.first_air_date}</small>
          </p>
        </div>
        `
    document.querySelector("#popular-shows").appendChild(div);
  })
}

// Display Movie Details (GET)
async function displayMovieDetails() {

  const movieId = window.location.search.split("=")[1];

  const movie = await fetchApiData(`movie/${movieId}`);

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement("div");
  div.classList.add("details-top");
  div.innerHTML = `
      <div class="details-item">
        <div>
        ${movie.poster_path ? `
            <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />
            ` : `
            <img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />
            `
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
          <a href=${movie.homepage} target="_blank" class="btn">Visit ${movie.title} Homepage</a>
        </div>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget :</span> $ ${AddCommatoNum(movie.budget)}</li>
          <li><span class="text-secondary">Revenue :</span> $ ${AddCommatoNum(movie.revenue)}</li>
          <li><span class="text-secondary">Runtime :</span> ${movie.runtime} minutes</li>
          <li><span class="text-secondary">Status :</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        ${movie.production_companies.map((item) => `<span>${item.name}</span>`)}
        `

  document.querySelector("#movie-details").appendChild(div);
}

// Display TV show Details (GET)
async function displayTvShowDetails() {

  const showId = window.location.search.split("=")[1];

  const show = await fetchApiData(`tv/${showId}`);

  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement("div");
  div.classList.add("details-top");
  div.innerHTML = `
  <div class="details-item">
      <div>
      ${show.poster_path ? `
       <img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="Show Title"
        />
          ` : `
          <img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="Show Title"
        />
          `
    }
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${show.first_air_date}</p>
        <p>
        ${show.overview}
        </p>
        <h5>Genres</h5>
        ${show.genres.map((item) => `<li>${item.name}</li>`).join("")}
        <a href=${show.homepage} target="_blank" class="btn">Visit ${show.name} Homepage</a>
      </div>
      </div>
      <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
        <li>
          <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
        </li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      ${show.production_companies.map((item) => `<span>${item.name}</span>`)}
      </div>
  `
  document.querySelector("#show-details").appendChild(div);
}

// Search Movies and Tvshows (GET)
async function displaySearchData() {

  const string = window.location.search;
  const URLparams = new URLSearchParams(string);
  global.search.type = URLparams.get('type');
  global.search.term = URLparams.get('search-term');

  if (global.search.term !== "" && global.search.term !== null) {
    const { results } = await fetchSearchApiData();

    results.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("card");

      const posterPath = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "../images/no-image.jpg";
      const title = global.search.type === "movie" ? item.title : item.name;
      const releaseDate = global.search.type === "movie" ? item.release_date : item.first_air_date;

      div.innerHTML = `
       <a href="${global.search.type === 'movie' ? 'movie-details.html' : 'tv-details.html'}?id=${item.id}">
          <img src="${posterPath}" class="card-img-top" alt="" />
        </a>
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${releaseDate}</small>
          </p>
        </div>
      `;

      document.querySelector("#search-results").appendChild(div);
    });

  } else {
    showAlert("please enter a search term");
  }
}


// Spinner or loading icon
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}


function AddCommatoNum(num) {
  return num.toLocaleString();
}

function showAlert(message, className) {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 2000);
}


// Display Background Image
function displayBackgroundImage(type, backgroundPath) {

  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
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

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Swiper or Slider
async function displaySlider() {
  const { results } = await fetchApiData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement("swiper-slide");
    div.classList.add("swiper-slide");
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Endpoint to Retrive all data
async function fetchApiData(endpoint) {
  const API_URL = global.apiUrl.API_URL;
  const API_KEY = global.apiUrl.API_KEY;

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  console.log(await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`));

  const data = await response.json();

  hideSpinner();

  console.log(data);
  return data;
}


// Endpoint to Search
async function fetchSearchApiData() {
  const API_URL = global.apiUrl.API_URL;
  const API_KEY = global.apiUrl.API_KEY;

  showSpinner();

  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);

  const data = await response.json();

  hideSpinner();

  console.log(data);
  return data;
}


function init() {

  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/search.html":
      displaySearchData();
      break;
    case "/shows.html":
      displayPopularTvshow();
      break;
    case "/tv-details.html":
      displayTvShowDetails();
      break;
  }

  highlightActivelink();
}

document.addEventListener("DOMContentLoaded", init);