import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addVideoPlayerVideo, removeVideoPlayerVideo } from '../redux/moviesSlice';

// Custom hook for fetching Video for VideoPlayer from TMDB
const useVideoPlayer = (movieId) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const getVideoPlayerVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();

        const filterData = json.results.filter(eachVideo => eachVideo.type === "Trailer");
        const video = filterData.length ? filterData[0] : json.results[0];
        
        dispatch(addVideoPlayerVideo(video));
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await getVideoPlayerVideo();
            } catch (error) {
                console.error('Failed to fetch video:', error);
            } finally {
                setLoading(false);
            }
        }

        if (movieId) {
            fetchData();
        }

        return () => {
            dispatch(removeVideoPlayerVideo());
        }
    }, [movieId, dispatch]);

    return { loading };
}

export default useVideoPlayer;
