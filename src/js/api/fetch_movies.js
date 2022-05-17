import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio'
const API_KEY = '9247604179ba4f8029cfb34035e24946';
const BASE_URL = 'https://api.themoviedb.org/3/';
import Loading from '../base/loading';

export default class FetchApi {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
        this.id = 0;
    }

    //основна сторінка//
    async getPopularMovies(page) {
            Loading.dots();
            try {
                Loading.remove();
                const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`;
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                Loading.remove();
                Notify.failure('Oops, an error');
            }
        }
        //популярні фільми дня//
    async getTrendingDayMovie(page) {
            Loading.dots();
            try {
                Loading.remove();
                const urlTrending = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`;
                const trendingMovie = await axios.get(urlTrending);
                return trendingMovie.data;
            } catch (error) { Loading.remove(); }
        }
        //популярні фільми тижня//
    async getTrendingWeekMovie(page) {
        Loading.dots();
        try {

            Loading.remove();
            const urlTrending = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`;
            const trendingMovie = await axios.get(urlTrending);
            return trendingMovie.data;
        } catch (error) {
            Loading.remove();
        }
    }

    //пошук фільма по слову//
    async getMovieOnSearch(query, page) {
        Loading.dots();
        const movie = await axios.get(
            `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&include_adult=false`, {
                params: {
                    query: query.length ? query : null,
                    page,
                },
            },
            Loading.remove()
        );
        return movie.data;
    }

    async getMovieInFoBuyId() {
        Loading.dots();
        try {
            Loading.remove();
            const url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=${API_KEY}&language=en-US`;
            const response = await axios.get(url);
            // console.log(response.data);        
            return response.data;
        } catch (error) {
            Loading.remove();
            // Notify.info(`Please enter a search word.`)
        }
    }

    incrementPage() {
        this.page += 1;
    }
    decrementPage() {
        this.page -= 1;
    }
    resetPage() {
        this.page = 1;
    }
    get movieId() {
        return this.id;
    }

    set movieId(newId) {
        // console.log(newId);
        this.id = newId;
    }
}

// const a = fetch('https://api.themoviedb.org/3/movie/{movie_id}?api_key=${API_KEY}');
// console.log(a);