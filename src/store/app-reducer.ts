import firebase from "firebase";
import myFirebase from "../firebase/firebase";

type initialStateType = {
    initialized: boolean,
    darkMode: boolean,
    isAuth: boolean,
    user: {} | null,
    isVerifying: boolean


}
let initialState: initialStateType = {
    initialized: false,
    darkMode: false,
    isAuth: false,
    user: null,
    isVerifying: false,


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
        case 'APP/VERIFY-SUCCESS':
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

//----------------------------------------------------------------------------------------------------------------------
//Thunks

export const login = () => async (dispatch: any) => {
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
        .onAuthStateChanged( async user => {
            console.log(user)
            if (user !== null) {
                 dispatch(receiveLogin(user))
            }
            dispatch(verifySuccess())
           const local =  localStorage.getItem('darkMode')
            local && dispatch(localDate(JSON.parse(local)))
            dispatch(isInitialized(true))
        })
}

export default appReducer;
