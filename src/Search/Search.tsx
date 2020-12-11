import React, {ChangeEvent, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTopMoviesTC, searchMovieTC, setSearchName} from "../store/movies-reducer";
import {AppStateType} from "../store/store";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
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
    clearSearch:{
        position: 'absolute',
        right: '-30px',
        color: '#ffffff',
        opacity: '0.5',
        cursor: 'pointer',
        top: '50%',
        left: '96%',
        transform: 'translate(-50%, -50%)'
    }
}));

const Search = React.memo(() => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const searchName = useSelector<AppStateType, string>(state => state.movies.searchName)
    let page = useSelector<AppStateType, number>(state => state.movies.currentPage)

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        dispatch(setSearchName(e.currentTarget.value))
    }, [searchName])

    useEffect(() => {
        if (searchName) {
            dispatch(searchMovieTC(searchName, page = 1))
        }
    }, [searchName])


    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(searchMovieTC(searchName, page = 1))

        }
    }
    const clearSearch = () => {
        dispatch(getTopMoviesTC(page))
        dispatch(setSearchName(''))
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>

            <InputBase
                onChange={onChangeInput}
                value={searchName}
                onKeyPress={onKeyPressHandler}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />

            {
                searchName && <div className={classes.clearSearch}
                                   onClick={clearSearch}>
                    ✕
                </div>
            }


        </div>
    )
})

export default Search