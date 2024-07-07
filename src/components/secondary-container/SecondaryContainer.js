import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);


  return (
    <div className="bg-[#141414] w-full">
        <div className="-mt-16 md:-mt-32 xl:-mt-44 2xl:-mt-64  pb-20 relative right-0 z-10">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
          <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies}/>
          <MovieList title={"Pupular Movies"} movies={movies?.popularMovies}/>
          <MovieList title={"UpComing Movies"} movies={movies?.upComingMovies}/>
         </div>
    </div>
    
  )
}

export default SecondaryContainer;