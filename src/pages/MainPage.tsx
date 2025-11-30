import Spinner from "../components/Spinner";
import FilmCard from "../components/FilmCard";
import { useMovieList } from "../context/useMovieList";
import { useEffect } from "react";

const MainPage = () => {

    const {movieList, error, loading, fetchMovies} = useMovieList();

    useEffect(() => {
        fetchMovies();
    }, []);
    
    return (

        <div>
            {loading ? 
                <div className="flex justify-center items-center">
                    <Spinner/>
                </div>
                
                : error ? 
                <p className="text-xl text-red-500 font-bold">{error}</p> 
                : (
                    <ul>
                    {movieList.map((movie) => (
                        <FilmCard 
                            key={movie.id} 
                            {...movie}
                        />
                    ))}
                    </ul>
                )
            }
        </div>
    )
}

export default MainPage
