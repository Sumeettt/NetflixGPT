import { POSTER_URL } from "../utils/constants";

const MovieCard = (props) => {
    const {poster} = props;

    return (
        <div className="w-48 pr-4">
            <img src={POSTER_URL + poster} alt="Movie Poster"/>
        </div>
    )
}

export default MovieCard