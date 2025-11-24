import { createContext } from "react"

export interface IMovie {
    id: number,
    original_title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    language?: string,
    genre?: string
}

interface IListMovies {
    likedMovieList: IMovie[],
    setLikedMovieList: React.Dispatch<React.SetStateAction<IMovie[]>>
}

const LikedMoviesContext = createContext<IListMovies>({
    likedMovieList: [],
    setLikedMovieList: () => {}
})

export default LikedMoviesContext
