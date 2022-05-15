import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getMultiFactorResolver,
    onAuthStateChanged
} from 'firebase/auth'
import Notiflix from 'notiflix';
// import { movieApiService } from './render_movies';
// export { films };
import { getPopularMoviesData } from './render_popular_movies';
import { renderListCard } from './base/render';
import { refs } from './base/refs';
// import { filmApi } from './modal';
// import { makeFilmModalMarkup } from './modal';
import FetchApi from './api/fetch_movies'
// import itemsTemplate from '../../template/movie-item.hbs';
// import { async } from '@firebase/util';

export let userEmail = ""
const dataData = new FetchApi()
const modal = document.querySelector('.auth-modal')
const openModal = document.querySelector('.open_auth-js')
// console.log(openModal)

const firebaseConfig = {
    apiKey: "AIzaSyCgHWVD37iS9SyzyjybiROGSJgrZBuPF74",
    authDomain: "fir-g3-a635e.firebaseapp.com",
    projectId: "fir-g3-a635e",
    storageBucket: "fir-g3-a635e.appspot.com",
    messagingSenderId: "387248887615",
    appId: "1:387248887615:web:53bf0176f3707f756ae58a"
};
initializeApp(firebaseConfig)

const db = getFirestore()
const colRef = collection(db, 'films')
const auth = getAuth();
// console.log(auth.currentUser)

// дані для відмальовування бібліотеки перемінна films 
// import { films } from "module-name";
let films = [];
const refLibrary = document.getElementById('library')
const refHome = document.getElementById('home')
const refWatchedBtn = document.getElementById('watched')
const refQueueBtn = document.getElementById('queue')
// const addQueueRef = document.getElementById('add-queue-js')
// const addWatchedRef = document.getElementById('add-watched-js')


refWatchedBtn.addEventListener('click', (e) => {
    refWatchedBtn.setAttribute('disabled', true)
    refQueueBtn.removeAttribute('disabled', true)
    refQueueBtn.classList.remove('active-btn')
    refWatchedBtn.classList.add('active-btn')

    // refQueueBtn.textContent = "ff"
    //     films = []
    //    getDocs(colRef)
    //      .then((snapshot) => {
    //          console.log(snapshot.docs)
    //          snapshot.docs.forEach((doc) => {
    //             films.push({ ...doc.data(), id: doc.id })
    //       })
    //              const dataLibrary = films.filter(film => film.status == 'watched' && film.user == userEmail)

    //        renderListCard(dataLibrary)
    //     })
    //     .catch(err => {
    //         console.log(err.message)

    //     })
    //  })

    // refQueueBtn.addEventListener('click', (e) => {
    //      refWatchedBtn.removeAttribute('disabled', true)
    //     refQueueBtn.setAttribute('disabled', true)
    //      films = []
    //    getDocs(colRef)
    //      .then((snapshot) => {
    //          console.log(snapshot.docs)
    //          snapshot.docs.forEach((doc) => {
    //             films.push({ ...doc.data(), id: doc.id })
    //       })
    //              const dataLibrary = films.filter(film => film.status == 'queue' && film.user == userEmail)

    //        renderListCard(dataLibrary)
    //     })
    //     .catch(err => {
    //         console.log(err.message)

    //     })
    //  })
    // refHome.addEventListener('click',

    //     (e) => {
    //         refLibrary.removeAttribute('disabled', true)
    //         getPopularMoviesData()
    //     })

    // refLibrary.addEventListener('click', (e) => {
    //     refLibrary.setAttribute('disabled', true)
    //     if (userEmail == false) {
    //         Notiflix.Notify.failure('LOG IN PLZ')
    //                 //    modal.classList.remove('visually-hidden');
    //     }
    //     films = []
    //    getDocs(colRef)
    //      .then((snapshot) => {
    //          console.log(snapshot.docs)
    //          snapshot.docs.forEach((doc) => {
    //             films.push({ ...doc.data(), id: doc.id })
    //       })
    //              const dataLibrary = films.filter(film => film.status == 'queue' && film.user == userEmail)

    //        renderListCard(dataLibrary)
    //     })
    //     .catch(err => {
    //         console.log(err.message)

    //     })
    // })

    //     document.getElementById("login").addEventListener('click', function () {
    //         const email = document.getElementById('email').value
    //         const password = document.getElementById('pass').value



    //         signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in
    //              userEmail = userCredential.user.email;
    //             // console.log(userEmail)
    //             // ...
    //             Notiflix.Notify.info(`You are logged in ${email}`);
    //             // modal.classList.add('visually-hidden');

    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             window.alert(errorCode + errorMessage);
    //         });


    //     })

    //     document.getElementById("register").addEventListener('click', function(){
    //     const email = document.getElementById('email').value
    //     const password = document.getElementById('pass').value

    //     console.log(email)
    //     console.log(password)

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //         // Signed in
    //             const user = userCredential.user;
    //             console.log(user)
    //         // ...
    //             window.alert('Created')
    //             // modal.classList.add('visually-hidden');
    //         })
    //         .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ..
    //         window.alert(errorCode + errorMessage)
    //         });

    //     })

    // // export function renderListCardLibrary(data) {

    // //     const markup = itemsTemplate({...data });
    // //     refs.gallery_films.innerHTML(markup);
    // // }


    films = []
    getDocs(colRef)
        .then((snapshot) => {
            console.log(snapshot.docs)
            snapshot.docs.forEach((doc) => {
                films.push({ ...doc.data(), id: doc._document.data.value.mapValue.fields.id.integerValue })
            })
            const dataLibrary = films.filter(film => film.status == 'watched' && film.user == userEmail)

            renderListCard(dataLibrary)
        })
        .catch(err => {
            console.log(err.message)

        })
})

refQueueBtn.addEventListener('click', openQueue);
export function openQueue(e) {
    refWatchedBtn.removeAttribute('disabled', true)
    refQueueBtn.setAttribute('disabled', true)
    refWatchedBtn.classList.remove('active-btn')
    refQueueBtn.classList.add('active-btn')

    films = []
    getDocs(colRef)
        .then((snapshot) => {
            console.log(snapshot.docs)
            snapshot.docs.forEach((doc) => {
                films.push({
                    ...doc.data(),
                    id: doc._document.data.value.mapValue.fields.id.integerValue,
                });
            })
            const dataLibrary = films.filter(film => film.status == 'queue' && film.user == userEmail)

            renderListCard(dataLibrary)
        })
        .catch(err => {
            console.log(err.message)

        })
}
refHome.addEventListener('click',

    (e) => {
        refLibrary.removeAttribute('disabled', true)
        getPopularMoviesData()
    })

refLibrary.addEventListener('click', (e) => {
    refLibrary.setAttribute('disabled', true)
    refs.idPagination.classList.add('visually-hidden')
    if (userEmail == false) {
        Notiflix.Notify.failure('LOG IN PLZ')
        //    modal.classList.remove('visually-hidden');
    }
    // films = []
    // getDocs(colRef)
    //     .then((snapshot) => {
    //         console.log(snapshot.docs)
    //         snapshot.docs.forEach((doc) => {
    //             films.push({
    //                 ...doc.data(),
    //                 id: doc._document.data.value.mapValue.fields.id.integerValue,
    //             });
    //         })
    //         const dataLibrary = films.filter(film => film.status == 'queue' && film.user == userEmail)

    //         renderListCard(dataLibrary)
    //     })
    //     .catch(err => {
    //         console.log(err.message)

    //     })
})

document.getElementById("login").addEventListener('click', function () {
    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value



    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            userEmail = userCredential.user.email;
            // console.log(userEmail)
            // ...
            Notiflix.Notify.info(`You are logged in ${email}`);
            // modal.classList.add('visually-hidden');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            window.alert(errorCode + errorMessage);
        });


})

document.getElementById("register").addEventListener('click', function () {
    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value

    console.log(email)
    console.log(password)

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
            window.alert('Created')
            // modal.classList.add('visually-hidden');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            window.alert(errorCode + errorMessage)
        });

})

// export function renderListCardLibrary(data) {

//     const markup = itemsTemplate({...data });
//     refs.gallery_films.innerHTML(markup);
// }