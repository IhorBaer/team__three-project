const jsClick = document.querySelector('.navigation__list');
const refGallery = document.querySelector('.movie-gallery');
const btn = document.querySelector('.buttons');
const form = document.querySelector('.search-wrapper');


const refHeader = document.querySelector('.header__background'); 

const refHome = document.getElementById('home');
// console.log(refHome);

const refLibrary= document.getElementById('library');
// console.log(refLibrary);

refLibrary.addEventListener('click', event => {
 event.preventDefault();
 const currentElement = event.target;

 const activeElement = document.querySelector('.current-link');

 currentElement.classList.add('current-link');

 if (activeElement) {
   activeElement.classList.remove('current-link');
   form.classList.add('visually-hidden');
     btn.classList.remove('visually-hidden');
     refHeader.classList.remove('header__background');
     refHeader.classList.add('header__background-library');
 }


});

refHome.addEventListener('click', event => {
 event.preventDefault();
 const currentElement = event.target;

 const activeElement = document.querySelector('.current-link');

 currentElement.classList.add('current-link');

 if (activeElement) {
   activeElement.classList.remove('current-link');
   form.classList.remove('visually-hidden');
     btn.classList.add('visually-hidden');
     refHeader.classList.add('header__background');
     refHeader.classList.remove('header__background-library');

 }
})
