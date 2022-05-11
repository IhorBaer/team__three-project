import FetchFilmApi from "./api/fetch_movies"
import Notiflix, { Notify } from "notiflix";
import debounce from "lodash.debounce";
import { genres } from "./base/genres";

export const apiFetch = new FetchFilmApi();


const refs = {
    searchInput: document.querySelector(`.search-input`),
    btnInput: document.querySelector(`.search-button`),
    gallery: document.querySelector(`.films__gallery`),
    logoHome: document.querySelector(`#home`)
}


refs.searchInput.addEventListener(`input`, debounce(onInputSearch, 500));
refs.btnInput.addEventListener(`click`, onInputSearch);
refs.logoHome.addEventListener(`click`, onHomeButton)


function onInputSearch(ev) {
    ev.preventDefault()
    apiFetch.query = ev.target.value;
    const searchValue = apiFetch.query.trim();
    
    console.log(searchValue)

    if(searchValue === ``) {
        Notify.info(`Please enter a search word.`)
    }
    
    apiFetch.resetPage();
    fetchResults(); 
    
    //Підключити пагініцію //
}


function fetchResults() {
    return apiFetch.getMovieOnSearch()
    .then(({results, total_results}) => {
        if(total_results === 0) {
            Notify.failure(`Sorry, search result not succesfull.Enter the correct movie name`);
            return
        } else {
            renderGallery(results);
            clearInput();

        }
        console.log(results)
        
        
    })
    
}

function renderGallery(films) {
    const markup = films
    .map(({id, poster_path, title, genre_ids, release_date, vote_average}) => {
        const genresId = getGenresName(genre_ids);
        return `<li class="gallery-items films__gallery-item id=${id}">
        <a href="#!" class="list-card__link">
            
            <div class="movie-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"
                    data-id="id=${id}"/>
            </div>
            <div class="movie-stats">
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
    refs.gallery.innerHTML = markup;  
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
   


//Повернення на головну сторінку
function onHomeButton(ev) {
    ev.preventDefault();
    apiFetch.resetPage();
    clearInput();
    
}
   

function clearInput() {
    refs.searchInput.value = ``;
}



