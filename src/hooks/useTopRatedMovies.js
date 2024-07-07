import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../redux/moviesSlice";

//custom hook for fetching Top Rated Movies from TMDB

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

    useEffect(()=> {
        if(!topRatedMovies) getTopRatedMovies();
    },[])

    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
        const json = await data.json();

        dispatch(addTopRatedMovies(json?.results));
    }
    
}

export default useTopRatedMovies;