import { refs } from './refs';
import itemsTemplate from '../../template/movie-item.hbs';

export function renderListCard(data) {
    refs.gallery_films.innerHTML = '';
    const markup = itemsTemplate({...data });
    refs.gallery_films.innerHTML = (markup);
}

