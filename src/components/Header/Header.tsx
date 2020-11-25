import React, {useState} from 'react';
import style from './Header.module.css'
import logo from '../../assets/logo2.png'

import Search from "../../Search/Search";
import filter from '../../assets/filter.png'
import Filter from "../Filter/Filter";
import {ModalWithChildren} from "../common/Modal/Modal";
import {useDispatch} from "react-redux";
import {getTopMoviesTC, setFilteredId} from "../../store/movies-reducer";
import {NavLink} from "react-router-dom";


const Header = () => {
    const dispatch = useDispatch()
    const [isFilter, setIsFilter] = useState(false)
    const toHome = () => {
        dispatch(getTopMoviesTC(1))
        dispatch(setFilteredId([]))


    }

    const closeModal = () => {
        setIsFilter(false)
    }
    const openModal = () => {
        setIsFilter(!isFilter)
    }


    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <NavLink to={'/'}>
                    <div className={style.logo} onClick={toHome}>
                        <img src={logo} alt=""/>
                    </div>
                </NavLink>


                <div className={style.search}>
                    <button className={style.filter} onClick={openModal}>
                        <img src={filter} alt=""/>
                    </button>

                    <ModalWithChildren modalActive={isFilter} setModalActive={setIsFilter} onCancel={closeModal}>
                        <Filter closeModal={closeModal}/>
                    </ModalWithChildren>


                    <Search/>
                </div>

            </div>
        </div>
    )
        ;
};

export default Header;