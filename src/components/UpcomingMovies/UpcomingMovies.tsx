import React, {useEffect} from 'react';
import style from './UpcomingMovies.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import Movie from "../common/Movie/Movie";
import {getUpcomingMoviesTC} from "../../store/topMovies-reducer";


const UpcomingMovies = () => {

    const upcomingMovies = useSelector<AppStateType, Array<any>>(state => state.movies.upcoming)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUpcomingMoviesTC())
    }, [])


    return (
        <div className={style.container}>
            {
                upcomingMovies.map(e =>
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

export default UpcomingMovies;