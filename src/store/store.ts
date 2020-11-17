import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import authReducer from "./auth-reducer";
import moviesReducer from "./topMovies-reducer";


const reducers = combineReducers({
    auth:authReducer,
    movies:moviesReducer

})


export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
let store = createStore(reducers, composeEnhancers (applyMiddleware(thunkMiddleWare)));


// @ts-ignore
window.store =  store



export default store;
