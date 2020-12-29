import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import {Route} from "react-router-dom";
import {getMoviesGenres, getTopMoviesTC, setIsData} from "./store/movies-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import Movies from "./components/Movies/Movies";
import MovieCard from "./components/common/MovieCard/MovieCard";
import Gallery from './components/common/Gallery/Gallery';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Paper} from "@material-ui/core";
import {lightBlue, pink} from "@material-ui/core/colors";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {verifyAuth} from "./store/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {Favorites} from "./components/Favorites/Favorites";
import HeaderPreloader from "./components/common/Preloader/HeaderPreloader";


function App() {
    const darkMode = useSelector<AppStateType, boolean>(state => state.app.darkMode)
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)


    const theme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                light: lightBlue[900],
                main: darkMode ? blueGrey[900] : lightBlue[900],
                dark: blueGrey[900]
            }, secondary: {
                light: '#fff',
                main: darkMode ? blueGrey[100] : pink["A700"],
                dark: blueGrey[200]
            }
        },

        overrides: {
            MuiPaper: {
                root: {
                    backgroundColor: darkMode ? blueGrey[800] : '#fff'
                }
            },
        }
    })


    let page = useSelector<AppStateType, number>(state => state.movies.currentPage)
    let isVerifying = useSelector<AppStateType, boolean>(state => state.app.isVerifying)
    const isData = useSelector<AppStateType, boolean>(state => state.movies.isData)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTopMoviesTC(page))


    }, [])
    useEffect(() => {
        dispatch(getMoviesGenres())
        dispatch(setIsData(true))

    }, [])
    useEffect(() => {
        dispatch(verifyAuth())

    }, [verifyAuth])


    return <>
        <ThemeProvider theme={theme}>
            {!isVerifying ? < Paper style={{minHeight: '100vh'}}>

                <Header darkMode={darkMode}/>
                {!isData?   <HeaderPreloader/>:null}


                <Route exact path='/' render={() => <Movies/>}/>
                <Route path='/movie/:id' render={() => <MovieCard/>}/>
                <Route path='/:id/gallery' render={() => <Gallery/>}/>
                <Route path='/favorites' render={() => <Favorites/>}/>


            </Paper> : <Preloader/>}
        </ThemeProvider>
    </>
}


export default App;
