import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";

const Browse = () => {
    
    useNowPlayingMovies();
    useTopRatedMovies();
    usePopularMovies();
    useUpComingMovies();

    return(
        <div>
            <Header/>    
            <MainContainer/>
            <SecondaryContainer/>
        </div>
    )
}

export default Browse;