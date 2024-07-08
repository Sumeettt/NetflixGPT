import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingTVShows } from "../redux/moviesSlice";

//custom hook for fetching Trending TV Shows from TMDB

const useTrendingTVShows = () => {
    const dispatch = useDispatch();

    const trendingTVShows = useSelector(store => store.movies.trendingTVShows);

    const getTrendingTVShows = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/tv/day', API_OPTIONS);
        const json = await data.json();

        const firstTenTVShows = json?.results.slice(0,10);

        dispatch(addTrendingTVShows(firstTenTVShows));
    }
    
    useEffect(()=> {
        if(!trendingTVShows) getTrendingTVShows();
    },[]);
}

export default useTrendingTVShows;