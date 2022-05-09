import FetchFilmApi from "./api/fetch_movies"
import Notiflix, { Notify } from "notiflix";
import debounce from "lodash.debounce"

export const apiFetch = new FetchFilmApi();


const refs = {
    searchInput: document.querySelector(`.search-input`),
    btnInput: document.querySelector(`.search-button`),
    gallery: document.querySelector(`.film__gallery`),
    containerGallery: document.querySelector(`.container`)
}


refs.searchInput.addEventListener(`input`, debounce(onInputSearch, 500));
refs.btnInput.addEventListener(`click`, fetchResults);

function onInputSearch(ev) {
    ev.preventDefault()
    apiFetch.searchQuery = ev.target.value;
    const searchValue = apiFetch.searchQuery.trim();
    console.log(searchValue)

    if(searchValue === 0) {
        Notify.info(`Please enter a search word.`)
    }
    apiFetch.resetPage();
    fetchResults(); 
    clearSearch();
    
}


function fetchResults() {
    return apiFetch.getMovieOnSearch()
    .then(({results, total_results}) => {
        if(total_results === 0) {
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
    refs.containerGallery.insertAdjacentHTML(`beforeend`, markup)
   
}


function clearSearch() {
    refs.containerGallery.innerHTML = ``;
}

