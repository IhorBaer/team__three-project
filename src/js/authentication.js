import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'


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

getDocs(colRef)
    .then((snapshot) => {
        let films = []
        snapshot.docs.forEach((doc) => {
            films.push({...doc.data(), id: doc.id})
        })
        console.log(films)
    })
    .catch(err => {
    console.log(err.message)
    })


document.getElementById('auth-add-js').addEventListener('click', (title, year,
    jenre, rating) => {

               title = document.querySelector('.moviе-stats__title')
               year = document.querySelector('.moviе-year')
               jenre = document.querySelector('.moviе-genre__item')
               rating = document.querySelector('.moviе-vote')
    
    addDoc(colRef, {
        title: title.textContent,
        year: year.textContent,
        jenre: jenre.textContent,
        rating: rating.textContent,
    })
        .then(() => {
            console.log('Добавлен фильм')
   
    })
})

const deleteFilm = document.getElementById('auth-delete-js')
deleteFilm.addEventListener('click', () => {
    const filmId = document.querySelector('.moviе-stats__title')
    const docRef = doc(db, 'films','8wfZd0SKKilPxr1r9pYa')
 

    deleteDoc(docRef)
        .then(() => {
        console.log('Delete')
    })
    
})



        // document.getElementById('auth-add-js').addEventListener('click', function writeUserData(userId, movieTitle, year, genre, rating){
        //        movieTitle = document.querySelector('.moviе-stats__title')
        //        year = document.querySelector('.moviе-year')
        //        genre = document.querySelector('.moviе-genre__item')
        //        rating = document.querySelector('.moviе-vote')
           
        //             set(ref(db, 'users/ + userId'), {
        //     nameMovie: movieTitle.textContent,
        //     year: year.textContent,
        //     genre: genre.textContent,
        //     rating: rating.textContent,
        //   });

        // })   