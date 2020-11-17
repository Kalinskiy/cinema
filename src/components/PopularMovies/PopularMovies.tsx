import React, {useEffect} from 'react';
import style from './PopularMovies.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import Movie from "../common/Movie/Movie";
import {getPopularMoviesTC} from "../../store/topMovies-reducer";


const PopularMovies = () => {

    const popularMovies = useSelector<AppStateType, Array<any>>(state => state.movies.popular)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPopularMoviesTC())
    }, [])


    return (
        <div className={style.container}>
            {
                popularMovies.map(e =>
                    <Movie key={e.id}
                           release_date={e.release_date}
                           title={e.original_title}
                           overview={e.overview}
                           poster_path={e.poster_path}
                    />)
            }



        </div>
    );
};

export default PopularMovies;