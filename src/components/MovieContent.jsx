import React from "react";
import HeroSection from "./HeroSection";
import MovieSlider from "./MovieSlider";
import GenreSection from "./GenreSection";
import MoviesDetails from "./MoviesDetails";
import { useMovies } from "../context/MoviesContext";

function MovieContent() {
  const {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    selectedMovieId,
    closeMovieDetails,
    error,
  } = useMovies();
  if(error){
    return(
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mt-4">EroorLoading movies</h2>
          <button onClick={()=> window.location.reload()}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
              Retry

          </button>
        </div>
      </div>
    )
  
  }
  return (
    <>
      <HeroSection />
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-950">
        <MovieSlider
          title="Trending This Week"
          subtitle="Stay updated with what everyone's whatching"
          movies={trendingMovies}
          id="trending"
        />
        <MovieSlider
          title="popular Movies"
          subtitle="Most watched movies right now"
          movies={popularMovies}
          id="popular"
        />
        <GenreSection />
          <MovieSlider
          title="Top-Rated Movies"
          subtitle="Highest rsted movies of all time"
          movies={topRatedMovies}
          id="top-rated"
        />
      </div>
      {/*conditonal rendring*/}
      {selectedMovieId && <MoviesDetails movieId={selectedMovieId} onClose={closeMovieDetails}/>}
    </>
  );
}

export default MovieContent;
