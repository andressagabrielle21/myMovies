import Search from "./components/Search";
import { useMyMoviesLogic } from "./hooks/useMyMoviesLogic";
import MainPage from "./pages/MainPage";
import Favorites from "./pages/Favorites";
import { useMovieList } from "./context/useMovieList";
import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import MovieInfo from "./components/MovieInfo";

function App() {
  const {searchTerm, setSearchTerm, isPageClicked, setPageIsClicked} = useMyMoviesLogic();
  const {trendingMovies, fetchTrendingMovies} = useMovieList();

  const onClickFeed = () => {
    setPageIsClicked(prev => !prev);
  }

  useEffect(() => {
    fetchTrendingMovies();
  }, [])

  return (
    <main>
      <div className="pattern">
        <div>

          <div className="wrapper pt-0">

            <header>
              <img src="/hero-img.png" alt="" />
              <h1>Find your favorite <span className="text-gradient">Movies</span> without the hassle</h1>

              <div className="flex justify-between items-center">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
              </div>

            </header>

            {trendingMovies.length > 0 &&
              <section className="trending">
                <h2>Most Searched Movies</h2>

                <ul>
                  {trendingMovies.map((item, index) => (
                    <li key={item.id}>
                      <p>{index + 1}</p>
                      <img src={item.poster_path} alt={item.title} />
                    </li>
                  ))}
                </ul>
              </section>
            }

            <div className="all-movies">
              <div className="mt-5 flex gap-10">
                <Link to="/">
                  <h2 className={`hover:scale-90 hover:text-indigo-600 ${!isPageClicked && "text-indigo-600 underline"}`} 
                    onClick={onClickFeed}>All Movies</h2>
                </Link>

                <Link to="/favorites">
                  <h2 className={`hover:scale-90 hover:text-indigo-600 ${isPageClicked && "text-indigo-600 underline"}`} 
                    onClick={onClickFeed}>
                      Your Favorite Movies
                  </h2>
                </Link>

              </div>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/favorites" element={<Favorites />}/>
                <Route path="/movie/:id" element={<MovieInfo />} />
              </Routes>

              
            </div>

          </div>
        </div>

        </div>
    </main>
  )
}

export default App
