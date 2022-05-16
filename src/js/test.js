// import { openQueue } from './authentication';

const jsClick = document.querySelector('.navigation__list');
const refGallery = document.querySelector('.movie-gallery');
const btn = document.querySelector('.buttons');
const form = document.querySelector('.search-wrapper');


const refHeader = document.querySelector('.header__background');

const refHome = document.getElementById('home');
// console.log(refHome);

const refLibrary = document.getElementById('library');
// console.log(refLibrary);

///////////////////////////////////////////////////////////
refHome.setAttribute('disabled', true);
///////////////////////////////////////////////////////////

refLibrary.addEventListener('click', event => {
  event.preventDefault();

  refHome.removeAttribute('disabled', true)
  refLibrary.setAttribute('disabled', true)

  const currentElement = event.target;

  const activeElement = document.querySelector('.current-link');

  currentElement.classList.add('current-link');

  if (activeElement) {
    activeElement.classList.remove('current-link');
    form.classList.add('display-none');
    // btn.classList.remove('display-none');
    refHeader.classList.remove('header__background');
    refHeader.classList.add('header__background-library');
  }

  // openQueue()
});

refHome.addEventListener('click', event => {
  event.preventDefault();

  refLibrary.removeAttribute('disabled', true)
  refHome.setAttribute('disabled', true)
  const currentElement = event.target;

  const activeElement = document.querySelector('.current-link');

  currentElement.classList.add('current-link');

  if (activeElement) {
    activeElement.classList.remove('current-link');
    form.classList.remove('display-none');
    btn.classList.add('display-none');
    refHeader.classList.add('header__background');
    refHeader.classList.remove('header__background-library');

  }
})
