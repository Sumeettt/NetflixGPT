import { useNavigate, useParams } from "react-router-dom";
import useVideoPlayer from "../hooks/useVideoPlayer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const VideoPlayer = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { loading } = useVideoPlayer(movieId);

  const playerVideo = useSelector(store => store.movies?.videoPlayerVideo);

  // Using useEffect to handle navigation logic
  useEffect(() => {
    if (!loading && !playerVideo) {
      navigate("/error", { replace: true });
    }
  }, [loading, playerVideo, navigate]);


  return (
    playerVideo && (
      <div className="w-full h-full bg-black">
        <iframe 
          className="w-full h-screen"
          src={`https://www.youtube.com/embed/${playerVideo.key}?autoplay=1&mute=0&controls=1&rel=0&iv_load_policy=3&modestbranding=1`}
          title="YouTube video player" 
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        >
        </iframe>
      </div>
    ) 
  );
}

export default VideoPlayer;
