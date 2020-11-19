import React from 'react';
import style from './Header.module.css'
import logo from '../../assets/logo2.png'
import Navbar from "../Navbar/Navbar";
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
        <div className={style.container}>
            {/*logo*/}
            <div className={style.wrapper}>
                <NavLink to={'/home'}>
                    <div className={style.logo}>
                        <img src={logo} alt=""/>
                    </div>
                </NavLink>

                <Navbar/>
            </div>

        </div>
    );
};

export default Header;