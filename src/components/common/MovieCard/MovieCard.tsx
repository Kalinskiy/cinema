import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {GenreType, MovieImagesArrayResponseType, MovieResponseType} from "../../../api/api";
import style from './MovieCard.module.css'
import noPoster from '../../../assets/noposter.png'
import {getMovieImagesTC, getMovieTC, getSimilarMoviesTC} from "../../../store/movies-reducer";
import Preloader from "../Preloader/Preloader";
import SimilarMovies from '../SimilarMovies/SimilarMovies';
import Grid from '@material-ui/core/Grid/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Card} from "@material-ui/core";
import Button from '@material-ui/core/Button/Button';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link/Link';

const useStyles = makeStyles(  {
    container: {
        margin: '0 auto',
        width: '60%'
    },
    card: {
        display: 'flex'
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
    link:{
        textAlign:'center'
    }
})


const MovieCard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()

    const images = useSelector<AppStateType, Array<MovieImagesArrayResponseType>>(state => state.movies.images)
    const similarMovies = useSelector<AppStateType, Array<any>>(state => state.movies.similarMovies)
    const initialized = useSelector<AppStateType, boolean>(state => state.movies.initialized)
    const overview = useSelector<AppStateType, string>(state => state.movies.overview)
    const title = useSelector<AppStateType, string>(state => state.movies.title)
    const budget = useSelector<AppStateType, number>(state => state.movies.budget)
    const movieGenre = useSelector<AppStateType, Array<GenreType>>(state => state.movies.movieGenre)
    const runtime = useSelector<AppStateType, number>(state => state.movies.runtime)
    const picture = useSelector<AppStateType, string>(state => state.movies.picture)
    const rating = useSelector<AppStateType, number>(state => state.movies.rating)
    const language = useSelector<AppStateType, number>(state => state.movies.language)
    const releaseDate = useSelector<AppStateType, string>(state => state.movies.releaseDate)


    useEffect(() => {
        dispatch(getMovieImagesTC(parseInt(params.id)))
    }, [params.id])

    useEffect(() => {
        dispatch(getSimilarMoviesTC(parseInt(params.id)))
    }, [params.id])

    useEffect(() => {
        dispatch(getMovieTC(parseInt(params.id)))
    }, [])


    if (initialized) {
        return <Preloader/>
    }
    return (
        <div>
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

                        <Typography variant="h4" align='center'>
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
                                    {movieGenre.map(g => g.name).join(', ')}
                                </Typography>
                            }
                            <Typography className={classes.descriptionsItem}>
                                {overview}
                            </Typography>
                        </div>


                        <Button color='secondary' variant={"contained"} style={{width: '150px', margin: '20px 0'}}>
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
                            <Link href={`/${params.id}/gallery`} className={classes.link}>
                                <span>To all images</span>
                            </Link>
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
        </div>
    )

}

export default MovieCard;