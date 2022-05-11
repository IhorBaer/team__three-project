import MovieApiService from "./api/fetch_movies";
import { genres } from "./base/genres";
import { apiFetch } from "./search-film";

export const movieApiService = new MovieApiService()

const containerGallery = document.querySelector(`.thumb-gallery`);
const containerFilms = document.querySelector(`.films__gallery`);

movieApiService.getPopularMovies()
.then(({results}) => renderGalleryFilms(results))
.catch((error => console.log(error)));



function renderGalleryFilms(movies) {
    const markup = movies
      .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
          const genresId = getGenresName(genre_ids);
        return `<li class="gallery-items films__gallery-item id=${id}">
        <a href="#!" class="list-card__link">
            
            <div class="moviе-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"
                    data-id="id=${id}"/>
            </div>
            <div class="moviе-stats">
                <h2 class="moviе-stats__title">${title}</h2>
                <div class="moviе-stats__info">
                    <p class="moviе-genre">
                        ${genresId} | ${release_date.split(`-`)[0]}
                    </p>
                    <p class="moviе-vote">
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


  //Генерування жанрів//
  function getGenresName(genre) {
    let genresNames = genre.map(backId =>
      genres.find(({ id }) => id === backId),
    );
    genresNames = [...genresNames.map(({ name }) => name)];
    if(genresNames.length > 2) {
      return [...genresNames.slice(0, 2), `Other`]
    }
    return genresNames
  }
   





  

