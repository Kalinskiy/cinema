import React from 'react';
import preloaderLight from '../../../assets/preloader.svg'
import style from './Preloader.module.css'

const Preloader = () => {

    return (
        <div className={style.container}>
            <img src={preloaderLight} alt=""/>
        </div>
    );
};

export default Preloader;