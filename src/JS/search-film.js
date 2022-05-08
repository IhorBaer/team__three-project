import FetchFilmApi from "./api/fetch_movies"
import Notiflix from "notiflix";
import debounce from "lodash.debounce"

export const apiFetch = new FetchFilmApi();


const refs = {
    searchInput: document.querySelector(`.search-input`),
    btnInput: document.querySelector(`.search-button`)
}
console.log(refs.searchInput);
console.log(refs.btnInput);


apiFetch.getMovieOnSearch()
.then(response => console.log(response));

refs.searchInput.addEventListener(`input`, debounce(onInputSearch, 500))




function onInputSearch(ev) {
    ev.preventDefault()
    apiFetch.searchQuery = ev.target.value
     
}


