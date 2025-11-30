import { useEffect, useState } from "react";
import { useMovieList, useLikedMovieList, type IMovieInfo } from "../context/useMovieList.ts";
import MovieInfo from "./MovieInfo.tsx";

const FilmCard = (movie: IMovieInfo) => {
    const {addFavoriteMovies} = useLikedMovieList();
    const {movieGenres, fetchMovieInfo} = useMovieList()
    const [showInfo, setShowInfo] = useState<boolean>(false);

    let genre;

    if (movie.genre_ids.length > 1) {
        genre = movieGenres.filter(itemAPI => movie.genre_ids.some(itemMovieInfo => itemMovieInfo === itemAPI.id)).map((item) => item.name);
    } else {
        genre = movieGenres.filter((itemAPI) => itemAPI.id === movie.genre_ids).map((item) => item.name);
    }
    
    
    useEffect(() => {
        fetchMovieInfo(movie);
    }, [])

    return (
        <div 
        className="movie-card hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-98"
        onClick={() => setShowInfo(prev => !prev)}>
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : '/not-available.png'
                } alt="Movie Poster" 
            />

            <div className="mt-4">
                <div className="content mt-0">
                    <h2 className="text-2xl font-bold">{movie.title ?? "N/A"}</h2>

                    <span>•</span>
                    <p className="year">{movie.release_date?.substring(0, 4) ?? "----"}</p>
                </div>
                
                <div className="content flex justify-center">
                    <div className="rating">
                        <img src="/star.png" alt="" />
                        <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                    </div>

                    {/* <span>•</span>
                    <p className="lang">{movie.original_language?.toUpperCase()}</p> */}

                    <span>•</span>
                    <p className="genre">{genre[0] ?? "N/A"}</p>

                    <span>•</span>
                    <button onClick={() => addFavoriteMovies(movie)}>
                        {movie.isLiked
                            ? <img src="/fill-heart.svg" alt="liked movie"/> 
                            : <img src="/empty-heart.svg" alt="unliked movie" /> 
                        }
                    </button>
                </div>
            

            </div>
            {showInfo && <MovieInfo key={movie.id} {...movie}/>}        
        </div>
    )
}

export default FilmCard
