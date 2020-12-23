import React from 'react';
import preloaderLight from '../../../assets/preloader.svg'
import style from './Preloader.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";

const Preloader = () => {

    const darkMode = useSelector<AppStateType, boolean>(state => state.app.darkMode)
    return (
        <div className={style.container}>
            <img src={preloaderLight} alt=""/>
        </div>
    );
};

export default Preloader;