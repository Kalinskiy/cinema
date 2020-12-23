import React, {useEffect, useState} from 'react';
import Search from "../../Search/Search";
import Filter from "../Filter/Filter";
import {ModalWithChildren} from "../common/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {getTopMoviesTC, setFilteredId} from "../../store/movies-reducer";
import {NavLink} from "react-router-dom";
import {AppBar, IconButton} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade} from '@material-ui/core/styles/colorManipulator';
import MovieCreationOutlinedIcon from '@material-ui/icons/MovieCreationOutlined';
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import {isSetDarkMode, login, logout} from "../../store/app-reducer";
import googleIcon from '../../assets/google.png'
import {AppStateType} from "../../store/store";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
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
    toolBar: {},
    switch: {
        display: 'flex',
        justifyContent: 'flex-end',

    }
}));
type PropsType = {
    darkMode: boolean
}
const Header = (props: PropsType) => {
    debugger
    const dispatch = useDispatch()
    const classes = useStyles();
    const [isFilter, setIsFilter] = useState(false)
    const user = useSelector<AppStateType, any>(state => state.app.user)



    const handleChangeMode = () => {
        dispatch(isSetDarkMode(!props.darkMode))
        localStorage.setItem('darkMode', String(!props.darkMode));
    }


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

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }



    return (
        <div className={classes.grow}>
            <AppBar position={'static'} color={"primary"}>
                <Toolbar>
                    <NavLink to={'/'} style={{textDecoration: 'none'}}>
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

                    <div className={classes.grow}/>

                    <Search/>


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

                    <div className={classes.grow}/>

                    <span>Dark Mode:</span><Switch checked={props.darkMode}
                                                   onChange={handleChangeMode}/>
                    {
                        user ? <div>
                                <img
                                    style={{width: 30, borderRadius: '50%', cursor: 'pointer'}}
                                    role='button'
                                    alt='avatar'
                                    src={user.photoURL}
                                    height='100%'
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                />
                                <Menu
                                    style={{top: '45px'}}
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem component={NavLink} to={`/favorites`}
                                              onClick={handleClose}>Favorites</MenuItem>
                                    <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                                </Menu>
                            </div>
                            : <img
                                onClick={() => dispatch(login())}
                                src={googleIcon}
                                alt="Log in with Google"
                                style={{marginLeft: '30px', width: 25, cursor: 'pointer'}}
                            />
                    }


                </Toolbar>

            </AppBar>

        </div>
    )

}

export default Header;