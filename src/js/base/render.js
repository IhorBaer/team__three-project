import { refs } from './refs';
import itemsTemplate from '../../template/movie-item.hbs';

export function renderListCard(data) {
    refs.containerFilms.innerHTML = '';
    const markup = itemsTemplate({...data });
    refs.containerFilms.insertAdjacentHTML('afterbegin', markup);
}