import React from 'react';
import style from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={style.container}>
            <div className={style.links}>
                <NavLink to={'/home'}>Home</NavLink>
                <NavLink to={'/popular'}>Popular</NavLink>
                <NavLink to={'/rated'}>Rated</NavLink>
                <NavLink to={'/upcoming'}>Upcoming</NavLink>
            </div>

        </div>
    );
};

export default Navbar;