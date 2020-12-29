import firebase from "firebase";
import myFirebase from "../firebase/firebase";
import {db} from '../firebase/firebase'
import {setIsData} from "./movies-reducer";

type initialStateType = {
    initialized: boolean,
    darkMode: boolean,
    isAuth: boolean,
    user: {} | null,
    isVerifying: boolean,

    favoriteMovies: {} | null


}
let initialState: initialStateType = {
    initialized: false,
    darkMode: false,
    isAuth: false,
    user: null,
    isVerifying: false,
    favoriteMovies: {},

}
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const appReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'APP/IS-INITIALIZED': {
            return {...state, initialized: action.payload.initialized}
        }
        case 'APP/IS-DARK-MODE': {
            return {...state, darkMode: action.payload.darkMode}
        }
        case 'APP/IS-AUTH': {
            return {...state, isAuth: action.payload.isAuth}
        }
        case 'APP/SET-USER': {
            return {...state, user: action.payload.user}
        }
        case 'APP/VERIFY_SUCCESS':
            return {
                ...state,
                isVerifying: false
            }
        case 'APP/VERIFY-REQUEST':
            return {
                ...state,
                isVerifying: true
            }
        case 'APP/GET-THEME':
            return {
                ...state,
                darkMode: action.payload.darkMode
            }

        case 'LOGIN/GET-MOVIES-SUCCESS':
            return {
                ...state,
                favoriteMovies: action.payload.movies,
            }

        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Actions

export const isInitialized = (initialized: boolean) => ({type: 'APP/IS-INITIALIZED', payload: {initialized}} as const);
export const isSetDarkMode = (darkMode: boolean) => ({type: 'APP/IS-DARK-MODE', payload: {darkMode}} as const)
export const isAuth = (isAuth: boolean) => ({type: 'APP/IS-AUTH', payload: {isAuth}} as const)
export const verifyRequest = () => ({type: 'APP/VERIFY-REQUEST'} as const)
export const verifySuccess = () => ({type: 'APP/VERIFY_SUCCESS'} as const)
export const receiveLogin = (user: any) => ({type: 'APP/SET-USER', payload: {user}} as const)
export const localDate = (darkMode: boolean) => ({type: 'APP/GET-THEME', payload: {darkMode}} as const)
export const setFavoritesMovies = (movies: any) => ({type: 'LOGIN/GET-MOVIES-SUCCESS', payload: {movies}} as const)


//----------------------------------------------------------------------------------------------------------------------
//Thunks

export const login = () => async (dispatch: any) => {
    dispatch(isInitialized(false))
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    console.log(myFirebase)
    const result = await firebase.auth().signInWithPopup(provider)
    try {
        console.log(result)
        dispatch(isAuth(true))
        dispatch(receiveLogin(result.user))
    } catch (e) {

    } finally {
        dispatch(isInitialized(true))
    }
}

export const logout = () => async (dispatch: any) => {
    await firebase.auth().signOut()
    dispatch(isAuth(false))
    dispatch(receiveLogin(null))

}
export const verifyAuth = () => async (dispatch: any) => {
    dispatch(isInitialized(false))

        dispatch(verifyRequest());
        firebase
            .auth()
            .onAuthStateChanged(async user => {
                console.log(user)
                if (user !== null) {
                    dispatch(receiveLogin(user))
                    await dispatch(getFavoritesMovies())
                    await dispatch(addMoviesListener())
                }
                dispatch(verifySuccess())
                const local = localStorage.getItem('darkMode')
                local && dispatch(localDate(JSON.parse(local)))
                dispatch(isInitialized(true))

            })



}
export const getFavoritesMovies = () => async (dispatch: any) => {

    const userId = firebase.auth().currentUser?.uid
    const moviesColl = db.collection('users').doc(`${userId}`).collection('movies')
    const documents = {}
    const doc = await moviesColl.get()


    doc.forEach((doc) => {
        // @ts-ignore
        documents[doc.id] = doc.data()
    })
    dispatch(setFavoritesMovies(documents))

}

export const addMoviesListener = () => (dispatch: any) => {
    // @ts-ignore
    const userId = firebase.auth().currentUser.uid
    const moviesColl = db.collection('users').doc(`${userId}`).collection('movies')


    moviesColl.onSnapshot(async doc => {
        const moviesDocs = await moviesColl.get()
        const documents = {}

        moviesDocs.forEach(doc => {
            // @ts-ignore
            documents[doc.id] = doc.data()
        })
        dispatch(setFavoritesMovies(documents))

    })

}

export const deleteFirebaseItem = async (movie: any) => {
    // @ts-ignore
    const userId = firebase.auth().currentUser.uid
    await db.collection('users').doc(`${userId}`).collection('movies').doc(`${movie.id}`).delete()
}

export const removeMovieFromFavorite = (movie: any) => async (dispatch: any) => {

    try {
        await deleteFirebaseItem(movie)
        dispatch(getFavoritesMovies())
    } catch (err) {
        console.log(err)
    }

}

export const addFireBaseItem = async (movie: any) => {

    // @ts-ignore
    const userId = firebase.auth().currentUser.uid

    await db.collection('users').doc(`${userId}`).collection('movies').doc(`${movie.id}`).set({
        ...movie,
        atTime: firebase.firestore.Timestamp.fromDate(new Date())
    })
}

export const addMovieToFavorite = (movie: any) => async (dispatch: any) => {

    try {
        await addFireBaseItem(movie)
        dispatch(getFavoritesMovies())
    } catch (err) {
        console.log(err)
    }

}


export default appReducer;
