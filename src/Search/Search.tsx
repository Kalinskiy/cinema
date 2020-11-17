import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import style from './Search.module.css'
import {useDispatch, useSelector} from "react-redux";


const Search = React.memo(() => {
    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('')


    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
    }, [setSearchName])

    useEffect(() => {

    }, [])

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {


        }
    }
    return <div className={style.search}>
        <input onChange={onChangeInput}
               value={searchName}
               type="text"
               placeholder={'Search...'}
               onKeyPress={onKeyPressHandler}/>

    </div>
})

export default Search