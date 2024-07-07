import { useDispatch, useSelector } from "react-redux";
import { toggleTrailerVideoVolume } from "../../redux/moviesSlice";
import { useNavigate } from "react-router-dom";

const VideoTitle = (props) => {
    const {title, overview, movieId} = props;

    const dispatch = useDispatch();
    const isMuted = useSelector(store => store.movies.isTrailerVideoVolumeMuted)
    const navigate = useNavigate();

    const handleValumeClick = () => {
        dispatch(toggleTrailerVideoVolume());
    }

    const handlePlayButton = () => {
       navigate(`/watch/${movieId}`)
    }

    return (
        <div className="w-full  absolute pt-[20%] aspect-video px-3 md:px-8 xl:px-16 text-white z-10">
            <h1 className="text-lg md:text-2xl lg:text-4xl  2xl:text-6xl font-bold pb-2 xl:pb-0">{title}</h1>
            <p className="hidden xl:block text-sm 2xl:text-xl w-2/4 py-6">{overview}</p>
            <div className="flex justify-between items-center">
                <div>
                    <button onClick={handlePlayButton} className="mr-2 xl:mr-5 bg-white text-black py-[2px] xl:py-1 2xl:py-2 px-4 xl:px-6 2xl:px-8 rounded inline-flex justify-center items-center hover:opacity-80">
                        <i className="fa-solid fa-play text-sm md:text-2xl 2xl:text-3xl mr-2 md:mr-3"></i> 
                        <span className="text-sm md:text-xl font-medium ">Play</span>
                    </button>
                    <button className="bg-gray-700 bg-opacity-80 py-[2px] xl:py-1 2xl:py-2 px-4 xl:px-6 2xl:px-8 rounded inline-flex justify-center items-center hover:bg-opacity-40">
                        <i className="fa-solid fa-circle-info text-sm md:text-2xl 2xl:text-3xl  mr-2"></i>
                        <span className="text-sm md:text-xl font-medium">More Info</span>
                    </button>
                </div>
                <div className="border border-white rounded-full p-2 inline-flex items-center justify-center h-6 w-6 md:h-10 md:w-10"
                    onClick={handleValumeClick}
                >
                    {isMuted ? <i className="fa-solid fa-volume-xmark text-[9px] md:text-lg"></i> : 
                    <i className="fa-solid fa-volume-low text-[9px] md:text-lg"></i>} 
                </div>

                
            </div>
        </div>
    )
}

export default VideoTitle;