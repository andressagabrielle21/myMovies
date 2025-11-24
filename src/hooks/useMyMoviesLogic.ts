import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "../appwrite.ts";

export const useMyMoviesLogic = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    // const {likedMovieList} = useContext(LikedMoviesContext);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [movieList, setMovieList] = useState<[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<[]>([]);
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

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      fetchMovies(debounceSearchTerm);
    }, 800)
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return {searchTerm, setSearchTerm, trendingMovies, movieList, isLoading, errorMessage}
}
