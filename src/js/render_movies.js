import MovieApiService from "./api/fetch_movies";

export const movieApiService = new MovieApiService()

const movies = movieApiService.getPopularMovies().then(e => console.log(e))