import FetchFilmApi from "./api/fetch_movies"
import Notiflix, { Notify } from "notiflix";
import debounce from "lodash.debounce";
import { genres } from "./base/genres";

export const apiFetch = new FetchFilmApi();


const refs = {
    searchInput: document.querySelector(`.search-input`),
    btnInput: document.querySelector(`.search-button`),
    gallery: document.querySelector(`.films__gallery`)
}


refs.searchInput.addEventListener(`input`, debounce(onInputSearch, 500));
refs.btnInput.addEventListener(`click`, fetchResults);

console.log(refs.btnInput)

function onInputSearch(ev) {
    ev.preventDefault()
    apiFetch.searchQuery = ev.target.value;
    const searchValue = apiFetch.searchQuery.trim();
    console.log(searchValue)

    if(searchValue === ``) {
        Notify.info(`Please enter a search word.`)
    }
    if(!searchValue) {
        clearInput();
    }
    apiFetch.resetPage();
    fetchResults(); 
    
    //Підключити пагініцію //
}


function fetchResults() {
    return apiFetch.getMovieOnSearch()
    .then(({results, total_results}) => {
        if(total_results === ``) {
            Notify.failure(`Sorry, search result not succesfull.Enter the correct movie name`);
            return
        }
        console.log(results)
        renderGallery(results);

        
    })
    
}

function renderGallery(films) {
    const markup = films
    .map(({id, poster_path, title, genre_ids, release_date, vote_average}) => {
        return `<li class='gallery-items films__gallery-item id=${id}'>
        <a href="https://image.tmdb.org/t/p/original${poster_path} class="list-card__link">
            <!-- постер -->
            <div class="moviе-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"/>
            </div>
            <div class=""movie-stats" id=${id}>
                <h2 class="movie-stats__title">${title.toLowerCase()}</h2>
                <div class="movie-stats__info">
                    <p class="movie-genre">
                        ${genre_ids} |  ${release_date.slice(0, 4)}
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
    refs.gallery.innerHTML = markup;
   
}


function clearSearch() {
    refs.gallery.innerHTML = ``;
}
function clearInput() {
    refs.searchInput.innerHTML = ``;
}

