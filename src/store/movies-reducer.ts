import {MovieResponseType, moviesAPI} from "../api/api";
import {isInitialized} from "./app-reducer";
import {setCurrentPage, setTotalPage} from "./search-reducer";

type initialStateType = {

    movies: MovieResponseType[],
}

let initialState: initialStateType = {
    movies: [] as MovieResponseType[],

}
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const moviesReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'MOVIES/SET-MOVIES': {
            return {...state, movies: action.payload.movies}
        }


        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions

export const getMovies = (movies: any) => ({type: 'MOVIES/SET-MOVIES', payload: {movies}} as const);


//----------------------------------------------------------------------------------------------------------------------
//Thunks


export const getTopMoviesTC = (currentPage: number) => async (dispatch: any) => {

    dispatch(isInitialized(true))
    try {

        const response = await moviesAPI.getTopMovies(currentPage)
        console.log(response)
        dispatch(getMovies(response.results))
        dispatch(setTotalPage(response.total_pages))
        dispatch(setCurrentPage(response.page))
        dispatch(isInitialized(false))
    } catch (e) {
        console.log(e)
        dispatch(isInitialized(false))

    }
}


export default moviesReducer;
