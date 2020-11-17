import React from 'react';
import './App.css';
import style from './App.module.css'
import Header from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import PopularMovies from "./components/PopularMovies/PopularMovies";
import TopMovies from "./components/TopMovies/TopMovies";
import UpcomingMovies from "./components/UpcomingMovies/UpcomingMovies";
import Home from "./components/Home/Home";


function App() {

    return <>
        <BrowserRouter>
            <Header/>

            <div className={style.container}>

                <Route path='/popular' render={() => <PopularMovies/>}/>
                <Route path='/home' render={() => <Home/>}/>
                <Route path='/rated' render={() => <TopMovies/>}/>
                <Route path='/upcoming' render={() => <UpcomingMovies/>}/>

            </div>
        </BrowserRouter>
    </>
}

export default App;
