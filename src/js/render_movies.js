import Notiflix, { Notify } from "notiflix";
import MovieApiService from "./api/fetch_movies";

export const movieApiService = new MovieApiService()

// const movies = movieApiService.getPopularMovies().then(e => console.log(e));

const gallery = document.querySelector(`.film__gallery`);




// function renderGallery() {
//     movieApiService.getPopularMovies()
// .then(({results, total_pages, total_results}) => {
// console.log(results)
// })
// .then(markup)
//}


// function renderGallery(films) {
//     films.map(film => {
//         const {id, poster_path, title, release_date, genre_ids}
//      = film;
//         return
//         `<li class="films-gallery-item" data-id="${id}">
//           <img
//             class="films-gallery-item-image"
//             src="https://image.tmdb.org/t/p/w342${poster_path}"
//             alt="«${title}» film poster"
//           >
//           <p class="films-gallery-item-title">${title}</p>
//           <p class="films-gallery-item-info">${slicedMapedGenres.join(', ')} | ${
//               release_date.split('-')[0]
//             }</p>
//         </li>
//         `
// })
//         gallery.insertAdjacentHTML(`beforeend`, markup)
//     }

    


