import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {GenreType} from "../../../api/api";
import style from './MovieCard.module.css'
import noPoster from '../../../assets/noposter.png'
import {
    getMovieImagesTC,
    getMovieTC,
    getSimilarMoviesTC,
    MovieInitialStateType,
    setIsData
} from "../../../store/movies-reducer";
import SimilarMovies from '../SimilarMovies/SimilarMovies';
import Grid from '@material-ui/core/Grid/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Card, Theme} from "@material-ui/core";
import Button from '@material-ui/core/Button/Button';
import Typography from "@material-ui/core/Typography";
import blueGrey from "@material-ui/core/colors/blueGrey";
import HeaderPreloader from "../Preloader/HeaderPreloader";


const MovieCard = () => {

    const darkMode = useSelector<AppStateType, boolean>(state => state.app.darkMode)
    const isData = useSelector<AppStateType, boolean>(state => state.movies.isData)
    const useStyles = makeStyles((theme: Theme) => ({

        container: {
            margin: '0 auto',
            width: '60%',
            paddingTop: 15


        },
        card: {
            display: 'flex',
            backgroundColor: darkMode ? theme.palette.primary.dark : theme.palette.secondary.light

        },
        image: {
            width: '250px',
            height: '400px',

        },
        column2: {
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 30px 30px 30px'
        },
        descriptionsItem: {
            display: 'flex',
            borderBottom: '1px solid rgba(147, 130, 130, 0.1)',
            padding: '10px 0',
        },
        descriptionTitle: {
            width: '180px'
        },
        allImages: {
            display: 'flex',
            flexDirection: 'row',
            margin: '10px 10px 5px 0',
        },
        eachImage: {
            width: '200px',
            marginRight: '10px'
        },
        link: {
            textAlign: 'center',
            color: darkMode ? '#fff' : "#000000",
            textDecoration: 'none',

        },
        button: {
            width: '150px',
            margin: '20px 0',
            textDecoration: 'none',
            backgroundColor: darkMode ? blueGrey[800] : theme.palette.primary.main
        }
    }))


    const classes = useStyles();
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()

    const {
        images, similarMovies, overview, title,
        budget, movieGenre, runtime, picture, rating, language, releaseDate
    } = useSelector<AppStateType, MovieInitialStateType>(state => state.movies)


    useEffect(() => {


        dispatch(getSimilarMoviesTC(parseInt(params.id)))
        dispatch(getMovieTC(parseInt(params.id)))
        dispatch(getMovieImagesTC(parseInt(params.id)))
        

        return () => {
            dispatch(setIsData(false))
        }


    }, [params.id])


    if (!isData) {
        return <HeaderPreloader/>
    }

    return (
        <>
            {isData && <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >

                    <Card className={classes.card}>
                        <img
                            src={`${picture ? `https://image.tmdb.org/t/p/w500/${picture}` : noPoster}`}
                            alt="" className={classes.image}/>
                        <div className={classes.column2}>

                            <Typography variant="h4" align='center' style={{padding: 10}}>
                                {title}
                            </Typography>
                            <div className={style.descriptions}>
                                <Typography className={classes.descriptionsItem}>
                                    <div className={classes.descriptionTitle}> Rating:</div>
                                    {rating}
                                </Typography>
                                <Typography className={classes.descriptionsItem}>
                                    <div className={classes.descriptionTitle}>Release date:</div>
                                    {releaseDate}
                                </Typography>
                                {
                                    !!runtime &&
                                    <Typography className={classes.descriptionsItem}>
                                        <div className={classes.descriptionTitle}>Runtime:</div>
                                        {runtime}
                                    </Typography>
                                }

                                <Typography className={classes.descriptionsItem}>
                                    <div className={classes.descriptionTitle}>Original language:</div>
                                    <div style={{textTransform: 'uppercase'}}>{language}</div>
                                </Typography>
                                {
                                    !!budget &&
                                    <Typography className={classes.descriptionsItem}>
                                        <div className={classes.descriptionTitle}>Budget:</div>
                                        {budget}
                                    </Typography>
                                }

                                {
                                    !!movieGenre.length &&
                                    <Typography className={classes.descriptionsItem}>
                                        <div className={classes.descriptionTitle}>Genre:</div>
                                        {movieGenre.map((g: GenreType) => g.name).join(', ')}
                                    </Typography>
                                }
                                <Typography className={classes.descriptionsItem}>
                                    {overview}
                                </Typography>
                            </div>


                            <Button color='primary' variant={"contained"} className={classes.button}>
                                WATCH
                            </Button>

                            {images
                            &&
                            <div className={classes.allImages}>
                                {images.map(e => {
                                    return <div><img alt='' src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
                                                     className={classes.eachImage}/>
                                    </div>
                                }).slice(0, 4)}

                            </div>}
                            {
                                images.length > 3
                                &&
                                <NavLink to={`/${params.id}/gallery`} className={classes.link}>
                                    <span>To all images</span>
                                </NavLink>
                            }
                        </div>
                    </Card>

                </Grid>
                <Grid>

                    {
                        !!similarMovies.length
                        &&
                        <div>
                            <SimilarMovies similarMovies={similarMovies}/>
                        </div>
                    }
                </Grid>
            </div>}
        </>
    )

}

export default MovieCard;