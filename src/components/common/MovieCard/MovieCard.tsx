import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {MovieImagesArrayResponseType, MovieResponseType} from "../../../api/api";
import style from './MovieCard.module.css'
import noPoster from '../../../assets/noposter.png'
import {getMovieImagesTC, getSimilarMoviesTC} from "../../../store/movies-reducer";
import Preloader from "../Preloader/Preloader";
import SimilarMovies from '../SimilarMovies/SimilarMovies';



const MovieCard = () => {
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()
    const movieDetail = useSelector<AppStateType, Array<MovieResponseType>>(state => state.movies.movies)
    const images = useSelector<AppStateType, Array<MovieImagesArrayResponseType>>(state => state.movies.images)
    const similarMovies = useSelector<AppStateType, Array<any>>(state => state.movies.similarMovies)
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const movie = movieDetail.find(movie => movie.id === parseInt(params.id))


    useEffect(() => {
        dispatch(getMovieImagesTC(parseInt(params.id)))
    }, [])

    useEffect(() => {
        dispatch(getSimilarMoviesTC(parseInt(params.id)))
    }, [])

    if (initialized) {
        return <Preloader/>
    }
    return (
        <>
            {
                movie
                && <div className={style.container}>
                    <div className={style.photo}>
                        <img
                            src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noPoster}`}
                            alt=""/>
                    </div>
                    <div className={style.column2}>

                        <div className={style.title}>
                            {movie.title}

                        </div>
                        <div className={style.descriptions}>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Rating:</div>
                                <div className={style.descriptionContent}>{movie.vote_average}</div>
                            </div>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Release date:</div>
                                <div className={style.descriptionContent}>{movie.release_date}</div>
                            </div>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Original language:</div>
                                <div className={style.descriptionContent}>{movie.original_language}</div>
                            </div>

                        </div>
                        <div className={style.overview}>
                            {movie.overview}
                        </div>
                        <div className={style.watch}>
                            <button className={style.watchButton}>
                                WATCH
                            </button>
                        </div>
                        {images
                        &&
                        <div className={style.images}>
                            {images.map(e => {
                                return <div className={style.image}><img alt=''
                                                                         src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}/>
                                </div>
                            }).slice(0, 3)}

                        </div>}
                        {
                            images.length > 3
                            &&
                            <NavLink to={`/${params.id}/gallery`} className={style.allGallery}>
                                To all images
                            </NavLink>
                        }
                    </div>

                </div>

            }
            {
                similarMovies.length
                &&
                <div>
                    <SimilarMovies similarMovies={similarMovies}/>
                </div>
            }
        </>
    )

}

export default MovieCard;