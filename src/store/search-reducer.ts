import {moviesAPI} from "../api/api";

export type StatusType = 'watch' | 'getTicket'
type initialStateType = {
    popular: [],
    top: [],
    upcoming: [],
    status: StatusType | null,
    search: [],
    searchName: string,
    totalPages: number | null,
    currentPage: number | null


}

let initialState: initialStateType = {
    popular: [],
    top: [],
    upcoming: [],
    status: 'watch',
    search: [],
    searchName: '',
    totalPages: null,
    currentPage: null


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
            console.log('asddsa', action.payload.page)
            return {...state, currentPage: action.payload.page}
        }
        case 'SEARCH/SET-PREVIOUS-PAGE': {
            return {...state, currentPage: action.payload.page - 1,}
        }
        case 'SEARCH/SET-NEXT-PAGE': {
            return {...state, currentPage: action.payload.page + 1,}
        }
        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions
export const searchMovies = (search: any) => ({type: 'MOVIES/SEARCH-MOVIE', payload: {search}} as const);
export const setSearchName = (searchName: any) => ({type: 'MOVIES/SET-SEARCH-NAME', payload: {searchName}} as const);
export const setTotalPage = (pages: number) => ({type: 'SEARCH/SET-TOTAL-PAGE', payload: {pages}} as const);
export const setCurrentPage = (page: number) => ({type: 'SEARCH/SET-CURRENT-PAGE', payload: {page}} as const);
export const setPrevPage = (page: number) => ({type: 'SEARCH/SET-PREVIOUS-PAGE', payload: {page}} as const);
export const setNextPage = (page: number) => ({type: 'SEARCH/SET-NEXT-PAGE', payload: {page}} as const);


//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const searchMovieTC = (query: string, page: number) => async (dispatch: any) => {
    try {
        const response = await moviesAPI.searchMovie(query, page)
        dispatch(searchMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
        dispatch(setCurrentPage(response.page))


    } catch (e) {
        console.log(e)

    }
}


export default searchReducer;
