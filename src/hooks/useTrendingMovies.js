import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../redux/moviesSlice";

//custom hook for fetching Trending Movies from TMDB

const useTrendingMovies = () => {
    const dispatch = useDispatch();

    const trendingMovies = useSelector(store => store.movies.trendingMovies);

    const getTrendingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/movie/day', API_OPTIONS);
        const json = await data.json();

        const firstTenMovies = json?.results.slice(0,10);

        dispatch(addTrendingMovies(firstTenMovies));
    }
    
    useEffect(()=> {
        if(!trendingMovies) getTrendingMovies();
    },[]);
}

export default useTrendingMovies;