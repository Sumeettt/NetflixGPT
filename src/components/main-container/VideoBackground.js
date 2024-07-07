import {useSelector } from 'react-redux';
import useMovieTrailer from '../../hooks/useMovieTrailer';
import Spinner from '../Spinner';

const VideoBackground = (props) => {
    const {movieId} = props;
    useMovieTrailer(movieId);

    const trailerVideo = useSelector(store => store.movies?.trailerVideo)
    const isMuted = useSelector(store =>  store.movies.isTrailerVideoVolumeMuted)

    return (
        trailerVideo ? ( <div className="w-full h-full brightness-80">
            <iframe 
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${trailerVideo?.key}?mute=${isMuted ? 1 : 0}&autoplay=1&loop=1&playlist=${trailerVideo?.key}&controls=0&rel=0&iv_load_policy=3&modestbranding=1`}
                title="YouTube video player" 
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                >
            </iframe>
        </div>
    ) : <Spinner/>
    ) 
}

export default VideoBackground;