import React from 'react';
import noPoster from "../../../../assets/noposter.png";
import {useDispatch, useSelector} from "react-redux";
import {getMovieTC} from "../../../../store/movies-reducer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme, Typography} from "@material-ui/core";
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea';
import {NavLink} from 'react-router-dom';
import {AppStateType} from "../../../../store/store";


type SimilarMoviePropsType = {
    title: string
    image: string
    id: number
}

const SimilarMovie = (props: SimilarMoviePropsType) => {
    const darkMode = useSelector<AppStateType, boolean>(state => state.app.darkMode)

    const useStyles = makeStyles((theme:Theme)=>({
        root: {

            marginBottom: 20,
            backgroundColor: darkMode? theme.palette.primary.dark : theme.palette.secondary.light
        },
        image: {
            width: 150,
            minHeight: 225,
            maxHeight: 225,
            justifyContent: 'flex-end',
            flexDirection: 'column'
        },
        title: {
            minHeight: 25,
            maxHeight: 25,
            textAlign: 'center',
            color:darkMode? '#fff' :'#000000'


        },
        content: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column'
        }
    }))
    const classes = useStyles();
    const dispatch = useDispatch()

    const getMovie = () => {
        dispatch(getMovieTC(props.id))
    }

    return (

        <Card className={classes.root}>
            <CardActionArea >
                <NavLink style={{textDecoration:'none'}} to={`/movie/${props.id}` }>
                    <CardMedia style={{height: '300px'}}
                               image={`${props.image ? `https://image.tmdb.org/t/p/w500/${props.image}` : noPoster}`}>
                    </CardMedia>
                    <CardContent>
                        <Typography className={classes.title} >
                            {props.title}
                        </Typography>
                    </CardContent>
                </NavLink>
            </CardActionArea>
        </Card>
    );
};

export default SimilarMovie;