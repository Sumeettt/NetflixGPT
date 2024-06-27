const VideoTitle = (props) => {
    const {title, overview} = props;

  return (
    <div className="absolute top-[30%] px-24 text-white z-10">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="text-lg w-1/3 py-6">{overview}</p>
        <div className="">
            <button className="mr-5 bg-white text-black py-2 px-8 rounded inline-flex justify-center items-center hover:opacity-90">
                <i className="fa-solid fa-play text-3xl mr-3"></i> 
                <span className="text-xl font-medium ">Play</span>
            </button>
            <button className="bg-gray-700 bg-opacity-50 py-2 px-8 rounded inline-flex justify-center items-center hover:bg-opacity-40">
                <i className="fa-solid fa-circle-info text-3xl  mr-2"></i>
                <span className="text-xl font-medium ">More Info</span>
            </button>
        </div>
    </div>
  )
}

export default VideoTitle;