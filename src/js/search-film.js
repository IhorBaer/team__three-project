import FetchFilmApi from "./api/fetch_movies"
import { refs } from './base/refs'
import { Notify } from "notiflix";
import debounce from "lodash.debounce";
import { genres } from "./base/genres";
import { dataFormat } from "./base/data-format";
import { renderListCard } from "./base/render";
import { paginationSettings } from "./pagination";

export const apiFetch = new FetchFilmApi();

refs.searchInput.addEventListener('submit', onInputSearch);
// refs.logoHome.addEventListener(`click`, onHomeButton)

async function onInputSearch(ev) {
    ev.preventDefault()
    apiFetch.searchQuery = ev.target.elements.query.value;
    const searchValue = apiFetch.searchQuery.trim();

    if (searchValue === '') {
        Notify.failure(`Please enter a search word.`)
        return
    }

    try {
        const { results, total_results: totalItems } = await apiFetch.getMovieOnSearch(
            searchValue,
            paginationSettings.startPage
        )

        if (totalItems === 0) {
            Notify.warning('Nothing found. Please try again')
            return;
        }

        paginationSettings.pagination.reset(totalItems);
        paginationSettings.searchValue = searchValue;
        paginationSettings.searchType = 'input';
        const formattedData = dataFormat(results, genres);
        renderListCard(formattedData);
        console.log(formattedData);
    } catch (error) {
        console.log(error);
    }
}



// function fetchResults() {
//     return apiFetch.getMovieOnSearch()
//         .then(({ results, total_results }) => {
//             if (total_results === 0) {
//                 // Notify.failure(`Sorry, search result not succesfull.Enter the correct movie name`);
//                 onError()
//                 clearInput();
//                 return
//             } else {
//                 errorIsHidden()
//                 renderGallery(results);
//                 clearInput();
//             }
//         })

// }

// function renderGallery(films) {
//     const markup = films
//         .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
//                 const genresId = getGenresName(genre_ids);
//                 return `<li class="gallery-items films__gallery-item id=${id}">
//         <a href="#!" class="list-card__link">

//             <div class="movie-item__img-container">

//                 <img src="https://image.tmdb.org/t/p/w500${poster_path}"
//                     alt="${title}"
//                     class="moviе-item__img"
//                     data-id="id=${id}"/>
//             </div>
//             <div class="movie-stats">
//                 <h2 class="moviе-stats__title">${title}</h2>
//                 <div class="moviе-stats__info">
//                     <p class="moviе-genre">
//                         ${genresId} | ${release_date.split(`-`)[0]}
//                     </p>
//                     <p class="moviе-vote">
//                       ${vote_average}
//                     </p>
//                 </div>
//             </div>
//         </a>
//     </li>`
//     })
//     .join('');
//     refs.gallery_films.innerHTML = markup;  
// }
// //Генерування жанрів//
// function getGenresName(genre) {
//     let genresNames = genre.map(backId =>
//       genres.find(({ id }) => id === backId),
//     );
//     genresNames = [...genresNames.map(({ name }) => name)];
//     if(genresNames.length > 2) {
//       return [...genresNames.slice(0, 2), `Other`]
//     }
//     return genresNames
//   }

//Повернення на головну сторінку
// function onHomeButton(ev) {
//     ev.preventDefault();
//     apiFetch.resetPage();
//     clearInput();
// }

// function clearInput() {
//     refs.searchInput.elements.query.value = '';
// }

// function onError() {
//     refs.warning.classList.remove('is-hidden');
// }

// function errorIsHidden() {
//     const checkClass = refs.warning.classList.contains('is-hidden')
//     if (checkClass === false) {
//         refs.warning.classList.add('is-hidden')
//     }
// }