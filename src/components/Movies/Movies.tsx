import React, {ChangeEvent, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import Movie from "../common/MovieComponent/Movie";
import {getTopMoviesTC, searchMovieTC, setCurrentPage, setFilterTC} from "../../store/movies-reducer";
import {useHistory} from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import {Grid} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {MovieResponseType} from "../../api/api";

const useStyles = makeStyles({
    container:{
        margin:'0 auto !important',
        maxWidth:'100%',

    },
    pagination:{
        padding:'20px 0'
    }
});
const Movies = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()


    const movies = useSelector<AppStateType, Array<MovieResponseType>>(state => state.movies.movies)
    const totalPage = useSelector<AppStateType, number | null>(state => state.movies.totalPages)
    let currentPage = useSelector<AppStateType, number>(state => state.movies.currentPage)
    const searchName = useSelector<AppStateType, string>(state => state.movies.searchName)
    const filteredGenres = useSelector<AppStateType, Array<string>>(state => state.movies.filteredGenres)


    const onChangePage = (event: ChangeEvent<unknown>, currentPage: number) => {
        dispatch(setCurrentPage(currentPage))
    }

    useEffect(() => {
        if (searchName.length) {
            dispatch(searchMovieTC(searchName, currentPage))
        } else if (filteredGenres.length) {
            dispatch(setFilterTC(currentPage, String(filteredGenres)))
        } else {
            dispatch(getTopMoviesTC(currentPage))
        }

    }, [currentPage])

    useEffect(() => {
        history.push({
            pathname: `/`,
            search: `?name=${searchName}&page=${currentPage}`
        })
    }, [searchName, currentPage])

    return (

        <Grid
            className={classes.container}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}

        >
            {

                movies.map(e =>
                    <Grid item>
                    <Movie
                        key={e.id}
                        release_date={e.release_date}
                        title={e.original_title}
                        overview={e.overview}
                        poster_path={e.poster_path}
                        vote_average={e.vote_average}
                        id={e.id}

                    />
                    </Grid>
                )

            }

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.pagination}
            >
                {movies && !!totalPage &&
                <Pagination
                    color={'secondary'}
                    page={currentPage ? currentPage : 0}
                    count={totalPage ? totalPage : 0}
                    siblingCount={2}
                    onChange={onChangePage}
                    showLastButton
                    showFirstButton
                    size={"large"}

                />
                }
                {movies && !totalPage?<div>We could not find movie with such name</div>:null}
            </Grid>

        </Grid>

    );
};

export default Movies;