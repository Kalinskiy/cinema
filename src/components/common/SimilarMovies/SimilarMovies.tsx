import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import {MovieResponseType} from "../../../api/api";
import SimilarMovie from "./SimilarMovie/SimilarMovie";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    title: {
        width:'100%',
        textAlign:'center',
        textTransform:'uppercase',
        padding:'10px 0',
        backgroundColor:'#F50057',
        color:'#ffffff',
        borderBottomRightRadius: '5px',
        borderBottomLeftRadius: '5px',


    }
});
type SimilarMoviesPropsType = {
    similarMovies: Array<MovieResponseType>
}

const SimilarMovies = (props: SimilarMoviesPropsType) => {
    const classes = useStyles();


    return (

        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{width: '60%', margin: '0 auto'}}
            spacing={2}


        >
            <Typography variant={"h5"} className={classes.title}>You might also like:</Typography>


            {
                props.similarMovies.map(item => {
                    return <Grid item xs={12} sm={6} md={3} lg={2} xl={2} >
                        <SimilarMovie
                            title={item.title}
                            image={item.poster_path}
                            id={item.id}
                        />
                    </Grid>
                })
            }

        </Grid>

    );
};

export default SimilarMovies;