import {moviesAPI} from "../api/api";

export type StatusType = 'watch' | 'getTicket'
type initialStateType = {
    popular: [],
    top: [],
    upcoming:  [],
    status:StatusType | null

}

let initialState: initialStateType = {
    popular: [],
    top: [],
    upcoming: [],
    status: 'watch',


}
//----------------------------------------------------------------------------------------------------------------------
//Types


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const moviesReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'MOVIES/POPULAR-MOVIES': {
            return {...state, popular: action.payload.movies}
        }
        case 'MOVIES/TOP-MOVIES': {
            return {...state, top: action.payload.movies}
        }
        case 'MOVIES/UPCOMING-MOVIE': {
            return {...state, upcoming: action.payload.movies}
        }
        case 'MOVIES/SET-STATUS': {
            return {...state, status: action.payload.status}
        }


        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions
export const getPopularMovies = (movies: any) => ({type: 'MOVIES/POPULAR-MOVIES', payload: {movies}} as const);
export const getTopMovies = (movies: any) => ({type: 'MOVIES/TOP-MOVIES', payload: {movies}} as const);
export const getUpcomingMovies = (movies: any) => ({type: 'MOVIES/UPCOMING-MOVIE', payload: {movies}} as const);
export const setMovieStatus = (status: StatusType) => ({type: 'MOVIES/SET-STATUS', payload: {status}} as const);



//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const getPopularMoviesTC = () => async (dispatch: any) => {
    try {
        const response = await moviesAPI.getPopularMovies()
        dispatch(getPopularMovies(response.results))
        dispatch(setMovieStatus('watch'))


    } catch (e) {
        console.log(e)

    }
}
export const getTopMoviesTC = () => async (dispatch: any) => {
    try {
        const response = await moviesAPI.getTopMovies()
        dispatch(getTopMovies(response.results))
        dispatch(setMovieStatus('watch'))


    } catch (e) {
        console.log(e)

    }
}
export const getUpcomingMoviesTC = () => async (dispatch: any) => {
    try {
        const response = await moviesAPI.getUpcomingMovies()
        dispatch(getUpcomingMovies(response.results))
        dispatch(setMovieStatus('getTicket'))

    } catch (e) {
        console.log(e)

    }
}


export default moviesReducer;
