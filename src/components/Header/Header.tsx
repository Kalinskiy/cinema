import React, {useState} from 'react';
import Search from "../../Search/Search";
import Filter from "../Filter/Filter";
import {ModalWithChildren} from "../common/Modal/Modal";
import {useDispatch} from "react-redux";
import {getTopMoviesTC, setFilteredId} from "../../store/movies-reducer";
import {NavLink} from "react-router-dom";
import {AppBar, IconButton} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade} from '@material-ui/core/styles/colorManipulator';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    movieIcon: {
        marginRight: theme.spacing(2),
        color: 'white'
    },
    title: {
        color: 'white',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const Header = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [isFilter, setIsFilter] = useState(false)
    const toHome = () => {
        dispatch(getTopMoviesTC(1))
        dispatch(setFilteredId([]))
    }

    const closeModal = () => {
        setIsFilter(false)
    }
    const openModal = () => {
        setIsFilter(!isFilter)
    }

    return (
        <div className={classes.grow}>
        <AppBar position={"fixed"} color={"primary"}>
            <Toolbar>
                <NavLink to={'/'} style={{textDecoration:'none'}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                    >
                        <MovieCreationOutlinedIcon className={classes.movieIcon}/>
                        <Typography className={classes.title} variant="h6" noWrap>
                            MovieLand
                        </Typography>
                    </IconButton>
                </NavLink>





                <Search/>
                {/*</div>*/}
                <Button

                    onClick={openModal}
                    color="secondary"
                    variant="contained"
                    size={'small'}
                >
                    set
                </Button>

                <ModalWithChildren modalActive={isFilter} setModalActive={setIsFilter} onCancel={closeModal}>
                    <Filter closeModal={closeModal}/>
                </ModalWithChildren>

            </Toolbar>
        </AppBar>
        </div>
    )

}

export default Header;