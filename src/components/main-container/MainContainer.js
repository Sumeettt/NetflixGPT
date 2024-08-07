import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

function MainContainer() {
    const movies = useSelector(store =>store.movies?.nowPlayingMovies);
    
    //early return, movies is null
    if(!movies) return;

    const mainMovie = movies[0];
    const {original_title, overview, id} = mainMovie;

    return (
        <div className='bg-black w-full'>
          <VideoTitle title={original_title} overview={overview} movieId={id}/>
          <VideoBackground movieId={id}/>
        </div>
  )
}

export default MainContainer;