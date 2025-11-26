import { create } from "zustand";
import { updateSearchCount, myFavoriteMovies, addFavoriteMovies } from "../appwrite.ts";
import type { IMovie } from "./MovieListContext.tsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

interface IMovieList {
    movieList: IMovie[],
    loading: boolean,
    error: string,
    fetchMovies: (query?: string) => Promise<IMovie[] | undefined>;
}

export const useMovieList = create<IMovieList>((set) => ({
    movieList: [],
    loading: false,
    error: "",

    fetchMovies: async (query?: string) => {
        set({loading: true})

        try {
            const endpoint = query ?
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`)
            }

            const data = await response.json();

            if (data.response === 'False') {
                set({error: data.Error || "Failed to fetch movies."});
                set({movieList: []});
            return;
            } 
            
            if (query && data.results.length > 0) {
                updateSearchCount(query, data.results[0]);
            }
            
            set({movieList: data.results})
            return data;
        } catch (error) {
            set({error: "Error fetching movies. Try again later."});
            console.error('Error fetching data: ', error);
            throw error;
        } finally {
            set({loading: false})
        }
    }

}));

interface ILikedMovieList {
    likedMovies: IMovie[],
    fetchFavorites: () => Promise<IMovie | void>,
    addFavoriteMovies: (movie: IMovie) => void,
    isLiked: (movie: IMovie) => boolean,
    // heartActive: (movieId: number) => boolean,
}

export const useLikedMovieList = create<ILikedMovieList>((set, get) => ({
    likedMovies: [],

    isLiked: (movie: IMovie) => {
        return get().likedMovies.some((item) => item.id === movie.id)
    },

    fetchFavorites: async () => {
        try {
            const myFav = await myFavoriteMovies();
            set({likedMovies: myFav})
            console.log(myFav)
        } catch (error) {
            console.log(error)
        }
    },

    addFavoriteMovies: async (movie: IMovie) => {
        const prev = get().likedMovies;

        // console.log("LIKED MOVIES ARRAY: ", prev.map((item) => item.movieId));

        const alreadyLiked = prev.some((item) => item.$id === movie.$id);
        
        if (alreadyLiked) {
            alert("Movie is already liked!")
            set({likedMovies: prev.filter((item) => item.$id !== movie.$id)});

            console.log("🔴 DELETED FROM ARRAY 🔴")
            return;
        } 

        set({likedMovies: [...prev, movie]})
        console.log("Adicionado no ARRAY DE FAVORITOS")
        try {
            await addFavoriteMovies(movie);
            
        } catch (error) {
            console.log("Erro ao adicionar novo favorito.", error)
        }
        
    }
}))