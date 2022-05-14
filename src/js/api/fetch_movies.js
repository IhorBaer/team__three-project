import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio'
const API_KEY = '9247604179ba4f8029cfb34035e24946';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FetchApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.id = 0;
  }

  //основна сторінка//
  async getPopularMovies(page) {
    try {
      const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error');
    }
  }
  //популярні фільми дня//
  async getTrendingDayMovie(page) {
    try {
      const urlTrending = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`;
      const trendingMovie = await axios.get(urlTrending);
      return trendingMovie.data;
    } catch (error) {}
  }
  //популярні фільми тижня//
  async getTrendingWeekMovie(page) {
    try {
      const urlTrending = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`;
      const trendingMovie = await axios.get(urlTrending);
      return trendingMovie.data;
    } catch (error) {}
  }

  //пошук фільма по слову//
  async getMovieOnSearch(page) {
    try {
      const urlSearch = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}&language=en-US&page=${page}&include_adult=false`;
      const movie = await axios.get(urlSearch);
      return movie.data;
    } catch (error) {
      // Notify.info(`Please enter a search word.`)
    }
  }

  async getMovieInFoBuyId(id) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=${API_KEY}&language=en-US`;
      const response = await axios.get(url);
    //   console.log(response.data);
      return response.data;
    } catch (error) {
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
