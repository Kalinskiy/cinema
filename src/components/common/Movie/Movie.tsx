import React from 'react';
import style from './Movie.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {StatusType} from "../../../store/topMovies-reducer";


type TopMovieType = {
    title: string
    overview: string
    poster_path: string
    release_date: string
}
const Movie = (props: TopMovieType) => {
    const status = useSelector<AppStateType, StatusType>(state => state.movies.status)

    return (
        <div className={style.container}>
            <div className={style.row1}>

                <div className={style.img}>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`} alt=""/>
                </div>

            </div>
            <div className={style.row2}>

                <div className={style.title}>
                    <h3>{props.title}</h3>
                </div>
                <div className={style.overview}>
                    {props.overview}
                </div>
                <div className={style.watch}>
                    <button className={style.watchButton}>
                        {status ==='watch'? 'WATCH': 'GET TICKET'}
                    </button>
                </div>
                <div className={style.release}>
                    {props.release_date}
                </div>

            </div>


        </div>
    );
};

export default Movie;