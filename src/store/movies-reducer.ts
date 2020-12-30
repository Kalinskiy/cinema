import {GenreType, MovieImagesResponseType, MovieResponseType, moviesAPI} from "../api/api";
import {isInitialized} from "./app-reducer";
import {Dispatch} from "redux";


export type MovieInitialStateType = {
    language: string | null,
    overview: string | null,
    title: string | null,
    movieId: number | null,
    budget: number | null,
    movieGenre: GenreType[]
    runtime: number | null,
    rating: number | null
    releaseDate: string | null


    movies: MovieResponseType[],
    images: MovieImagesResponseType[],
    similarMovies: MovieResponseType[],
    genres: GenreType[],
    picture: string | null,

    search: [],
    searchName: string,
    searchError: boolean,
    totalPages: number | null,
    currentPage: number | null,

    filteredGenres: [],
    filteredMovies: [],

    isData: boolean


}

let initialState: MovieInitialStateType = {
    overview: null,
    title: null,
    language: null,
    movieId: null,
    budget: null,
    movieGenre: [],
    runtime: null,
    picture: null,
    rating: null,
    releaseDate: null,


    movies: [] as MovieResponseType[],
    images: [] as MovieImagesResponseType[],
    similarMovies: [] as MovieResponseType[],
    genres: [] as GenreType[],

    search: [],
    searchError: false,
    searchName: '',
    totalPages: null,
    currentPage: 1,

    filteredGenres: [],
    filteredMovies: [],

    isData: false

}
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const moviesReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'MOVIES/SET-MOVIES': {
            return {...state, movies: action.payload.movies}
        }
        case 'MOVIES/SET-MOVIE-IMAGES': {

            return {...state, images: action.payload.images}
        }
        case 'MOVIES/SET-SIMILAR-MOVIES': {

            return {...state, similarMovies: action.payload.similarMovies}
        }
        case 'MOVIES/GET-GENRES': {
            return {...state, genres: action.payload.genres}
        }
        case 'MOVIES/GET-MOVIES-VOTES': {
            return {...state, votes: action.payload.votes}
        }
        case 'MOVIES/IS-DATA': {

            return {...state, isData: action.payload.isData}
        }
        case 'MOVIES/GET-MOVIE-INFO': {
            return {
                ...state,
                movieGenre: action.payload.movieGenre,
                budget: action.payload.budget,
                overview: action.payload.overview,
                movieId: action.payload.movieId,
                title: action.payload.title,
                runtime: action.payload.runtime,
                picture: action.payload.picture,
                rating: action.payload.rating,
                language: action.payload.language,
                releaseDate: action.payload.releaseDate
            }
        }
        case 'SEARCH/SET-SEARCH-NAME': {
            return {...state, searchName: action.payload.searchName}
        }
        case 'SEARCH/SET-TOTAL-PAGE': {
            return {...state, totalPages: action.payload.pages}
        }
        case 'SEARCH/SET-CURRENT-PAGE': {
            return {...state, currentPage: action.payload.page}
        }
        case 'SEARCH/SET-PREVIOUS-PAGE': {
            return {...state, currentPage: action.payload.page - 1,}
        }
        case 'SEARCH/SET-NEXT-PAGE': {
            return {...state, currentPage: action.payload.page + 1,}
        }
        case 'SEARCH/SET-SEARCH-ERROR': {
            return {...state, searchError: action.payload.error}
        }
        case 'FILTER/SET-FILTERED-ID': {
            return {...state, filteredGenres: action.payload.filteredGenres}
        }
        case 'FILTER/SET-FILTERED-MOVIES': {
            return {...state, movies: action.payload.filteredMovies}
        }

        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions

export const getMovies = (movies: any) => ({type: 'MOVIES/SET-MOVIES', payload: {movies}} as const);
export const setImages = (images: any) => ({type: 'MOVIES/SET-MOVIE-IMAGES', payload: {images}} as const);
export const getSimilarMovies = (similarMovies: any) => ({
    type: 'MOVIES/SET-SIMILAR-MOVIES',
    payload: {similarMovies}
} as const);
export const getGenres = (genres: any) => ({type: 'MOVIES/GET-GENRES', payload: {genres}} as const);
export const setFilteredId = (filteredGenres: Array<string> | []) => ({
    type: 'FILTER/SET-FILTERED-ID',
    payload: {filteredGenres}
} as const);
export const setFilteredMovies = (filteredMovies: MovieResponseType[]) => ({
    type: 'FILTER/SET-FILTERED-MOVIES',
    payload: {filteredMovies}
} as const);
export const setIsData = (isData: boolean) => ({type: 'MOVIES/IS-DATA', payload: {isData}} as const);
export const getMovieInfo = (movieGenre: string,
                             budget: number,
                             overview: string,
                             movieId: number,
                             title: string,
                             runtime: number,
                             picture: string,
                             rating: number,
                             language: string,
                             releaseDate: string
) => ({
    type: 'MOVIES/GET-MOVIE-INFO',
    payload: {
        movieGenre,
        budget,
        overview,
        movieId,
        title,
        runtime,
        picture,
        rating,
        language,
        releaseDate

    }
} as const)
export const setSearchName = (searchName: string) => ({type: 'SEARCH/SET-SEARCH-NAME', payload: {searchName}} as const);
export const setTotalPage = (pages: number) => ({type: 'SEARCH/SET-TOTAL-PAGE', payload: {pages}} as const);
export const setCurrentPage = (page: number) => ({type: 'SEARCH/SET-CURRENT-PAGE', payload: {page}} as const);
export const setPrevPage = (page: number) => ({type: 'SEARCH/SET-PREVIOUS-PAGE', payload: {page}} as const);
export const setNextPage = (page: number) => ({type: 'SEARCH/SET-NEXT-PAGE', payload: {page}} as const);
export const setSearchError = (error: boolean) => ({type: 'SEARCH/SET-SEARCH-ERROR', payload: {error}} as const);


//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const getTopMoviesTC = (currentPage: number) => async (dispatch: any) => {
    dispatch(isInitialized(false))
    try {
        const response = await moviesAPI.getTopMovies(currentPage)
        dispatch(getMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
    } catch (e) {

    } finally {
        dispatch(isInitialized(true))
    }
}


export const InfoImagesSimilarThunk = (movieId: any) => async (dispatch: any) => {
    dispatch(setIsData(false))
    const response1 = await moviesAPI.getMovieImages(movieId)
    const response2 = await moviesAPI.getSimilarMovies(movieId)
    const response = await moviesAPI.getMovie(movieId)
    dispatch(setImages(response1.backdrops))
    dispatch(getSimilarMovies(response2.results))
    dispatch(getMovieInfo(
        response.data.genres,
        response.data.budget,
        response.data.overview,
        response.data.id,
        response.data.title,
        response.data.runtime,
        response.data.poster_path,
        response.data.vote_average,
        response.data.original_language,
        response.data.release_date
    ))
    dispatch(setIsData(true))
}

export const getMovieImagesTC = (movieId: number) => async (dispatch: Dispatch) => {
    try {
        const response = await moviesAPI.getMovieImages(movieId)
        dispatch(setImages(response.backdrops))
    } catch (e) {
    } finally {
        dispatch(setIsData(true))

    }
}

export const getMoviesGenres = () => async (dispatch: Dispatch) => {
    const response = await moviesAPI.getGenre()
    try {
        dispatch(getGenres(response.genres))
    } catch (e) {

    } finally {
    }
}
export const searchMovieTC = (query: string, page: number) => async (dispatch: Dispatch) => {
    const response = await moviesAPI.searchMovie(query, page)
    try {
        dispatch(getMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
        dispatch(setCurrentPage(response.page))
        dispatch(isInitialized(true))
        dispatch(setSearchError(false))
    } catch (e) {

    } finally {
    }
}
export const setFilterTC = (page: number, genre: string) => async (dispatch: Dispatch) => {
    const response = await moviesAPI.filterMovie(page, genre)
    try {
        dispatch(setFilteredMovies(response.results))
        dispatch(setCurrentPage(response.page))
        dispatch(setTotalPage(response.total_pages))
    } catch (e) {

    } finally {
    }
}
export const getMovieTC = (movieId: number) => async (dispatch: any) => {
    const response = await moviesAPI.getMovie(movieId)
    try {
        dispatch(getMovieInfo(
            response.data.genres,
            response.data.budget,
            response.data.overview,
            response.data.id,
            response.data.title,
            response.data.runtime,
            response.data.poster_path,
            response.data.vote_average,
            response.data.original_language,
            response.data.release_date
        ))
    } catch (e) {

    } finally {
        dispatch(setIsData(true))


    }
}


export default moviesReducer;
