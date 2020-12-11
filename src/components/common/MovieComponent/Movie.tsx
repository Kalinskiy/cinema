import React from 'react';
import noPoster from '../../../assets/noposter.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMovieTC} from "../../../store/movies-reducer";
import Preloader from "../Preloader/Preloader";
import {AppStateType} from "../../../store/store";
import Card from '@material-ui/core/Card/Card';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CardActionArea} from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent/CardContent';
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
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
    }
});

type TopMovieType = {
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
    id: number
}
const Movie = (props: TopMovieType) => {
    const classes = useStyles();
    const initialized = useSelector<AppStateType, boolean>(state => state.movies.initialized)
    const dispatch = useDispatch()


    const getMovie = () => {
        dispatch(getMovieTC(props.id))
    }
    if (initialized) {
        return <Preloader/>
    }


    return (
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

                <Link href={`/movie/${props.id}`}>
                    <Button size="medium" color="primary" variant={"contained"}>
                        WATCH
                    </Button>
                </Link>
                <Link style={{textDecoration:'none'}}>
                    <Button size="medium" color="secondary" variant={"contained"}>
                       ADD TO FAVORITES
                    </Button>
                </Link>

            </CardActions>


        </Card>
    );
};

export default Movie;