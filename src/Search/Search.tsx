import React, {ChangeEvent, useCallback, useEffect} from "react";
import style from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {searchMovieTC, setSearchName} from "../store/search-reducer";
import {getTopMoviesTC} from "../store/movies-reducer";


const Search = React.memo(() => {
    const dispatch = useDispatch()

    const searchName = useSelector<AppStateType, string>(state => state.search.searchName)
    let page = useSelector<AppStateType, number>(state => state.search.currentPage)

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        dispatch(setSearchName(e.currentTarget.value))
    }, [searchName])

    useEffect(() => {
        if (searchName) {
            dispatch(searchMovieTC(searchName, page = 1))
        }
    }, [searchName])


    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(searchMovieTC(searchName, page = 1))

        }
    }
    const clearSearch = () => {
        dispatch(getTopMoviesTC(page))
        dispatch(setSearchName(''))
    }

    return <div className={style.search}>
        <input onChange={onChangeInput}
               value={searchName}
               type="text"
               placeholder={'Search...'}
               onKeyPress={onKeyPressHandler}
        />
        {
            searchName && <div className={style.clearSearch}
                 onClick={clearSearch}>
                ✕
            </div>
        }




    </div>
})

export default Search