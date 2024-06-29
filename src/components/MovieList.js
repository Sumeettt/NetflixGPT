import MovieCard from './MovieCard';

const MovieList = (props) => {
    const { title, movies } = props;

    console.log(movies)

    return (
        <div className="p-4">
            <h1 className="text-3xl font-medium py-6 text-white">{title}</h1>
            {movies && (
                <div className="flex overflow-x-scroll no-scrollbar">
                    <div className="flex">
                        {movies.map(eachMovie => <MovieCard key={eachMovie.id} poster={eachMovie.poster_path}/>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieList;

