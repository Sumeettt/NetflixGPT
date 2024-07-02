import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import GptSearch from "./GptSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {
    const isGptSearch = useSelector(store => store.gpt.showGptSearch);

    useNowPlayingMovies();
    useTopRatedMovies();
    usePopularMovies();
    useUpComingMovies();

    return(
        <div>
            <Header/>    
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