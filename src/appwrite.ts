import { Databases, Client, ID, Query } from "appwrite";
import type { IMovie } from "./context/useMovieList";

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
                    id: movie.id,
                    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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
            [Query.equal("id", movie.id)]
        );

        if (existingMovies.total > 0) {
            const documentId = existingMovies.documents[0].$id;

            await database.deleteDocument(
                DATABASE_ID,
                'liked_movies',
                documentId
            )

            console.log("FILME DELETADO POR EXISTIR NO BANCO DE DADOS")

            return {
                action: "deleted",
                documentId,
            };
        } else {
            await database.createDocument(
                DATABASE_ID, 
                'liked_movies', 
                ID.unique(),
                {
                    id: movie.id,
                    title: movie.title,
                    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                    genre_ids: movie.genre_ids[0],
                    isLiked: true
                }
            )

            console.log("Adicionado no BANCO DE DADOS 📁")

            return {
                action: "created",
            }
        }

        // console.log(result.documents[0]);
    } catch (error) {
        console.log(error);
    }
}