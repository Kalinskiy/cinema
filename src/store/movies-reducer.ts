import {MovieImagesResponseType, MovieResponseType, moviesAPI} from "../api/api";
import {isInitialized} from "./app-reducer";
import {setCurrentPage, setTotalPage} from "./search-reducer";
import {log} from "util";

type initialStateType = {

    movies: MovieResponseType[],
    images: MovieImagesResponseType[],
    similarMovies:[]
}

let initialState: initialStateType = {
    movies: [] as MovieResponseType[],
    images: [] as MovieImagesResponseType[],
    similarMovies:[]

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


        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions

export const getMovies = (movies: any) => ({type: 'MOVIES/SET-MOVIES', payload: {movies}} as const);
export const setImages = (images: any) => ({type: 'MOVIES/SET-MOVIE-IMAGES', payload: {images}} as const);
export const getSimilarMovies = (similarMovies: any) => ({type: 'MOVIES/SET-SIMILAR-MOVIES', payload: {similarMovies}} as const);

//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const getTopMoviesTC = (currentPage: number) => async (dispatch: any) => {

    dispatch(isInitialized(true))
    try {
        const response = await moviesAPI.getTopMovies(currentPage)

        dispatch(getMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
        dispatch(setCurrentPage(response.page))
        dispatch(isInitialized(false))
    } catch (e) {

    }
    finally {
        dispatch(isInitialized(false))
    }
}
export const getMovieImagesTC = (movieId: number) => async (dispatch: any) => {
    dispatch(isInitialized(true))
    try {
        const response = await moviesAPI.getMovieImages(movieId)
        dispatch(setImages(response.backdrops))
    } catch (e) {
    }
    finally {
        dispatch(isInitialized(false))
    }
}
export const getSimilarMoviesTC = (movieId: number) => async (dispatch: any) => {
    dispatch(isInitialized(true))
    try {
        const response = await moviesAPI.getSimilarMovies(movieId)
        dispatch(getSimilarMovies(response.results))
    } catch (e) {
    }
    finally {
        dispatch(isInitialized(false))
    }
}


export default moviesReducer;
