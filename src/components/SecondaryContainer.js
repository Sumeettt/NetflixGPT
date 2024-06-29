import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);


  return (
    <div className="w-screen bg-black -mt-52 relative z-10 pb-32">
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
      <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies}/>
      <MovieList title={"Pupular Movies"} movies={movies?.popularMovies}/>
      <MovieList title={"UpComing Movies"} movies={movies?.upComingMovies}/>
    </div>
  )
}

export default SecondaryContainer;