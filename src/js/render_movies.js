import MovieApiService from "./api/fetch_movies";

export const movieApiService = new MovieApiService()


const containerGallery = document.querySelector(`.thumb-gallery`);
const containerFilms = document.querySelector(`.films__gallery`)

movieApiService.getPopularMovies()
.then(({results}) => renderGalleryFilms(results))
.catch((error => console.log(error)))


function renderGalleryFilms(movies) {
    const markup = movies
      .map(({ id, backdrop_path, poster_path, title, genre_ids, release_date, vote_average, overview }) => {
        return `<li class='gallery-items films__gallery-list id=${id}'>
        <a href="https://image.tmdb.org/t/p/original${poster_path}" class="list-card__link">
            <!-- постер -->
            <div class='movie-item__img'>
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}">
            </div>

            <!-- обгортка інформації під постером -->
            <div class='movie-stats'>
                <h2 class='movie-stats__title'>${title}</h2>
                <div class='movie-stats__info'>
                    <!-- список жанрів -->
                    <p class='movie-genre'>
                        ${genre_ids}
                    </p>
                    <!-- дата виходу та рейтинг -->
                    <p class='movie-year'>${release_date}
                    </p>
                    <!-- рейтинг -->
                    <p class='movie-vote'>
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

