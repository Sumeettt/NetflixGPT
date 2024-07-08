import { POSTER_URL } from "../../utils/constants";

const MovieCard = (props) => {
    const {poster} = props;

    return (
        <div className={`w-[96px] lg:w-[110px] xl:w-[160px] cursor-pointer transition-transform duration-300 hover:scale-105`}>
            <img src={POSTER_URL + poster} alt="Movie Poster" className="rounded"/>
        </div>
    )
}

export const trendingMovieCard = (MovieCard) => {
    return (props) => {
        const {index} = props;


        return (
            <div className="relative flex items-center justify-start">
                <div className={`absolute trending-number ${index === 10 ? "text-[80px] lg:text-[90px] xl:text-[130px]" : "text-[130px] lg:text-[160px] xl:text-[250px]"}`}>
                    {index}
                </div>
                <div className="relative ml-auto  z-10 ">
                    <MovieCard {...props} />
                </div>
            </div>
        )
    }
}


export default MovieCard;


