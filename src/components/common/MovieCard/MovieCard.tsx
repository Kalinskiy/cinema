import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {MovieResponseType} from "../../../api/api";
import {getTopMoviesTC} from "../../../store/movies-reducer";

const MovieCard = () => {
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()
    console.log(params.id, 'params')
    const movieDetail = useSelector<AppStateType, Array<MovieResponseType>>(state => state.movies.movies)
    // @ts-ignore
    const movie = movieDetail.find(movie => movie.id === parseInt(params.id))

    console.log('movie', movie);
    console.log('movieDetail', movieDetail)

    useEffect(() => {

        // dispatch(getTopMoviesTC())

    }, [])


    return (
        <>
            {
                movie
                    ? <div style={{color: 'white', fontSize: '20px'}}>
                        {movie.title}
                    </div>
                    : 'server error'
            }
        </>
    )

}

export default MovieCard;