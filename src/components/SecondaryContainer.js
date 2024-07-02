import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);


  return (
    <div className="bg-black w-full">
        <div className="-mt-56  pb-20 relative right-0 z-10">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
          <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies}/>
          <MovieList title={"Pupular Movies"} movies={movies?.popularMovies}/>
          <MovieList title={"UpComing Movies"} movies={movies?.upComingMovies}/>
         </div>
    </div>
    
  )
}

export default SecondaryContainer;