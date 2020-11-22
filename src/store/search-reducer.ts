import {moviesAPI} from "../api/api";
import {isInitialized} from "./app-reducer";
import {getMovies} from "./movies-reducer";

type initialStateType = {
    search: [],
    searchName: string,
    searchError: boolean
    totalPages: number | null,
    currentPage: number | null,


}

let initialState: initialStateType = {
    search: [],
    searchError: false,
    searchName: '',
    totalPages: null,
    currentPage: 1


}
//----------------------------------------------------------------------------------------------------------------------
//Types


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const searchReducer = (state = initialState, action: any) => {

    switch (action.type) {
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
        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions
export const setSearchName = (searchName: any) => ({type: 'SEARCH/SET-SEARCH-NAME', payload: {searchName}} as const);
export const searchMovies = (search: any) => ({type: 'SEARCH/SEARCH-MOVIE', payload: {search}} as const);
export const setTotalPage = (pages: number) => ({type: 'SEARCH/SET-TOTAL-PAGE', payload: {pages}} as const);
export const setCurrentPage = (page: number) => ({type: 'SEARCH/SET-CURRENT-PAGE', payload: {page}} as const);
export const setPrevPage = (page: number) => ({type: 'SEARCH/SET-PREVIOUS-PAGE', payload: {page}} as const);
export const setNextPage = (page: number) => ({type: 'SEARCH/SET-NEXT-PAGE', payload: {page}} as const);
export const setSearchError = (error: boolean) => ({type: 'SEARCH/SET-SEARCH-ERROR', payload: {error}} as const);


//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const searchMovieTC = (query: string, page: number) => async (dispatch: any) => {
    dispatch(isInitialized(true))
    try {
        const response = await moviesAPI.searchMovie(query, page)
        dispatch(getMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
        dispatch(setCurrentPage(response.page))
        dispatch(isInitialized(false))
        dispatch(setSearchError(false))


    } catch (e) {
        dispatch(setSearchError(true))
    }
    finally {
        dispatch(isInitialized(false))
    }
}


export default searchReducer;
