import { createContext } from "react"

export interface IMovie {
    id: number,
    original_title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    original_language?: string,
    genre?: string,
    isLiked?: boolean
}

interface IListMovies {
    movieList: IMovie[],
    setMovieList: React.Dispatch<React.SetStateAction<IMovie[]>>
}

export const MovieListContext = createContext<IListMovies>({
    movieList: [],
    setMovieList: () => {}
});

// CONTEXT: List of Liked Movies
interface ILikedListMovies {
    likedMovieList: IMovie[],
    setLikedMovieList: React.Dispatch<React.SetStateAction<IMovie[]>>
}

export const LikedMovieListContext = createContext<ILikedListMovies>({
    likedMovieList: [],
    setLikedMovieList: () => {}
})

// export default MovieListContext; LikedMovieListContext
