import React from 'react';
import style from './Paginator.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {setNextPage, setPrevPage} from "../../store/topMovies-reducer";
import cn from 'classnames'

type PaginatorPropsType = {
    totalPage: number
    currentPage: number
    changePage: (page: number) => void
}
const Paginator = (props: PaginatorPropsType) => {
    const totalPageArray = Array.from(Array(props.totalPage).keys())

    const dispatch = useDispatch()
    const prevButtonClick = () => {
        if (props.currentPage > 1) {
            dispatch(setPrevPage(props.currentPage))
        }
    }
    const nextButtonClick = () => {
        if (props.currentPage < totalPageArray.length)
            dispatch(setNextPage(props.currentPage))
    }


    return (
        <>
            {!!totalPageArray.length
            && <div className={style.container}>

                <button onClick={prevButtonClick}>
                    &lt;
                </button>
                {totalPageArray.map((i, index) => {
                    console.log('eawas:', index)
                    return <div onClick={() => {
                        props.changePage(index + 1)
                    }}>
                        <div className={cn({
                            [style.selectedPage]: props.currentPage === index + 1
                        }, style.pageNumber)}>
                            {index + 1}
                        </div>
                    </div>
                })}
                <button onClick={nextButtonClick}>
                    &gt;
                </button>

            </div>}
        </>
    );
};

export default Paginator;