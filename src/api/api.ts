import axios from "axios";


const apiKey = '412cf2289b127d76295337d285fac14c'
const instance = axios.create({baseURL: `https://api.themoviedb.org/3/`,});

export type MovieResponseType = {
    budget: string;
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
export type MovieImagesArrayResponseType = {
    aspect_ratio: number
    file_path: string
    height: number
    iso_639_1: null
    vote_average: number
    vote_count: number
    width: number

}
export type MovieImagesResponseType = {
    backdrops: Array<MovieImagesArrayResponseType>
    id: null
    posters: Array<MovieImagesArrayResponseType>
}

export const moviesAPI = {
    getTopMovies(page = 1) {
        return instance.get<RequestMovieType>(`/movie/top_rated?api_key=${apiKey}&page=${page}`).then(res => res.data)

    },
      getMovieImages(movieId:number) {
        return instance.get<MovieImagesResponseType>(`/movie/${movieId}/images?api_key=${apiKey}`).then(res => res.data)
    },
     getSimilarMovies(movieId:number) {

        return instance.get<RequestMovieType>(`/movie/${movieId}/similar?api_key=${apiKey}`).then(res => res.data)
    },

    searchMovie(query = ' ', page = 1) {
        return instance.get(`/search/movie?api_key=${apiKey}&query=${query}&page=${page}`).then(res => res.data)
    },

}

