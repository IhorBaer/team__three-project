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
    refs.containerGallery.insertAdjacentHTML(`beforeend`, markup)
   
}


function clearSearch() {
    refs.containerGallery.innerHTML = ``;
}

