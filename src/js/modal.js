import FetchApi from './api/fetch_movies';
// import { FetchApi } from './api/fetch_movies';
import { apiFetch } from './search-film';

const refs = {
  openModalItem: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal'),
};

const filmApi = new FetchApi();

refs.openModalItem.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

async function onOpenModal(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('visually-hidden');
  document.body.classList.add('modal-open');

  filmApi.movieId = event.target.dataset.id;
  const film = await filmApi.getMovieInFoBuyId();
  console.log(film);
  refs.modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.add('visually-hidden');
  document.body.classList.remove('modal-open');
  const filmImg = document.querySelector('.modal__img');
  const filmInfo = document.querySelector('.modal__info-container');
  filmImg.remove();
  filmInfo.remove();
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function makeFilmModalMarkup({
  poster_path,
  original_title,
  title,
  name,
  vote_average,
  vote_count,
  genres,
  overview,
  popularity,
  id,
}) {
  const filmGenres = genres.map(({ name }) => name).join(', ');
  return `<div class="modal__container">
            <img src=https://image.tmdb.org/t/p/original${poster_path} alt=${original_title} alt="Постер фільму" class="modal__img">

            <div class="modal__info-container">
                <h2 class="modal__title-film">${title}</h2>
                <table class="modal__info">
                    <tr>
                        <td class="modal__info-category">Vote / Votes</td>
                        <td class="modal__info-value"><span class="modal__vote">${vote_average}</span><span
                                class="modal__slash">/</span><span class="modal__votes">${vote_count}</span></td>
                    </tr>
                    <tr>
                        <td class="modal__info-category">Popularity</td>
                        <td class="modal__info-value">${popularity}</td>
                    </tr>
                    <tr>
                        <td class="modal__info-category">Original Title</td>
                        <td class="modal__info-value">${original_title}</td>
                    </tr>
                    <tr>
                        <td class="modal__info-category">Genre</td>
                        <td class="modal__info-value">${filmGenres}</td>
                    </tr>
                </table>
                <p class="modal__title-about">About</p>
                <p class="modal__article-about-movie">${overview}</p>
                <div class="modal__button-container">
                    <button type="submit" class="modal__button" data-id=${id}>ADD TO WATCHED</button>
                    <button type="submit" class="modal__button" data-id=${id}>ADD TO QUEUE</button>
                </div>
            </div>`;
}
