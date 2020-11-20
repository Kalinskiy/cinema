import axios from "axios";


const apiKey = '412cf2289b127d76295337d285fac14c'
const instance = axios.create({baseURL: `https://api.themoviedb.org/3/`,});

export type MovieResponseType = {
    adult: boolean
    backdrop_path: string
    genre_ids: Array<string>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: number
    vote_average: number
    vote_count: number
}
export type RequestMovieType = {
    page: number
    results: Array<MovieResponseType>
    total_pages: number
    total_results: number
}

export const moviesAPI = {
    getPopularMovies() {
        return instance.get<RequestMovieType>(`/movie/popular?api_key=${apiKey}`).then(res => res.data)
    },
    getTopMovies(page = 1) {
        return instance.get<RequestMovieType>(`/movie/top_rated?api_key=${apiKey}&page=${page}`).then(res => res.data)
    },
    getUpcomingMovies() {
        return instance.get<RequestMovieType>(`/movie/upcoming?api_key=${apiKey}`).then(res => res.data)
    },
    searchMovie(query = ' ', page = 1) {
        return instance.get(`/search/movie?api_key=${apiKey}&query=${query}&page=${page}`).then(res => res.data)
    },

}

