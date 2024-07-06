import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';

const MovieList = (props) => {
    const { title, movies } = props;

    console.log(movies);

    return (
        <div className="px-16 mb-6">
            <h1 className="text-2xl font-medium py-6 text-white">{title}</h1>
            {movies && (
                <Swiper
                    spaceBetween={15}
                    slidesPerView="auto"   
                >
                    {movies.map(eachMovie => (
                        <SwiperSlide key={eachMovie.id} style={{ width: '180px' }}>
                            <Link to={"/watch/" + eachMovie.id}>
                                <MovieCard poster={eachMovie.poster_path} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default MovieList;
