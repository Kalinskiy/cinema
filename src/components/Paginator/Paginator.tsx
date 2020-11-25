import React from 'react';
import style from './Paginator.module.css'
import {useDispatch} from "react-redux";
import cn from 'classnames'
import {setCurrentPage, setNextPage, setPrevPage} from "../../store/movies-reducer";


type PaginatorPropsType = {
    totalPage: number
    currentPage: number
    changePage: (page: number) => void
    pagePortion: number
}
const Paginator = ({pagePortion = 10, ...props}: PaginatorPropsType) => {
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

    const showMaxPages = props.currentPage + pagePortion

    return (
        <>
            {!!totalPageArray.length
            && <div className={style.container}>
                {props.currentPage > pagePortion
                &&
                <button onClick={() => dispatch(setCurrentPage(1))}>
                    &lt; &lt;
                </button>
                }
                <button onClick={prevButtonClick}>
                    &lt;
                </button>

                <div className={style.pages}>
                {totalPageArray.map((i, index) => {
                    if (index + 1 < showMaxPages - pagePortion || index + 1 > showMaxPages) return null
                    // if(props.currentPage + pagePortion < props.totalPage)
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
                </div>
                <button onClick={nextButtonClick}>
                    &gt;
                </button>
                {(props.totalPage / pagePortion) >1
                &&
                <button onClick={() => dispatch(setCurrentPage(props.totalPage))}>
                    &gt;  &gt;
                </button>
                }

            </div>}
        </>
    );
};

export default Paginator;