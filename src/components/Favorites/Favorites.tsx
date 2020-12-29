import {useDispatch, useSelector} from "react-redux";
import {getFavoritesMovies} from "../../store/app-reducer";
import {useEffect} from "react";
import {AppStateType} from "../../store/store";

import React from "react";
import Movie from "../common/MovieComponent/Movie";
import Grid from "@material-ui/core/Grid/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";


export const Favorites = () => {
    const useStyles = makeStyles({
        container: {
            margin: '0 auto !important',
            maxWidth: '100%',
            padding:'12px'

        },
    });
    const classes = useStyles();

    const dispatch = useDispatch()
    const favoritesMoviesData = useSelector<AppStateType, any>(state => state.app.favoriteMovies)

    const favoriteMoviesArray = Object.values(favoritesMoviesData)
    console.log(favoriteMoviesArray)


    useEffect(() => {
        dispatch(getFavoritesMovies())
    }, [])
    return (<>
        <Grid
            className={classes.container}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
        >
            {

                favoriteMoviesArray.map((movie: any) => {

                    return <Grid item>

                        <Movie
                            vote_average={movie.vote_average}
                            title={movie.title}
                            id={movie.id}
                            movie={movie}
                            overview={movie.overview}
                            poster_path={movie.poster_path}
                            release_date={movie.releaseDate}

                        />
                    </Grid>
                })
            }
        </Grid>
    </>)


}