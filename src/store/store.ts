import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import moviesReducer from "./movies-reducer";
import appReducer from "./app-reducer";


const reducers = combineReducers({
    movies: moviesReducer,
    app:appReducer
})


export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));


// @ts-ignore
window.store = store


export default store;
