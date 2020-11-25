import React, {useEffect} from 'react';
import style from './SimilarMovie.module.css'
import noPoster from "../../../../assets/noposter.png";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getMovieTC} from "../../../../store/movies-reducer";


type SimilarMoviePropsType = {
    title: string
    image: string
    id: number
}

const SimilarMovie = (props: SimilarMoviePropsType) => {
    const dispatch = useDispatch()


    const getMovie = () => {
        dispatch(getMovieTC(props.id))
    }

    return (
        <div className={style.container} onClick={getMovie}>
            <NavLink to={`/movie/${props.id}`}>
                <div className={style.title}>
                    {props.title}
                </div>
                <div className={style.image}>
                    <img src={`${props.image ? `https://image.tmdb.org/t/p/w500/${props.image}` : noPoster}`} alt=""/>
                </div>
            </NavLink>
        </div>
    );
};

export default SimilarMovie;