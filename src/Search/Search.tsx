import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import style from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {searchMovieTC, setSearchName} from "../store/topMovies-reducer";
import {AppStateType} from "../store/store";
import Paginator from "../components/Paginator/Paginator";


const Search = React.memo(() => {
    const dispatch = useDispatch()

    const searchName = useSelector<AppStateType, string>(state => state.movies.searchName)
    const totalPage = useSelector<AppStateType, number | null>(state => state.movies.totalPages)
    let page = useSelector<AppStateType, number | null>(state => state.movies.currentPage)

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        dispatch(setSearchName(e.currentTarget.value))
    }, [searchName])

    useEffect(() => {

    }, [])
    const searchMovie = () => {
        if (searchName) {
            dispatch(searchMovieTC(searchName, page = 1))

        }
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(searchMovieTC(searchName, page = 1))

        }
    }

    return <div className={style.search}>
        <input onChange={onChangeInput}
               value={searchName}
               type="text"
               placeholder={'Search...'}
               onKeyPress={onKeyPressHandler}/>
        <button onClick={searchMovie}>Search</button>


    </div>
})

export default Search