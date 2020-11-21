import React from 'react';
import style from './Header.module.css'
import logo from '../../assets/logo2.png'

import {NavLink} from 'react-router-dom';
import Search from "../../Search/Search";
import {getTopMoviesTC} from "../../store/movies-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";

const Header = () => {
    const dispatch = useDispatch()
    let page = useSelector<AppStateType, number>(state => state.search.currentPage)


    return (
        <div className={style.container}>
            <div className={style.wrapper}>

                <div className={style.logo} onClick={() => dispatch(getTopMoviesTC(1))}>
                    <img src={logo} alt=""/>
                </div>

                <div className={style.search}>
                    <Search/>
                </div>

            </div>
        </div>
    )
        ;
};

export default Header;