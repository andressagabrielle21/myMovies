import { useEffect } from "react";
import FilmCard from "../components/FilmCard.tsx";
import { useLikedMovieList } from "../context/useMovieList.ts";

const Favorites = () => {
    const {fetchFavorites, likedMovies} = useLikedMovieList()

    useEffect(() => {
        fetchFavorites();
    }, [])

    return (
        <div className="">
            {likedMovies.length > 0 &&
                <section className="fav-movies">
                    <ul>
                        {likedMovies.map((movie) => (
                            <FilmCard 
                                key={movie.id} 
                                {...movie}
                            />
                        ))}
                    </ul>
                </section>
            }
        </div>
    )
}

export default Favorites
