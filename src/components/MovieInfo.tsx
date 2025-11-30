import { useEffect } from "react"
import { useMovieList, type IMovieInfo } from "../context/useMovieList"

const MovieInfo = (movie: IMovieInfo) => {
    const {fetchMovieInfo, movieInfo, movieGenres} = useMovieList();
    
    useEffect(() => {
        fetchMovieInfo(movie);
    }, []);

    return (
        <div className="text-white">
            {/* <img src={movie.backdrop_path} alt={movie.original_title} /> */}

            {/* <h2 className="font-bold text-xl">{movieGenres[0]}</h2> */}

            <p>{movie?.overview}</p>
        </div>
    )
}

export default MovieInfo
