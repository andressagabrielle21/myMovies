import { useEffect } from "react"
import { useMovieList } from "../context/useMovieList"
import { useParams } from "react-router-dom";

const MovieInfo = () => {
    const {fetchMovieInfo, movieInfo} = useMovieList();

    const {id} = useParams();
    console.log(movieInfo)
    
    useEffect(() => {
        fetchMovieInfo(id as string);
    }, [id]);

    return (
        <div className="flex flex-col items-start max-md:items-center justify-center gap-3 mt-6">
            <h2 className="text-5xl font-bold text-white max-md:text-center">{movieInfo?.title}</h2>

            <div className="flex gap-3 text-gray-100 max-md:items-center">
                <p>{movieInfo?.release_date.substring(0, 4)}</p>
                <span>•</span>
                <p>{movieInfo?.runtime}min</p>
                <span>•</span> 
                <div className="flex gap-1.5 items-center">
                    <img src="/star.png" className="w-full h-4" />
                    <p>{movieInfo?.vote_average ? movieInfo?.vote_average.toFixed(1) : "N/A"}</p>
                </div>
            </div>

            <div className="flex flex-col gap-8 md:items-start w-[80%]">
                <div className="flex justify-center gap-20">
                    <img src={movieInfo?.poster_path ? `https://image.tmdb.org/t/p/w500/${movieInfo?.poster_path}` 
                        : '/not-available.png'}
                        alt={movieInfo?.title} 
                        className="rounded-lg max-h-80"
                    />

                    <img src={movieInfo?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movieInfo?.backdrop_path}`
                        : '/not-available.png'
                        } alt={movieInfo?.original_title}
                        className="rounded-lg max-md:hidden"
                    />
                </div>
                    
                <div className="flex gap-25 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Genres: </span>
                    <div className="flex gap-2 flex-wrap">
                        {movieInfo?.genres.map((item) => (
                            <div className="bg-amber-50/50 rounded-lg py-1 px-2">
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-20 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Overview: </span>
                    <p className="text-white">
                        {movieInfo?.overview}
                    </p>
                </div>

                <div className="flex gap-12 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Release date: </span>
                    <p className="text-white">
                        {movieInfo?.release_date}
                    </p>
                </div>

                <div className="flex gap-19 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Countries: </span>
                    <div className="flex gap-2 flex-wrap">
                        {movieInfo?.production_countries.map((item) => (
                            <div className="bg-amber-50/50 rounded-lg py-1 px-2">
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-26 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Status: </span>
                    <p className="text-white">
                        {movieInfo?.status}
                    </p>
                </div>

                <div className="flex gap-18 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Language: </span>
                    <div className="flex gap-2 text-white flex-wrap">
                        {movieInfo?.spoken_languages.map((item) => (
                            // <div className="bg-amber-50/50 rounded-lg py-1 px-2">
                                <p>{item.name} • </p>
                            // </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-24 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Budget: </span>
                    <p className="text-white">
                        ${movieInfo?.budget} Million
                    </p>
                </div>

                <div className="flex gap-21 max-md:flex-col max-md:gap-2">
                    <span className="text-xl font-bold text-gray-100">Revenue: </span>
                    <p className="text-white">
                        ${movieInfo?.revenue} Million
                    </p>
                </div>

                <div className="flex gap-18 max-md:flex-col max-md:gap-2 max-md:flex-wrap">
                    <span className="text-xl font-bold text-gray-100 text-wrap">Production Companies: </span>
                    <div className="flex gap-2 text-white flex-wrap">
                        {movieInfo?.production_companies.map((item) => (
                            // <div className="bg-amber-50/50 rounded-lg py-1 px-2">
                                <p>{item.name} • </p>
                            // </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MovieInfo
