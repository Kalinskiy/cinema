import React, {useEffect} from 'react';
import style from './Movies.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import Movie from "../common/MovieComponent/Movie";
import {getTopMoviesTC, searchMovieTC, setCurrentPage, setFilterTC} from "../../store/movies-reducer";
import Paginator from "../Paginator/Paginator";
import {useHistory} from "react-router-dom";


const Movies = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    const movies = useSelector<AppStateType, Array<any>>(state => state.movies.movies)
    const totalPage = useSelector<AppStateType, number | null>(state => state.movies.totalPages)
    let currentPage = useSelector<AppStateType, number>(state => state.movies.currentPage)
    const searchName = useSelector<AppStateType, string>(state => state.movies.searchName)
    const filteredGenres = useSelector<AppStateType, Array<string>>(state => state.movies.filteredGenres)


    useEffect(() => {
        if (searchName.length) {
            dispatch(searchMovieTC(searchName, currentPage))
        } else if (filteredGenres.length) {
            dispatch(setFilterTC(currentPage, String(filteredGenres)))
        } else {
            dispatch(getTopMoviesTC(currentPage))
        }

    }, [currentPage])

    useEffect(() => {
        history.push({
            pathname: `/`,
            search: `?name=${searchName}&page=${currentPage}`
        })
    }, [searchName, currentPage])
    return (
        <div className={style.container}>
            {movies &&
            <Paginator currentPage={currentPage ? currentPage : 0} totalPage={totalPage ? totalPage : 0}
                       pagePortion={10}
                       changePage={(page) => {

                           dispatch(setCurrentPage(page))
                       }
                       }/>}

            {
                movies.map(e =>
                    <Movie
                        key={e.id}
                        release_date={e.release_date}
                        title={e.original_title}
                        overview={e.overview}
                        poster_path={e.poster_path}
                        vote_average={e.vote_average}
                        id={e.id}
                    />)
            }


        </div>
    );
};

export default Movies;