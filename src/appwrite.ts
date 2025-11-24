import { Databases, Client, ID, Query } from "appwrite";
import type { IMovie } from "./context/LikedMovieContext";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: {id: number, poster_path: string}) => {
    try {
        const result = await database.listDocuments({
            databaseId: DATABASE_ID, collectionId: 'metrics', queries: [Query.equal('searchTerm', searchTerm)]
        });

        if(result.documents.length > 0) {
            const document = result.documents[0];

            await database.updateDocument(
                DATABASE_ID, 'metrics', document.$id, {count: document.count + 1}
            )
        } else { 
            await database.createDocument(
                DATABASE_ID, 
                'metrics', 
                ID.unique(), 
                {
                    searchTerm,
                    count: 1,
                    movieId: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            )
        }
    } catch (error) {
        console.log("Deu ruim! ", error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments({
            databaseId: DATABASE_ID, 
            collectionId: 'metrics',
            queries: [
                Query.limit(5),
                Query.orderDesc("count")
            ]
        })

        return result.documents;
    } catch (error) {
        console.log(error);
    }
}

export const myFavoriteMovies = async () => {
    try {
        const myMovies = await database.listDocuments(
            DATABASE_ID,
            'liked_movies'
        )
        return myMovies.documents;
    } catch (error) {
        console.log("You don't have any favorites.", error);
    }
}

export const addFavoriteMovies = async (movie: IMovie) => {
    try {

        const existingMovies = await database.listDocuments(
            DATABASE_ID,
            'liked_movies',
            [Query.equal("movieId", movie.id)]
        );

        if (existingMovies.length > 0) {
            const movieId = existingMovies.documents[0].$id;

            await database.deleteDocument(
                DATABASE_ID,
                'liked_movies',
                movieId
            )

            return {
                action: "deleted",
                documentId: movieId,
            };
        } else {
            await database.createDocument(
                DATABASE_ID, 
                'liked_movies', 
                ID.unique(),
                {
                    movieId: movie.id,
                    movieTitle: movie.original_title,
                    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movieRating: movie.vote_average,
                    movieReleaseYear: movie.release_date
                }
            )

            return {
                action: "created",
            }
        }

        // console.log(result.documents[0]);
    } catch (error) {
        console.log(error);
    }
}