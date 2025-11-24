import { useState } from "react"
import LikedMoviesContext, { type IMovie } from "./LikedMovieContext";

function LikedMoviesProvider({children} : {children: React.ReactNode}) {
    const [likedMovieList, setLikedMovieList] = useState<IMovie[]>([]);

    return (
        <LikedMoviesContext.Provider value={{likedMovieList, setLikedMovieList}}>
            {children}
        </LikedMoviesContext.Provider>
    )
}

export default LikedMoviesProvider
