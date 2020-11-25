import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {GenreType, MovieImagesArrayResponseType, MovieResponseType} from "../../../api/api";
import style from './MovieCard.module.css'
import noPoster from '../../../assets/noposter.png'
import {getMovieImagesTC, getMovieTC, getSimilarMoviesTC} from "../../../store/movies-reducer";
import Preloader from "../Preloader/Preloader";
import SimilarMovies from '../SimilarMovies/SimilarMovies';


const MovieCard = () => {
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()
    const movieDetail = useSelector<AppStateType, Array<MovieResponseType>>(state => state.movies.movies)
    const images = useSelector<AppStateType, Array<MovieImagesArrayResponseType>>(state => state.movies.images)
    const similarMovies = useSelector<AppStateType, Array<any>>(state => state.movies.similarMovies)
    const initialized = useSelector<AppStateType, boolean>(state => state.movies.initialized)


    const overview = useSelector<AppStateType, string>(state => state.movies.overview)
    const title = useSelector<AppStateType, string>(state => state.movies.title)
    const movieId = useSelector<AppStateType, number>(state => state.movies.movieId)
    const budget = useSelector<AppStateType, number>(state => state.movies.budget)
    const movieGenre = useSelector<AppStateType, Array<GenreType>>(state => state.movies.movieGenre)
    const runtime = useSelector<AppStateType, number>(state => state.movies.runtime)
    const picture = useSelector<AppStateType, string>(state => state.movies.picture)
    const rating = useSelector<AppStateType, number>(state => state.movies.rating)
    const language = useSelector<AppStateType, number>(state => state.movies.language)
    const releaseDate = useSelector<AppStateType, string>(state => state.movies.releaseDate)




    useEffect(() => {
        dispatch(getMovieImagesTC(parseInt(params.id)))
    }, [])

    useEffect(() => {
        dispatch(getSimilarMoviesTC(parseInt(params.id)))
    }, [])
    useEffect(()=>{
        dispatch(getMovieTC(parseInt(params.id)))
    },[])



    if (initialized) {
        return <Preloader/>
    }
    return (
        <>

               <div className={style.container}>
                    <div className={style.photo}>
                        <img
                            src={`${picture ? `https://image.tmdb.org/t/p/w500/${picture}` : noPoster}`}
                            alt=""/>
                    </div>
                    <div className={style.column2}>

                        <div className={style.title}>
                            {title}
                        </div>
                        <div className={style.descriptions}>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Rating:</div>
                                <div className={style.descriptionContent}>{rating}</div>
                            </div>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Release date:</div>
                                <div className={style.descriptionContent}>{releaseDate}</div>
                            </div>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Runtime:</div>
                                <div className={style.descriptionContent}>{runtime}</div>
                            </div>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Original language:</div>
                                <div className={`${style.descriptionContent} ${style.language}`}>{language}</div>
                            </div>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Budget:</div>
                                <div className={style.descriptionContent}>{budget}</div>
                            </div>
                            <div className={style.descriptionsItem}>
                                <div className={style.descriptionTitle}>Genre:</div>
                                <div className={style.descriptionContent}>{movieGenre.map(g=>g.name).join(', ')}</div>

                            </div>

                        </div>
                        <div className={style.overview}>
                            {overview}
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