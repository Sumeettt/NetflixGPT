import MovieCard, {trendingMovieCard} from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieList = (props) => {
    const { title, movies } = props;
    const [width, setWidth] = useState("")
    
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 1280) {
                title.includes("Trending") ? setWidth("260px") : setWidth("160px");
            }else if(window.innerWidth >= 1024) {
                title.includes("Trending") ? setWidth("180px") : setWidth("110px");
            } else {
                title.includes("Trending") ? setWidth("150px") : setWidth("96px");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }

    },[]);

    const MovieCardTrending = trendingMovieCard(MovieCard);

    return (
        <div className="pl-3 md:lx-8 xl:pl-16 pr-0 mb-6">
            <h1 className="text-sm sm:text-lg md:text-xl 2xl:text-2xl py-3 md:py-6 text-white">{title}</h1>
            {movies && (
                <Swiper
                    spaceBetween={10}
                    slidesPerView="auto"   
                >
                    {movies.map((eachMovie, index) => (
                        <SwiperSlide key={eachMovie.id}  style={{width}}>
                            <Link to={"/watch/" + eachMovie.id}>
                                { title.includes("Trending") ? <MovieCardTrending poster={eachMovie.poster_path} index={index+1}/> :
                                 <MovieCard poster={eachMovie.poster_path} /> 
                                }
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default MovieList;
