import React, {useEffect} from 'react';
import './App.css';
import style from './App.module.css'
import Header from "./components/Header/Header";
import {BrowserRouter, Route, useParams} from "react-router-dom";
import {getTopMoviesTC} from "./store/movies-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import Movies from "./components/Movies/Movies";
import MovieCard from "./components/common/MovieCard/MovieCard";
import Gallery from './components/common/Gallery/Gallery';


function App() {
    let page = useSelector<AppStateType, number>(state => state.search.currentPage)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTopMoviesTC(page))

    }, [])

    return <>
        <BrowserRouter>
            <Header/>

            <div className={style.container}>


                <Route exact path='/' render={() => <Movies/>}/>
                <Route path='/movie/:id' render={() => <MovieCard/>}/>
                <Route path='/:id/gallery' render={() => <Gallery/>}/>

            </div>
        </BrowserRouter>
    </>
}

export default App;
