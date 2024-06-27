import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from '../redux/moviesSlice';
import { addNowPlayingMovies } from "../redux/moviesSlice";

//custom hook for fetching Now Playing Movies from TMDB

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        getNowPlayingMovies();
    },[])

    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();

        dispatch(addNowPlayingMovies(json?.results));
    }
    
}

export default useNowPlayingMovies;