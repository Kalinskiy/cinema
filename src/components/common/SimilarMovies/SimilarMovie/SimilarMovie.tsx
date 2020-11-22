import React from 'react';
import style from './SimilarMovie.module.css'
import noPoster from "../../../../assets/noposter.png";


type SimilarMoviePropsType = {
    title: string
    image: string
}

const SimilarMovie = (props: SimilarMoviePropsType) => {
    return (
        <div className={style.container}>
            <div className={style.title}>
                {props.title}
            </div>
            <div className={style.image}>
                <img src={`${props.image ? `https://image.tmdb.org/t/p/w500/${props.image}` : noPoster}`} alt=""/>
            </div>
        </div>
    );
};

export default SimilarMovie;