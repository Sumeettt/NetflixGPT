import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../redux/moviesSlice";

//custom hook for fetching UpComing Movies from TMDB

const useUpComingMovies = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        getUpComingMovies();
    },[])

    const getUpComingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
        const json = await data.json();

        dispatch(addUpComingMovies(json?.results));
    }
    
}

export default useUpComingMovies;