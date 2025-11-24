import { useEffect, useState } from "react";
import { myFavoriteMovies } from "../appwrite.ts";
import FilmCard from "../components/FilmCard.tsx";

const Favorites = () => {
    const [myFavMovies, setMyFavMovies] = useState<[]>([]);

    const showMyMovies = async () => {
        try {
        const myFav = await myFavoriteMovies();

        setMyFavMovies(myFav);
        console.log(myFavMovies);
        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        showMyMovies();
    }, [])

    return (
        <div className="">
            {myFavMovies.length > 0 &&
                <section className="fav-movies">

                    <ul>
                        {myFavMovies.map((item) => (
                            <FilmCard 
                                key={item.movieId} 
                                movieId={item.movieId}
                                movieTitle={item.movieTitle} 
                                movieImg={item.posterUrl}
                                year={item.movieReleaseYear}
                                ratings={item.movieRating}
                                genre="Action"
                            />
                        ))}
                    </ul>
                </section>
            }
        </div>
    )
}

export default Favorites
