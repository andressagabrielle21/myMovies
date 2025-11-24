import { useContext, useEffect, useState } from "react"
import LikedMoviesContext, { type IMovie } from "../context/LikedMovieContext";
import { addFavoriteMovies } from "../appwrite.ts";

interface IFilmCard {
    movieId: number,
    movieTitle: string,
    movieImg: string,
    year: string,
    ratings: number,
    language?: string,
    genre?: string
}

const FilmCard = ({movieId, movieTitle, movieImg, year, ratings, language, genre}: IFilmCard) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const {likedMovieList, setLikedMovieList} = useContext(LikedMoviesContext);
    
    // setLikedMovieList(prev => {
    //     if (prev.includes(movieId )) {
    //         return prev.filter(item => {
    //             movieTitle
    //         });
    //     } else {
            
    //         return [...likedMovieList, movieTitle]
    //     }
    //     }
    // )
    const toggleMoviesLiked = (movie: IMovie) => {
        setIsLiked(prev => !prev);

        setLikedMovieList(prev => {
            const alreadyLiked = prev.some(item => item.id === movie.id);

            if (alreadyLiked) {
                return prev.filter(item => item.id !== movie.id);
            } else {
                return [...prev, movie];
            }
        })

        addFavoriteMovies(movie);
    }



    return (
        <div className="movie-card">
            <img src={movieImg ? `https://image.tmdb.org/t/p/w500/${movieImg}`
                : '/not-available.png'
                } alt="Movie Poster" 
            />

            <div className="mt-4">
                <div className="content mt-0">
                    <h2 className="text-2xl font-bold">{movieTitle}</h2>

                    <span>•</span>
                    <p className="year">{year.substring(0, 4)}</p>
                </div>
                
                <div className="content">
                    <div className="rating">
                        <img src="/star.png" alt="" />
                        <p>{ratings ? ratings.toFixed(1) : "N/A"}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{language?.toUpperCase()}</p>

                    <span>•</span>
                    <p className="genre">{genre}</p>

                    <span>•</span>
                    <button onClick={() => toggleMoviesLiked({
                                original_title: movieTitle, 
                                poster_path: movieImg, 
                                id: movieId,
                                vote_average: ratings,
                                release_date: year.substring(0,4), 
                            })}>
                        {isLiked 
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
