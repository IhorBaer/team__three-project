import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
const API_KEY = '9247604179ba4f8029cfb34035e24946'
const BASE_URL = 'https://api.themoviedb.org/3/'

export default class FetchApi {
    constructor() {
        this.page = 1
        this.searchQuary = ''
    }

    async getPopularMovies() {
        try {
            const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${this.page}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            Notify.failure('Oops, an error')
        }

    }

    incrementPage() {
        this.page += 1
    }

    decrementPage() {
        this.page -= 1
    }

    resetPage() {
        this.page = 1;
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}