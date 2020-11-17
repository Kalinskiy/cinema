import axios from "axios";


const apiKey = '412cf2289b127d76295337d285fac14c'
const instance = axios.create({
    baseURL: `https://api.themoviedb.org/3/`,
});


export const moviesAPI = {
    getToken(request_token: any) {
     return instance.get(`/authentication/token/new?api_key=${apiKey}`).then(res=>res)
    },
    getPopularMovies(){
        return instance.get(`/movie/popular?api_key=${apiKey}`).then(res => res.data)
    },
    getTopMovies(){
        return instance.get(`/movie/top_rated?api_key=${apiKey}`).then(res => res.data)
    },
    getUpcomingMovies(){
        return instance.get(`/movie/upcoming?api_key=${apiKey}`).then(res => res.data)
    },
}

