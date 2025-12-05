import { create } from "zustand";
import { updateSearchCount, myFavoriteMovies, addFavoriteMovies, getTrendingMovies } from "../appwrite.ts";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

export interface IMovie {
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    original_language?: string,
    genres_ids?: string[],
    isLiked?: boolean,
    genre_ids?: number
}

export interface IMovieInfo {
    id: number,
    title: string,
    original_title?: string,
    release_date: string,
    vote_average: number,
    original_language?: string,
    poster_path: string,
    genre_ids?: string[],
    genre?: string,
    isLiked?: boolean,
    runtime: number,
    status: string,
    budget: number,
    revenue: number,
    production_countries?: string[],
    production_companies?: string[],
    spoken_languages?: string[],
    genres?: string[],
    overview?: string, //Sinopse
    backdrop_path?: string // Background Poster
} 

interface IMovieList {
    movieList: IMovie[],
    trendingMovies: IMovie[],
    loading: boolean,
    error: string,
    fetchMovies: (query?: string) => Promise<IMovie[] | undefined>,
    movieInfo?: IMovieInfo,
    fetchMovieInfo: (id: string) => Promise<IMovie[] | undefined>,
    fetchTrendingMovies: () => Promise<IMovie[] | void>,
    movieGenres: string[]
    // toggleMovieInfo: (movieInfo: IMovieInfo) => void
}

export const useMovieList = create<IMovieList>((set) => ({
    movieList: [],
    trendingMovies: [],
    loading: false,
    error: "",
    movieInfo: undefined,
    movieGenres: [], 

    fetchMovies: async (query?: string) => {
        set({loading: true})

        try {
            const endpoint = query ?
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

            const response = await fetch(endpoint, API_OPTIONS);

            const genreAPIUrl = await fetch(`${API_BASE_URL}/genre/movie/list`, API_OPTIONS);

            if (!response.ok && !genreAPIUrl) {
                throw new Error(`Error! Status: ${response.status}`)
            }

            const data = await response.json();

            const dataGenre = await genreAPIUrl.json();

            if (data.response === 'False') {
                set({error: data.Error || "Failed to fetch movies."});
                set({movieList: []});
            return;
            } 
            
            if (query && data.results.length > 0) {
                updateSearchCount(query, data.results[0]);
            }
            
            set({movieList: data.results})

            const genreIds = data.results.map((item) => item.genre_ids[0]);

            const equalNameGenre = dataGenre.genres.filter(itemAPI => genreIds.some(itemB => itemB === itemAPI.id))

            set({movieGenres: equalNameGenre})

            return data;
        } catch (error) {
            set({error: "Error fetching movies. Try again later."});
            console.error('Error fetching data: ', error);
            throw error;
        } finally {
            set({loading: false})
        }
    },

    fetchMovieInfo: async (id: string) => {
        try {
            const endpoint = `${API_BASE_URL}/movie/${id}` 
            
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`)
            }
            
            const data = await response.json();

            if (data.response === 'False') {
                console.log("API não conseguiu resgatar os dados requeridos.")
                set({movieInfo: undefined});
            return;
            }

            set({movieInfo: data})
            // console.log(data.genres.map((item) => item.name)[0])
            
            return data;
        } catch (error) {
            console.log("Error fetching the movie information.", error)
        }
    },

    fetchTrendingMovies: async () => {
        try {
            const data = await getTrendingMovies();
            set({trendingMovies: data})
        } catch (error) {
            console.log(error);
        }
    }

}));

interface ILikedMovieList {
    likedMovies: IMovie[],
    fetchFavorites: () => Promise<IMovie | void>,
    addFavoriteMovies: (movie: IMovie) => void,
    isLiked: (movie: IMovie) => boolean,
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

            // const genreAPIUrl = await fetch(`${API_BASE_URL}/genre/movie/list`, API_OPTIONS);

            // const dataGenre = await genreAPIUrl.json();
            // const genreIds = data.results.map((item) => item.genre_ids[0]);
        } catch (error) {
            console.log(error)
        }
    },

    addFavoriteMovies: async (movie: IMovie) => {
        const prev = get().likedMovies;

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