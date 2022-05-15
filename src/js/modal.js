import FetchApi from './api/fetch_movies';
// import { FetchApi } from './api/fetch_movies';
import { apiFetch } from './search-film';
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import Notiflix from 'notiflix';
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getMultiFactorResolver, onAuthStateChanged
} from 'firebase/auth'
import { userEmail } from './authentication';
import { renderListCard } from './base/render';
// console.log(renderListCard());
// console.log(userEmail)

// const firebaseConfig = {
//   apiKey: "AIzaSyCgHWVD37iS9SyzyjybiROGSJgrZBuPF74",
//   authDomain: "fir-g3-a635e.firebaseapp.com",
//   projectId: "fir-g3-a635e",
//   storageBucket: "fir-g3-a635e.appspot.com",
//   messagingSenderId: "387248887615",
//   appId: "1:387248887615:web:53bf0176f3707f756ae58a"
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBzIGGSufXWhiy2amlL_ka5f0X-VeLnSgQ',
  authDomain: 'auth3-fad82.firebaseapp.com',
  databaseURL: 'https://auth3-fad82-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'auth3-fad82',
  storageBucket: 'auth3-fad82.appspot.com',
  messagingSenderId: '325041567607',
  appId: '1:325041567607:web:103f827eafa81fdf3d5372',
};

initializeApp(firebaseConfig)

const db = getFirestore()
const colRef = collection(db, 'films')
const auth = getAuth();

const refs = {
  openModalItem: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal'),
};

export const filmApi = new FetchApi();

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
  // console.log(film.id);
  console.log(film)
  refs.modal.insertAdjacentHTML('afterbegin', makeFilmModalMarkup(film));

  const btnW = document.querySelector('.btnW');

  btnW.addEventListener('click', () => {
    btnW.setAttribute('disabled', true);

    btnW.classList.remove('modal__button');
    btnW.classList.add('modal__button-disabled');
    btnW.textContent = 'in the watched';
    // textContent = 'DELETE '


    addDoc(colRef, {
      genre_ids: film.genres,
      poster_path: film.poster_path,
      id: film.id,
      title: film.original_title,
      release_date: film.release_date,
      vote_average: film.vote_average,
      status: 'watched',
      user: userEmail,

    })
      .then(() => {
        Notiflix.Notify.info('ADD FILM TO WATCHED')

      }).catch(err => {
        console.log(err.message);
      });
  })

  const btnQ = document.querySelector('.btnQ');
  btnQ.addEventListener('click', () => {
    btnQ.setAttribute('disabled', true);

    btnQ.classList.remove('modal__button');
    btnQ.classList.add('modal__button-disabled');
    btnQ.textContent = 'in the queue';

    // if(film.id == db.films){return}  
    console.log(film.id)
    addDoc(colRef, {
      genre_ids: film.genres,
      poster_path: film.poster_path,
      id: film.id,
      title: film.original_title,
      release_date: film.release_date,
      vote_average: film.vote_average,
      status: 'queue',
      user: userEmail,

    })
      .then(() => {
        Notiflix.Notify.info('ADD FILM TO QUEUE')

      }).catch(err => {
        console.log(err.message);
      });
  })

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

export function makeFilmModalMarkup({
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
                    <button type="submit" class="modal__button btnW" data-id=${id}>ADD TO WATCHED</button>
                    <button type="submit" class="modal__button btnQ" data-id=${id}>ADD TO QUEUE</button>
                </div>
            </div>`;
}
