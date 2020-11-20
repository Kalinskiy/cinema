import React from 'react';
import style from './Header.module.css'
import logo from '../../assets/logo2.png'

import {NavLink} from 'react-router-dom';
import Search from "../../Search/Search";

const Header = () => {


    return (
        <div className={style.container}>


            <div className={style.logo}>
                <NavLink to={'/'}>
                    <img src={logo} alt=""/>
                </NavLink>

            </div>
            <div>
                <Search/>
            </div>


        </div>
    )
        ;
};

export default Header;