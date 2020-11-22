import React from 'react';
import style from './Header.module.css'
import logo from '../../assets/logo2.png'

import Search from "../../Search/Search";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {NavLink} from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch()
    let page = useSelector<AppStateType, number>(state => state.search.currentPage)


    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <NavLink to={'/'}>
                <div className={style.logo}>
                    <img src={logo} alt=""/>
                </div>
                </NavLink>

                <div className={style.search}>
                    <Search/>
                </div>

            </div>
        </div>
    )
        ;
};

export default Header;