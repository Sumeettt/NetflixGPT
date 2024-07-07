import { POSTER_URL } from "../../utils/constants";

const MovieCard = (props) => {
    const {poster} = props;

    return (
        <div className="w-24 lg:w-28 xl:w-40 cursor-pointer  transition-transform duration-300 hover:scale-105">
            <img src={POSTER_URL + poster} alt="Movie Poster" className="rounded"/>
        </div>
    )
}

export default MovieCard;
