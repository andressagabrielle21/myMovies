import {type IMovie } from "../context/MovieListContext.tsx";
import { useLikedMovieList } from "../context/useMovieList.ts";

const FilmCard = (movie: IMovie) => {
    const {addFavoriteMovies} = useLikedMovieList();

    const liked = useLikedMovieList((state) => state.isLiked(movie));

    return (
        <div className="movie-card">
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : '/not-available.png'
                } alt="Movie Poster" 
            />

            <div className="mt-4">
                <div className="content mt-0">
                    <h2 className="text-2xl font-bold">{movie.original_title}</h2>

                    <span>•</span>
                    <p className="year">{movie.release_date?.substring(0, 4) ?? "----"}</p>
                </div>
                
                <div className="content">
                    <div className="rating">
                        <img src="/star.png" alt="" />
                        <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{movie.original_language?.toUpperCase()}</p>

                    <span>•</span>
                    <p className="genre">{movie.genre_?? "Action"}</p>

                    <span>•</span>
                    <button onClick={() => addFavoriteMovies(movie)}>
                        {liked
                            ? <img src="/fill-heart.svg" alt="liked movie"/> 
                            : <img src="/empty-heart.svg" alt="unliked movie" /> 
                        }
                    </button>
                </div>
            

            </div>        
        </div>
    )
}

export default FilmCard
