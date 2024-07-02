import { useDispatch, useSelector } from "react-redux";
import { toggleTrailerVideoVolume } from "../redux/moviesSlice";

const VideoTitle = (props) => {
    const {title, overview} = props;

    const dispatch = useDispatch();
    const isMuted = useSelector(store => store.movies.isTrailerVideoVolumeMuted)

    const handleValumeClick = () => {
        dispatch(toggleTrailerVideoVolume());
    }

    return (
        <div className="w-full absolute pt-[20%] aspect-video px-16 text-white z-10">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="text-lg w-1/3 py-6">{overview}</p>
            <div className="flex justify-between items-center">
                <div>
                    <button className="mr-5 bg-white text-black py-2 px-8 rounded inline-flex justify-center items-center hover:opacity-80">
                        <i className="fa-solid fa-play text-3xl mr-3"></i> 
                        <span className="text-xl font-medium ">Play</span>
                    </button>
                    <button className="bg-gray-700 bg-opacity-80 py-2 px-8 rounded inline-flex justify-center items-center hover:bg-opacity-40">
                        <i className="fa-solid fa-circle-info text-3xl  mr-2"></i>
                        <span className="text-xl font-medium ">More Info</span>
                    </button>
                </div>
                <div className="border border-white rounded-full p-2 inline-flex items-center justify-center h-10 w-10"
                    onClick={handleValumeClick}
                >
                    {isMuted ? <i className="fa-solid fa-volume-xmark text-md"></i> : 
                    <i className="fa-solid fa-volume-low text-md"></i>} 
                </div>

                
            </div>
        </div>
    )
}

export default VideoTitle;