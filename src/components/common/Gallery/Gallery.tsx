import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/store";
import {MovieImagesArrayResponseType} from "../../../api/api";
import {getMovieImagesTC} from "../../../store/movies-reducer";
import {useParams} from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';

const useStyles = makeStyles({

    container: {
        margin: '0 auto',
        width: '80%',
        padding: '20px 0'
    },
    wrapper:{
        display:'flex',
        justifyContent:'center',
        alignItem:'center'
    },
    card: {
        display: 'flex'
    },
    button: {
        width: 150,
        margin: '20px auto',
        display: 'block'
    },
    image: {
        minWidth: 300,
        maxWidth: 300
    }

})
const Gallery = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const images = useSelector<AppStateType, Array<MovieImagesArrayResponseType>>(state => state.movies.images)
    useEffect(() => {
        dispatch(getMovieImagesTC(parseInt(params.id)))
    }, [])
    if (!initialized) {
        return <Preloader/>
    }
    return (

        <Grid

            className={classes.container}>
            {images.length
            &&
            <Grid container
                className={classes.wrapper}
            >
                {images.map(e => {

                    return <Grid item xs={12} sm={8} md={4} lg={3} xl={3}>

                        <img className={classes.image}
                             src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}/>

                    </Grid>
                })}

            </Grid>
            }
            <div>
                <Link href={`/movie/${params.id}`} style={{textDecoration: 'none'}}>
                    <Button color='primary' variant={"contained"} className={classes.button}>
                        BACK
                    </Button>
                </Link>
            </div>
        </Grid>
    );
};

export default Gallery;