import MainContainer from "./main-container/MainContainer";
import SecondaryContainer from "./secondary-container/SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import GptSearch from "./gpt/GptSearchPage";
import {useSelector } from "react-redux";


const Browse = () => {
    const isGptSearch = useSelector(store => store.gpt.showGptSearch);
    const trainerVideo = useSelector(store => store.movies.trailerVideo);

    useNowPlayingMovies();
    useTopRatedMovies();
    usePopularMovies();
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