
import MovieApiService from "./api/fetch_movies";

export const movieApiService = new MovieApiService();

const containerGallery = document.querySelector(`.thumb-gallery`);
const containerFilms = document.querySelector(`.films__gallery`)

movieApiService.getPopularMovies()
.then(({results}) => renderGalleryFilms(results))
.catch((error => console.log(error)))




function renderGalleryFilms(movies) {
    const markup = movies
      .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
        return `<div class="gallery-card">
        <img 
        src="https://image.tmdb.org/t/p/original${poster_path}" 
        alt="${title}" class="gallery-image" data-id=${id}>
        <h2 class="card-title" data-id="${id}">${title}</h2>
        <div class="card-content">
            <div class="card-movie_genres">
                ${genre_ids}
            </div>
            <span class="card-movie_date">${release_date}</span>
            <span class="card-movie_rating">${vote_average}</span>
        </div>
    </div>`
    })
    .join('');
    containerFilms.innerHTML = markup;
  }
  
