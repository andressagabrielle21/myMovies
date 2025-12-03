import { useEffect } from "react"
import { useMovieList } from "../context/useMovieList"
import { useParams } from "react-router-dom";

const MovieInfo = () => {
    const {fetchMovieInfo, movieInfo} = useMovieList();

    const {id} = useParams();
    console.log(movieInfo)
    
    useEffect(() => {
        fetchMovieInfo(id as string);
    }, [id]);

    return (
        <div className="flex flex-col items-start gap-3 mt-6">
            <h2 className="text-5xl font-bold text-white">{movieInfo?.title}</h2>

            <div className="flex gap-3 text-gray-100">
                <p>{movieInfo?.release_date.substring(0, 4)}</p>
                <p>{movieInfo?.runtime}min</p>
            </div>


            <div className="flex gap-5">
                <img src={movieInfo?.poster_path ? `https://image.tmdb.org/t/p/w500/${movieInfo?.poster_path}` 
                    : '/not-available.png'}
                    alt={movieInfo?.title} 
                    className="rounded-lg max-h-[320px]"
                />

                <img src={movieInfo?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movieInfo?.backdrop_path}`
                    : '/not-available.png'
                    } alt={movieInfo?.original_title}
                    className="rounded-lg"
                />
            </div>




            {/* <h2 className="font-bold text-xl">{movieGenres[0]}</h2> */}

            <p className="text-white">
                <span className="text-2xl font-bold">Overview: </span>{movieInfo?.overview}
            </p>
        </div>
    )
}

export default MovieInfo
