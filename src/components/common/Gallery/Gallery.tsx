import React, {useEffect} from 'react';
import style from './Gallery.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {MovieImagesArrayResponseType} from "../../../api/api";
import {getMovieImagesTC} from "../../../store/movies-reducer";
import {NavLink, useParams} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const Gallery = () => {
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()
    const initialized = useSelector<AppStateType, boolean>(state => state.movies.initialized)
    const images = useSelector<AppStateType, Array<MovieImagesArrayResponseType>>(state => state.movies.images)
    useEffect(() => {
        dispatch(getMovieImagesTC(parseInt(params.id)))
    }, [])
    if (initialized) {
        return <Preloader/>
    }
    return (
        <div className={style.container}>
            {images.length
            &&
            <div className={style.images}>
                {images.map(e => {

                    return <div className={style.image}><img src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}/>
                    </div>
                })}

            </div>
            }
            <div className={style.back}>
                <NavLink to={`/movie/${params.id}`}>
                    <button>
                        BACK
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default Gallery;