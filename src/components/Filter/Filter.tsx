import React from "react";
import style from "./Filter.module.css"
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {GenreType} from "../../api/api";
import {setFilterTC} from "../../store/movies-reducer";
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

type FilterPropsType = {
    closeModal: () => void
}


const Filter = (props: FilterPropsType) => {
    const page = useSelector<AppStateType, number>(state => state.movies.currentPage)
    const genres = useSelector<AppStateType, Array<GenreType>>(state => state.movies.genres)


    const dispatch = useDispatch()


    const formik = useFormik({
        validate: (values) => {
        },
        initialValues: {},
        onSubmit: (values: any) => {
            debugger
            let ids = values.with_genres.join(',')


            dispatch(setFilterTC(page, ids))


            props.closeModal()
        }

    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={style.container}>
                <Grid container
                      direction="row"
                      alignItems="center"
                      spacing={1}

                >
                    {genres.map(g => {
                        return <Grid item key={g.id}>
                            <FormControlLabel style={{color: '#000000', minWidth:200}} key={g.id} className={style.item}
                                              label={g['name']}

                                              control={
                                                  <Checkbox onChange={formik.handleChange} name='with_genres'
                                                            value={g['id']}/>
                                              }

                            />
                        </Grid>


                    })}
                </Grid>

                <div style={{width: '100%', padding: 10}}>
                    <Button variant={"contained"} color={"primary"} type="submit">Submit</Button>
                    <Button type="reset" color={"secondary"} onClick={props.closeModal}>Cancel</Button>
                </div>

            </div>
        </form>
    )
}
export default Filter