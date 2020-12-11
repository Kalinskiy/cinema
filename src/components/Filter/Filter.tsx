import React, {useEffect} from "react";
import style from "./Filter.module.css"
import {Field, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {GenreType} from "../../api/api";
import {setFilteredId, setFilterTC} from "../../store/movies-reducer";

type FilterPropsType = {
    closeModal: () => void
}


const Filter = (props: FilterPropsType) => {
    const page = useSelector<AppStateType, number>(state => state.movies.currentPage)
    const genres = useSelector<AppStateType, Array<GenreType>>(state => state.movies.genres)
    const filteredGenres = useSelector<AppStateType, any>(state => state.movies.filteredGenres)

    const dispatch = useDispatch()


    const formik = useFormik({
        validate: (values) => {
        },
        initialValues: {
            action:false
        },
        onSubmit: (values: any) => {
            const ids = genres.filter(g => values[g.name]).map(g => g.id).join(',')
            dispatch(setFilterTC(page, ids))
            dispatch(setFilteredId(ids))
            console.log(values)
            props.closeModal()
        }

    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={style.container}>
                {genres.map(g => {
                    return <div key={g.id} className={style.item}>
                        <label htmlFor={String(g.id)}>{g.name}</label>
                        <br/>
                        {/*<Field type={'checkbox'}*/}
                        {/*       {...formik.getFieldProps(g.name)}*/}
                        {/*/>*/}

                        <input type="checkbox" name='with_genres' value={g['id']} />

                        <br/>
                    </div>
                })}
                <button type="submit">Submit</button>
                <button type="reset" onClick={props.closeModal}>Cancel</button>

            </div>
        </form>
    )
}
export default Filter