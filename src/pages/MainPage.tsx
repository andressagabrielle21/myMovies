import { useMyMoviesLogic } from "../hooks/useMyMoviesLogic"
import Spinner from "../components/Spinner";
import FilmCard from "../components/FilmCard";

const MainPage = () => {
    const {isLoading, errorMessage, movieList} = useMyMoviesLogic();
  return (
    <div>
      {isLoading ? 
                <div className="flex justify-center items-center">
                  <Spinner/>
                </div>
                
                : errorMessage ? 
                  <p className="text-xl text-red-500 font-bold">{errorMessage}</p> 
                  : (
                    <ul>
                      {movieList.map((item) => (
                      <FilmCard 
                        key={item.id} 
                        movieId={item.id}
                        movieTitle={item.original_title} 
                        movieImg={item.poster_path}
                        year={item.release_date}
                        language={item.original_language}
                        ratings={item.vote_average}
                        genre="Action"
                      />
                    ))}
                    </ul>
                  )
        }
    </div>
  )
}

export default MainPage
