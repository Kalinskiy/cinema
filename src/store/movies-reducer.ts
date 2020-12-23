import {GenreType, MovieImagesResponseType, MovieResponseType, moviesAPI} from "../api/api";
import {isInitialized} from "./app-reducer";
import firebase from "firebase";
import {db} from "../firebase/firebase";


export type MovieInitialStateType = {
    language: string | null,
    overview: string | null,
    title: string | null,
    movieId: number | null,
    budget: number | null,
    movieGenre:  GenreType[]
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
    filteredMovies: []

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
    filteredMovies: []


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
        case 'MOVIES/GET-MOVIE-GENRE': {

            return {...state, movieGenre: action.payload.movieGenre}
        }
        case 'MOVIES/GET-MOVIE-BUDGET': {
            return {...state, budget: action.payload.budget}
        }
        case 'MOVIES/GET-MOVIE-OVERVIEW': {
            return {...state, overview: action.payload.overview}
        }
        case 'MOVIES/GET-MOVIE-ID': {
            return {...state, movieId: action.payload.movieId}
        }
        case 'MOVIES/GET-MOVIE-TITLE': {
            return {...state, title: action.payload.title}
        }
        case 'MOVIES/GET-MOVIE-RUNTIME': {
            return {...state, runtime: action.payload.runtime}
        }
        case 'MOVIES/GET-MOVIE-PICTURE': {
            return {...state, picture: action.payload.picture}
        }
        case 'MOVIES/GET-MOVIE-RATING': {
            return {...state, rating: action.payload.rating}
        }
        case 'MOVIES/GET-MOVIE-LANGUAGE': {
            return {...state, language: action.payload.language}
        }
        case 'MOVIES/GET-MOVIE-RELEASE-DATE': {
            return {...state, releaseDate: action.payload.releaseDate}
        }
        case 'SEARCH/SET-SEARCH-NAME': {
            return {...state, searchName: action.payload.searchName}
        }
        case 'SEARCH/SEARCH-MOVIE': {
            return {...state, search: action.payload.search}
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
        case 'MOVIES/GET-MOVIES-VOTES': {
            return {...state, votes: action.payload.votes}
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
export const getMovieGenre = (movieGenre: any) => ({type: 'MOVIES/GET-MOVIE-GENRE', payload: {movieGenre}} as const);
export const getMovieBudget = (budget: number) => ({type: 'MOVIES/GET-MOVIE-BUDGET', payload: {budget}} as const);
export const getMovieOverview = (overview: string) => ({
    type: 'MOVIES/GET-MOVIE-OVERVIEW',
    payload: {overview}
} as const);
export const getMovieId = (movieId: number) => ({type: 'MOVIES/GET-MOVIE-ID', payload: {movieId}} as const);
export const getMovieTitle = (title: string) => ({
    type: 'MOVIES/GET-MOVIE-TITLE',
    payload: {title}
} as const);
export const getMovieRunTime = (runtime: number) => ({type: 'MOVIES/GET-MOVIE-RUNTIME', payload: {runtime}} as const);
export const getMoviePicture = (picture: string) => ({type: 'MOVIES/GET-MOVIE-PICTURE', payload: {picture}} as const);
export const getMovieRating = (rating: number) => ({type: 'MOVIES/GET-MOVIE-RATING', payload: {rating}} as const);
export const getMovieLanguage = (language: string) => ({
    type: 'MOVIES/GET-MOVIE-LANGUAGE',
    payload: {language}
} as const);
export const getMovieReleaseDate = (releaseDate: string) => ({
    type: 'MOVIES/GET-MOVIE-RELEASE-DATE',
    payload: {releaseDate}
} as const);

export const setSearchName = (searchName: any) => ({type: 'SEARCH/SET-SEARCH-NAME', payload: {searchName}} as const);
export const searchMovies = (search: any) => ({type: 'SEARCH/SEARCH-MOVIE', payload: {search}} as const);
export const setTotalPage = (pages: number) => ({type: 'SEARCH/SET-TOTAL-PAGE', payload: {pages}} as const);
export const setCurrentPage = (page: number) => ({type: 'SEARCH/SET-CURRENT-PAGE', payload: {page}} as const);
export const setPrevPage = (page: number) => ({type: 'SEARCH/SET-PREVIOUS-PAGE', payload: {page}} as const);
export const setNextPage = (page: number) => ({type: 'SEARCH/SET-NEXT-PAGE', payload: {page}} as const);
export const setSearchError = (error: boolean) => ({type: 'SEARCH/SET-SEARCH-ERROR', payload: {error}} as const);
export const setFilteredId = (filteredGenres: any) => ({
    type: 'FILTER/SET-FILTERED-ID',
    payload: {filteredGenres}
} as const);
export const setFilteredMovies = (filteredMovies: any) => ({
    type: 'FILTER/SET-FILTERED-MOVIES',
    payload: {filteredMovies}
} as const);



//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const getTopMoviesTC = (currentPage: number) => async (dispatch: any) => {


    try {
        const response = await moviesAPI.getTopMovies(currentPage)


        dispatch(getMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
        // dispatch(setCurrentPage(response.page))

    } catch (e) {

    } finally {

    }
}
export const getMovieImagesTC = (movieId: number) => async (dispatch: any) => {

    try {
        const response = await moviesAPI.getMovieImages(movieId)
        dispatch(setImages(response.backdrops))
    } catch (e) {
    } finally {

    }
}
export const getSimilarMoviesTC = (movieId: number) => async (dispatch: any) => {

    try {
        const response = await moviesAPI.getSimilarMovies(movieId)
        dispatch(getSimilarMovies(response.results))
    } catch (e) {
    } finally {

    }
}
export const getMoviesGenres = () => async (dispatch: any) => {

    try {
        const response = await moviesAPI.getGenre()
        dispatch(getGenres(response.genres))


    } catch (e) {
    } finally {

    }
}
export const searchMovieTC = (query: string, page: number) => async (dispatch: any) => {

    try {
        const response = await moviesAPI.searchMovie(query, page)
        dispatch(getMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
        dispatch(setCurrentPage(response.page))
        dispatch(isInitialized(true))
        dispatch(setSearchError(false))


    } catch (e) {
        dispatch(setSearchError(true))
    } finally {

    }
}
export const setFilterTC = (page: number, genre: string) => async (dispatch: any) => {

    dispatch(isInitialized(false))
    try {
        const response = await moviesAPI.filterMovie(page, genre)
        dispatch(setFilteredMovies(response.results))

        dispatch(setCurrentPage(response.page))
        dispatch(setTotalPage(response.total_pages))


    } catch (e) {

    } finally {

    }
}
export const getMovieTC = (movieId: number) => async (dispatch: any) => {

    try {
        const response = await moviesAPI.getMovie(movieId)
        dispatch(getMovieGenre(response.data.genres))
        dispatch(getMovieBudget(response.data.budget))
        dispatch(getMovieOverview(response.data.overview))
        dispatch(getMovieId(response.data.id))
        dispatch(getMovieTitle(response.data.title))
        dispatch(getMovieRunTime(response.data.runtime))
        dispatch(getMoviePicture(response.data.poster_path))
        dispatch(getMovieRating(response.data.vote_average))
        dispatch(getMovieLanguage(response.data.original_language))
        dispatch(getMovieReleaseDate(response.data.release_date))
        dispatch(isInitialized(true))


    } catch (e) {

    } finally {

    }
}

export const getMoviesFavOnce = () => async (dispatch:any) => {
    // @ts-ignore
    const userId =  firebase.auth().currentUser.uid
    const moviesColl = db.collection('users').doc(`${userId}`).collection('movies')
    const doc = await moviesColl.get()
    const documents = {}

    doc.forEach((doc:any) => {
        // @ts-ignore
        documents[doc.id] = doc.data()
    })
    dispatch(getMovies(documents))
}
export const addFireBaseItem = async (movie:any) => {
    // @ts-ignore
    const userId = firebase.auth().currentUser.uid

    await db.collection('users').doc(`${userId}`).collection('movies').doc(`${movie.id}`).set({
        ...movie,
        atTime: firebase.firestore.Timestamp.fromDate(new Date())
    })
}
export const addMovieFav = (movie:any) => async (dispatch:any) => {
    try {
        await addFireBaseItem(movie)
        dispatch(getMoviesFavOnce())
    } catch (err) {
        console.log(err)
    }

}


export default moviesReducer;
