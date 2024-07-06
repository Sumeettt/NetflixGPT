import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import GptSearch from "./GptSearchPage";
import {useSelector } from "react-redux";


const Browse = () => {
    const isGptSearch = useSelector(store => store.gpt.showGptSearch);
    

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