import React, {useEffect} from 'react';
import './App.css';
import style from './App.module.css'
import Header from "./components/Header/Header";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import PopularMovies from "./components/PopularMovies/PopularMovies";
import TopMovies from "./components/TopMovies/TopMovies";
import UpcomingMovies from "./components/UpcomingMovies/UpcomingMovies";
import Home from "./components/Home/Home";
import {getPopularMoviesTC, getTopMoviesTC, getUpcomingMoviesTC} from "./store/topMovies-reducer";
import {useDispatch} from "react-redux";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUpcomingMoviesTC())
        dispatch(getPopularMoviesTC())
        dispatch(getTopMoviesTC())

    }, [])
    return <>
        <BrowserRouter>
            <Header/>

            <div className={style.container}>


                <Route path='/home' render={() => <Home/>}/>
                <Route path='/rated' render={() => <TopMovies/>}/>
                <Route path='/upcoming' render={() => <UpcomingMovies/>}/>
                <Route path='/popular' render={() => <PopularMovies />}/>
                {/*<Route exact path={'/'} render={() => <Redirect to="/home"/>}/>*/}
            </div>
        </BrowserRouter>
    </>
}

export default App;
