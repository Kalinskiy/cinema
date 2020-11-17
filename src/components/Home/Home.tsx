import React, {useEffect, useState} from 'react';
import style from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {getPopularMoviesTC, getTopMoviesTC, getUpcomingMoviesTC} from "../../store/topMovies-reducer";


import 'react-awesome-slider/dist/styles.css';
import Slider from "../Slider/Slider";
import Search from "../../Search/Search";


const Home = () => {
    const popularMovies = useSelector<AppStateType, Array<any>>(state => state.movies.popular)
    const topMovies = useSelector<AppStateType, Array<any>>(state => state.movies.top)
    const upcomingMovies = useSelector<AppStateType, Array<any>>(state => state.movies.upcoming)

    const [images, setImages] = useState<string[]>([])

    const dispatch = useDispatch()
    useEffect(() => {
        if(popularMovies.length && topMovies.length && upcomingMovies.length){
            const imgArray =
                [`https://image.tmdb.org/t/p/w500/${upcomingMovies[0].poster_path}`,
                    `https://image.tmdb.org/t/p/w500/${topMovies[0].poster_path}`,
                    `https://image.tmdb.org/t/p/w500/${popularMovies[0].poster_path}`]
            setImages(imgArray)
        }

    }, [popularMovies, topMovies, upcomingMovies])


    // useEffect(() => {
    //     dispatch(getUpcomingMoviesTC())
    //     dispatch(getPopularMoviesTC())
    //     dispatch(getTopMoviesTC())
    //
    // }, [])


    return (
        <div className={style.container}>
            <Search/>

            { images.length && <Slider imgArray={images}/>}

        </div>
    );
};

export default Home;