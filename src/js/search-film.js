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
refs.logoHome.addEventListener(`click`, onHomeButton)

async function onInputSearch(ev) {
    ev.preventDefault()
    apiFetch.searchQuery = ev.target.elements.query.value;
    const searchValue = apiFetch.searchQuery.trim();

    if (searchValue === '') {
        onError()
        clearInput()
        return
    }
    errorIsHidden()

    try {
        const { results, total_results: totalItems } = await apiFetch.getMovieOnSearch(
            searchValue,
            paginationSettings.startPage
        )

        if (totalItems === 0) {
            onError()
            clearInput()
            return
        } else {
            errorIsHidden()
        }

        paginationSettings.pagination.reset(totalItems);
        paginationSettings.pagination.searchValue = searchValue;
        paginationSettings.searchType = 'input';
        const formattedData = dataFormat(results, genres);
        renderListCard(formattedData);

    } catch (error) {
        onError()
    }
}

// Повернення на головну сторінку
function onHomeButton(ev) {
    ev.preventDefault();
    apiFetch.resetPage();
    clearInput();
}

function clearInput() {
    refs.searchInput.elements.query.value = '';
}

function onError() {
    refs.warning.classList.remove('is-hidden');
}

function errorIsHidden() {
    const checkClass = refs.warning.classList.contains('is-hidden')
    if (checkClass === false) {
        refs.warning.classList.add('is-hidden')
    }
}