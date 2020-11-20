import React, {useEffect, useState} from 'react';
import style from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";


import 'react-awesome-slider/dist/styles.css';
import Slider from "../Slider/Slider";
import Search from "../../Search/Search";
import Movie from "../common/MovieComponent/Movie";
import Paginator from "../Paginator/Paginator";
import {searchMovieTC, setCurrentPage} from "../../store/search-reducer";
import Preloader from '../common/Preloader/Preloader';
import {useHistory} from "react-router-dom";


const Home = () => {
    const movies = useSelector<AppStateType, Array<any>>(state => state.movies.movies)
    const upcomingMovies = useSelector<AppStateType, Array<any>>(state => state.movies.upcoming)
    const popularMovies = useSelector<AppStateType, Array<any>>(state => state.movies.popular)
    const searchMovies = useSelector<AppStateType, Array<any>>(state => state.search.search)
    const totalPage = useSelector<AppStateType, number | null>(state => state.search.totalPages)
    let currentPage = useSelector<AppStateType, number | null>(state => state.search.currentPage)
    const searchName = useSelector<AppStateType, string>(state => state.search.searchName)
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const searchError = useSelector<AppStateType, string>(state => state.search.searchError)

    const history = useHistory()



    const [images, setImages] = useState<string[]>([])


    const dispatch = useDispatch()
    useEffect(() => {
        if (popularMovies.length && movies.length && upcomingMovies.length) {
            const imgArray =
                [
                    `https://image.tmdb.org/t/p/w500/${upcomingMovies[0].poster_path}`,
                    `https://image.tmdb.org/t/p/w500/${movies[0].poster_path}`,
                    `https://image.tmdb.org/t/p/w500/${popularMovies[0].poster_path}`
                ]
            setImages(imgArray)
        }

    }, [popularMovies, movies, upcomingMovies])


    return (

        <div className={style.container}>

            {!!images.length && <Slider imgArray={images}/>}
            <Paginator currentPage={currentPage ? currentPage : 0} totalPage={totalPage ? totalPage : 0}
                       pagePortion={10}
                       changePage={(page) => {

                           dispatch(searchMovieTC(searchName, page))
                       }
                       }/>
            {!!searchMovies.length && searchMovies.map(e =>
                <Movie key={e.id}
                       release_date={e.release_date}
                       title={e.original_title}
                       overview={e.overview}
                       poster_path={e.poster_path}
                       vote_average={e.vote_average}
                       id={e.id}
                />)}


        </div>

    );
};

export default Home;