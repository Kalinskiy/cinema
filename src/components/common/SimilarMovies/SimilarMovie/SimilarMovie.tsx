import React from 'react';
import noPoster from "../../../../assets/noposter.png";
import {useDispatch} from "react-redux";
import {getMovieTC} from "../../../../store/movies-reducer";
import Link from '@material-ui/core/Link';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea';

const useStyles = makeStyles({
    root: {

        marginBottom: 20


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
        textAlign: 'center'


    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column'
    }
});

type SimilarMoviePropsType = {
    title: string
    image: string
    id: number
}

const SimilarMovie = (props: SimilarMoviePropsType) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const getMovie = () => {
        dispatch(getMovieTC(props.id))
    }

    return (
        // <Card className={classes.root}>
        //     < div onClick={getMovie}>
        //         <Link href={`/movie/${props.id}`}>
        //             <div className={classes.content}>
        //                 <Typography className={classes.title}>
        //                     {props.title}
        //                 </Typography>
        //                 <img className={classes.image}
        //                      src={`${props.image ? `https://image.tmdb.org/t/p/w500/${props.image}` : noPoster}`}
        //                      alt=""/>
        //             </div>
        //         </Link>
        //     </div>
        // </Card>
        <Card className={classes.root}>
            <CardActionArea >
                <Link style={{textDecoration:'none'}} href={`/movie/${props.id}` }>
                    <CardMedia style={{height: '300px'}}
                               image={`${props.image ? `https://image.tmdb.org/t/p/w500/${props.image}` : noPoster}`}>
                    </CardMedia>
                    <CardContent>
                        <Typography className={classes.title} >
                            {props.title}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    );
};

export default SimilarMovie;