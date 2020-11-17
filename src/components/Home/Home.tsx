import React, {useEffect} from 'react';
import style from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {getPopularMoviesTC, getTopMoviesTC, getUpcomingMoviesTC} from "../../store/topMovies-reducer";



import 'react-awesome-slider/dist/styles.css';
import Slider from "../Slider/Slider";


const Home = () => {
    const popularMovies = useSelector<AppStateType, Array<any>>(state => state.movies.popular)
    const topMovies = useSelector<AppStateType, Array<any>>(state => state.movies.top)
    const upcomingMovies = useSelector<AppStateType, Array<any>>(state => state.movies.upcoming)

    const dispatch = useDispatch()
    const imgArray =
        [`https://image.tmdb.org/t/p/w500/${upcomingMovies[0].poster_path}`,
        `https://image.tmdb.org/t/p/w500/${topMovies[0].poster_path}`,
        `https://image.tmdb.org/t/p/w500/${popularMovies[0].poster_path}`]

    useEffect(() => {
        dispatch(getUpcomingMoviesTC())
        dispatch(getPopularMoviesTC())
        dispatch(getTopMoviesTC())

    }, [])



    return (
        <div className={style.container}>

            <Slider imgArray={imgArray}/>

        </div>
    );
};

export default Home;