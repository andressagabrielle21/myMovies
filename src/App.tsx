
import { useContext, useEffect, useState } from "react";
import FilmCard from "./components/FilmCard";
import LikedMoviesContext, { type IMovie } from "./context/LikedMovieContext";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies, myFavoriteMovies } from "./appwrite.ts";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {likedMovieList} = useContext(LikedMoviesContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [movieList, setMovieList] = useState<[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<[]>([]);
  const [myFavMovies, setMyFavMovies] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>('');

  useDebounce(() => setDebounceSearchTerm(searchTerm), 900, [searchTerm])

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log("Error fetching treding movies", error)
    }
  }

  const fetchMovies = async (query?: string) => {
    setIsLoading(true);

    try {
      const endpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS);
      console.log("Data received")
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`)
      }

      const data = await response.json();

      if (data.response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch movies.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results);

      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }

      return data;
    } catch (error) {
      setErrorMessage("Error fetching movies. Try again later.");
      console.error('Error fetching data: ', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

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
    setIsLoading(true);

    setTimeout(() => {
      showMyMovies();
      fetchMovies(debounceSearchTerm);
    }, 800)
  }, [debounceSearchTerm])

  useEffect(() => {
    showMyMovies();
    loadTrendingMovies();
  }, [])

  return (
    <main>
      <div className="pattern">
        <div>

          <div className="wrapper pt-0">

            <header>
              <img src="/hero-img.png" alt="" />
              <h1>Find your favorite <span className="text-gradient">Movies</span> without the hassle</h1>

              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>

            {trendingMovies.length > 0 &&
              <section className="trending">
                <h2>Most Searched Movies</h2>

                <ul>
                  {trendingMovies.map((item, index) => (
                    <li key={item.$id}>
                      <p>{index + 1}</p>
                      <img src={item.poster_url} alt={item.title} />
                    </li>
                  ))}
                </ul>
              </section>
            }

            {myFavMovies.length > 0 &&
              <section className="all-movies">
                <h2 className="font-white text-2xl font-bold">Your Favorite Movies</h2>

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

            <div className="all-movies">
              <div className="mt-5 flex gap-10">
                <h2>All Movies</h2>

                <h2>Liked Movies</h2>
              </div>

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

          </div>
        </div>

        </div>
    </main>
  )
}

export default App
