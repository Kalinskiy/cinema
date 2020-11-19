import React, {useEffect, useState} from 'react';
import style from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";


import 'react-awesome-slider/dist/styles.css';
import Slider from "../Slider/Slider";
import Search from "../../Search/Search";
import Movie from "../common/Movie/Movie";
import Paginator from "../Paginator/Paginator";
import {searchMovieTC, setCurrentPage} from "../../store/topMovies-reducer";


const Home = () => {
    const popularMovies = useSelector<AppStateType, Array<any>>(state => state.movies.popular)
    const topMovies = useSelector<AppStateType, Array<any>>(state => state.movies.top)
    const upcomingMovies = useSelector<AppStateType, Array<any>>(state => state.movies.upcoming)
    const searchMovies = useSelector<AppStateType, Array<any>>(state => state.movies.search)
    const totalPage = useSelector<AppStateType, number | null>(state => state.movies.totalPages)
    let currentPage = useSelector<AppStateType, number | null>(state => state.movies.currentPage)
    const searchName = useSelector<AppStateType, string>(state => state.movies.searchName)

    useEffect(() => {
        if (currentPage) {
            dispatch(searchMovieTC(searchName, currentPage))
        }
    }, [currentPage])


    const [images, setImages] = useState<string[]>([])


    const dispatch = useDispatch()
    useEffect(() => {
        if (popularMovies.length && topMovies.length && upcomingMovies.length) {
            const imgArray =
                [
                    `https://image.tmdb.org/t/p/w500/${upcomingMovies[0].poster_path}`,
                    `https://image.tmdb.org/t/p/w500/${topMovies[0].poster_path}`,
                    `https://image.tmdb.org/t/p/w500/${popularMovies[0].poster_path}`
                ]
            setImages(imgArray)
        }

    }, [popularMovies, topMovies, upcomingMovies])

    return (
        <div className={style.container}>
            <Search/>
            {!!images.length && <Slider imgArray={images}/>}
            {searchMovies.length && searchMovies.map(e =>
                <Movie key={e.id}
                       release_date={e.release_date}
                       title={e.original_title}
                       overview={e.overview}
                       poster_path={e.poster_path}
                />)}
            <Paginator currentPage={currentPage ? currentPage : 0} totalPage={totalPage ? totalPage : 0}
                       changePage={(page) => {
                           dispatch(setCurrentPage(page))
                       }
                       }/>

        </div>
    );
};

export default Home;