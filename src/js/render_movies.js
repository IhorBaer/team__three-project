import MovieApiService from "./api/fetch_movies";
import { genres } from "./base/genres";
// import { apiFetch } from "./search-film";
import { refs } from './base/refs'
import { Pagination } from "./pagination";

export const movieApiService = new MovieApiService()

const nextPageBtn = refs.nextBtnPag
const prevPageBtn = refs.prevBtnPag
const spanPag = refs.spanPag
const startBtnPag = refs.startBtnPag
const lastBtnPag = refs.lastBtnPag


const containerGallery = document.querySelector(`.thumb-gallery`);
const containerFilms = document.querySelector(`.films__gallery`)

movieApiService.getPopularMovies()
    .then(({ results }) => renderGalleryFilms(results))
    .catch((error => console.log(error)))



function renderGalleryFilms(movies, genres) {
    const markup = movies
        .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {

                return `<li class='gallery-items films__gallery-item id=${id}'>
        <a href="#" class="list-card__link">
            <!-- постер -->
            <div class="moviе-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"
                    data-id="id=${id}"/>
            </div>
            <div class=""movie-stats">
                <h2 class="movie-stats__title">${title.toLowerCase()}</h2>
                <div class="movie-stats__info">
                    <p class="movie-genre">
                        ${genre_ids} | ${release_date.split(`-`)[0]}
                    </p>
                    <p class="movie-vote">
                      ${vote_average}
                    </p>
                </div>
            </div>
        </a>
    </li>`
      })
    .join('');
    containerFilms.innerHTML = markup;
}

const handlePageChange = (currentPage) => {
    movieApiService.getPopularMovies(currentPage).then(({ results }) => renderGalleryFilms(results))
}

const moviePagination = new Pagination({
    total: 1000,
    onChange(value) {
        handlePageChange(value)
        spanPag.textContent = value
    }
})

nextPageBtn.addEventListener('click', () => {
    moviePagination.incrementPage()
})

prevPageBtn.addEventListener('click', () => {
    moviePagination.decrementPage()
})

startBtnPag.addEventListener('click', () => {
    moviePagination.startPage()
})

lastBtnPag.addEventListener('click', () => {
    moviePagination.lastPage()
})