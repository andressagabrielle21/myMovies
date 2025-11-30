import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useMovieList } from "../context/useMovieList.ts";

export const useMyMoviesLogic = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    // const [trendingMovies, setTrendingMovies] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>('');
    const [isPageClicked, setPageIsClicked] = useState<boolean>(false);


  useDebounce(() => setDebounceSearchTerm(searchTerm), 1000, [searchTerm])

  const {movieList, fetchMovies, trendingMovies} = useMovieList();
  
  useEffect(() => {
    setTimeout(() => {
        fetchMovies(debounceSearchTerm)
    }, 800);
    }, [debounceSearchTerm]);

  return {
    setDebounceSearchTerm,
    searchTerm, 
    setSearchTerm, 
    trendingMovies, 
    movieList, 
    fetchMovies,
    setIsLoading,
    isLoading, 
    setErrorMessage,
    errorMessage, 
    isPageClicked, setPageIsClicked, debounceSearchTerm}
}
 