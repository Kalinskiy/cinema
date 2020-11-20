import React from 'react';
import preloader from '../../../assets/preloader.svg'
import style from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={style.container}>
            <img src={preloader} alt=""/>
        </div>
    );
};

export default Preloader;