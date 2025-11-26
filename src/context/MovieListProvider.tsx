import { useState } from "react"
import { MovieListContext, LikedMovieListContext, type IMovie } from "./MovieListContext";

export function MovieListProvider({children} : {children: React.ReactNode}) {
    const [movieList, setMovieList] = useState<IMovie[]>([]);

    return (
        <MovieListContext.Provider value={{movieList, setMovieList}}>
            {children}
        </MovieListContext.Provider>
    )
}

export function LikedMovieListProvider({children} : {children: React.ReactNode}) {
    const [likedMovieList, setLikedMovieList] = useState<IMovie[]>([]);

    return (
        <LikedMovieListContext.Provider value={{likedMovieList, setLikedMovieList}}>
            {children}
        </LikedMovieListContext.Provider>
    )
}
