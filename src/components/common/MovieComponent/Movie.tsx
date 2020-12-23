import React from 'react';
import noPoster from '../../../assets/noposter.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addMovieFav, getMovieTC} from "../../../store/movies-reducer";
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
import createStyles from '@material-ui/styles/createStyles/createStyles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';


type PropsType = {
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
    id: number


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


    const classes = useStyles();


    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)
    const user = useSelector<AppStateType, { }>(state => state.app.user)
    const dispatch = useDispatch()


    const getMovie = () => {
        dispatch(getMovieTC(props.id))
    }
    if (!initialized) {
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

                <NavLink to={`/movie/${props.id}`} style={{textDecoration: 'none'}}>
                    <Button size="medium" color="primary" variant={"contained"}>
                        WATCH
                    </Button>
                </NavLink>
                <NavLink to={'/'} style={{textDecoration: 'none'}}>
                    <Button size="medium" color="secondary" variant={"contained"} disabled={!user} onClick={()=>dispatch(addMovieFav)}>
                        ADD TO FAVORITES
                    </Button>
                </NavLink>

            </CardActions>


        </Card>
    );
};

export default Movie;