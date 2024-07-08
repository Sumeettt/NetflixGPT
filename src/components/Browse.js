import MainContainer from "./main-container/MainContainer";
import SecondaryContainer from "./secondary-container/SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import GptSearch from "./gpt/GptSearchPage";
import {useSelector } from "react-redux";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTrendingTVShows from "../hooks/useTrendingTVShows";


const Browse = () => {
    const isGptSearch = useSelector(store => store.gpt.showGptSearch);
    
    useNowPlayingMovies();
    useTrendingMovies();
    useTopRatedMovies();
    usePopularMovies();
    useTrendingTVShows();
    useUpComingMovies();

    return(
        <div>    
            {isGptSearch ? <GptSearch/> :
                    <>
                        <MainContainer/>
                        <SecondaryContainer/>             
                    </>  
            }
        </div>
    )
}

export default Browse;