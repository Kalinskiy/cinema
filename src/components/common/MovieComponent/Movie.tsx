import React, {useEffect} from 'react';
import noPoster from '../../../assets/noposter.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setIsData, getMovieTC} from "../../../store/movies-reducer";
import {AppStateType} from "../../../store/store";
import Card from '@material-ui/core/Card/Card';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CardActionArea} from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent/CardContent';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import createStyles from '@material-ui/styles/createStyles/createStyles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import {addMovieToFavorite, removeMovieFromFavorite} from '../../../store/app-reducer';


type PropsType = {
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
    id: number
    movie: any


}
const Movie = (props: PropsType) => {

    const darkMode = useSelector<AppStateType, boolean>(state => state.app.darkMode)
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({

            root: {
                maxWidth: 350,
                overflow: 'visible',
                backgroundColor: darkMode ? theme.palette.primary.dark : theme.palette.secondary.light
            },
            buttons: {
                justifyContent: 'space-around'
            },
            title: {
                maxHeight: '35px',
                minHeight: '35px',
                textAlign: 'center',
                overflow: 'hidden'
            },
            overview: {
                maxHeight: '100px',
                minHeight: '100px',
            },
            vote: {
                backgroundColor: darkMode ? theme.palette.primary.dark : theme.palette.primary.light,
                width: 40,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                position: 'absolute',
                top: 20,
                left: -5,
                borderRadius: 3


            }

        }),
    );
    const dispatch = useDispatch()
    const classes = useStyles();
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const user = useSelector<AppStateType, {}>(state => state.app.user)
    const favoritesMoviesData = useSelector<AppStateType, any>(state => state.app.favoriteMovies)



    const getMovie = () => {
        dispatch(getMovieTC(props.id))
    }

    const addMovieToFavoriteHandler = (movie: any) => {
        dispatch(addMovieToFavorite(movie))
    }

    const removeMovieFromFavoriteHandler = (movie: any) => {
        dispatch(removeMovieFromFavorite(movie))
    }

    return (
        <>
            <Card
                className={classes.root}
                onClick={getMovie}


            >
                <NavLink to={`/movie/${props.id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="375"
                            width="250"
                            image={`${props.poster_path ? `https://image.tmdb.org/t/p/w500/${props.poster_path}` : noPoster}`}
                            title={props.title}

                        />
                        <div className={classes.vote}>{props.vote_average} </div>
                    </CardActionArea>
                </NavLink>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>

                        {props.title.length > 25 ? `${props.title.slice(0, 20) + '...'}` : props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.overview}>
                        {props.overview.length > 200 ? `${props.overview.slice(0, 200) + '...'}` : props.overview}
                    </Typography>
                </CardContent>

                <CardActions className={classes.buttons}>
                    {
                        user !== null
                            ? favoritesMoviesData[props.id]
                            ? <>
                                <Button onClick={() => {
                                    removeMovieFromFavoriteHandler(props.movie)
                                }} size="medium" color="primary" variant={"contained"}>
                                    Remove from Favorites
                                </Button>
                                <NavLink to={`/movie/${props.id}`}>
                                    <Button color={'secondary'} variant={"contained"}>
                                        WATCH
                                    </Button>
                                </NavLink>
                            </>

                            : <><Button onClick={() => {
                                addMovieToFavoriteHandler(props.movie)
                            }} size="medium" color="primary" variant={"contained"}>
                                Add to Favorites
                            </Button>
                                <NavLink to={`/movie/${props.id}`}>
                                    <Button color={'secondary'} variant={"contained"}>
                                        WATCH
                                    </Button>
                                </NavLink>
                            </>


                            : <Button disabled size="medium" color="secondary" variant={"contained"}>
                                Add to Favorites
                            </Button>
                    }


                </CardActions>


            </Card>
        </>
    );
};

export default Movie;