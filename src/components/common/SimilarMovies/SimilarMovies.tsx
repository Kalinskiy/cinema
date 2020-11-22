import React from 'react';
import style from './SimilarMovies.module.css'
import {MovieResponseType} from "../../../api/api";
import SimilarMovie from "./SimilarMovie/SimilarMovie";


type SimilarMoviesPropsType = {
    similarMovies: Array<MovieResponseType>
}
const SimilarMovies = (props: SimilarMoviesPropsType) => {


    return (
        <div className={style.container}>
            <div className={style.title}>You might also like:</div>
            <div className={style.wrapper}>

                {
                    props.similarMovies.map(item => {
                        return <SimilarMovie
                            title={item.title}
                            image={item.poster_path}
                        />
                    })
                }
            </div>
        </div>
    );
};

export default SimilarMovies;