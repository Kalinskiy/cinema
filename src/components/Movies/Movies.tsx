import React, {useEffect} from 'react';
import style from './Movies.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import Movie from "../common/MovieComponent/Movie";
import {getTopMoviesTC} from "../../store/movies-reducer";
import Paginator from "../Paginator/Paginator";
import {searchMovieTC, setCurrentPage} from "../../store/search-reducer";
import {useHistory, useParams} from "react-router-dom";


const Movies = () => {
    const dispatch = useDispatch()
    const history = useHistory()



    const movies = useSelector<AppStateType, Array<any>>(state => state.movies.movies)
    const totalPage = useSelector<AppStateType, number | null>(state => state.search.totalPages)
    let currentPage = useSelector<AppStateType, number>(state => state.search.currentPage)
    const searchMovies = useSelector<AppStateType, Array<any>>(state => state.search.search)
    const searchName = useSelector<AppStateType, string>(state => state.search.searchName)



    useEffect(() => {
        dispatch(getTopMoviesTC(currentPage))
        // dispatch(searchMovieTC(searchName, 1))
    }, [currentPage])

    useEffect(() => {
        history.push({
            pathname: `/`,
            search: `?name=${searchName}&page=${currentPage}`
        })
    }, [searchName,currentPage])
    return (
        <div className={style.container}>
            {movies &&
            <Paginator currentPage={currentPage ? currentPage : 0} totalPage={totalPage ? totalPage : 0}
                       pagePortion={10}
                       changePage={(page) => {

                           dispatch(setCurrentPage( page))
                           // dispatch(searchMovieTC(searchName, page))
                       }
                       }/>}

            {
                movies.map(e =>
                    <Movie key={e.id}
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