import React, {useEffect} from 'react';
import style from './TopMovies.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import Movie from "../common/Movie/Movie";
import {getTopMoviesTC} from "../../store/topMovies-reducer";


const TopMovies = () => {

    const topMovies = useSelector<AppStateType, Array<any>>(state => state.movies.top)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopMoviesTC())
    }, [])


    return (
        <div className={style.container}>
            {
                topMovies.map(e =>
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

export default TopMovies;