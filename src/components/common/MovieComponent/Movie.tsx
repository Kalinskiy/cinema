import React from 'react';
import style from './Movie.module.css'

import noPoster from '../../../assets/noposter.png'
import {NavLink} from "react-router-dom";

type TopMovieType = {
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
    id: number
}
const Movie = (props: TopMovieType) => {


    return (
        <div className={style.container}>

            <div className={style.row1}>
                <NavLink to={`/movie/${props.id}`}>
                    <div className={style.img}>
                        <img
                            src={`${props.poster_path ? `https://image.tmdb.org/t/p/w500/${props.poster_path}` : noPoster}`}/>
                    </div>
                </NavLink>
            </div>
            <div className={style.row2}>

                <div className={style.title}>
                    <h3>{props.title}</h3>
                </div>
                <div className={style.overview}>
                    {props.overview}
                </div>
                <div className={style.voteAverage}>
                  score:  {props.vote_average}

                </div>
                <NavLink to={`/movie/${props.id}`}>
                <div className={style.watch}>
                    <button className={style.watchButton}>
                        WATCH
                    </button>
                </div>
                </NavLink>
                <div className={style.release}>
                    {props.release_date}
                </div>

            </div>


        </div>
    );
};

export default Movie;