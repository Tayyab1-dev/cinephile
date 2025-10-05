import React, { useState, useRef } from "react";
import { getImageURL } from "../services/api";
import { useMovies } from "../context/MoviesContext";

// Destructure 'id' from the props
function MovieSlider({ title, movies, subtitle = "", id }) { 
  const sliderRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredMovieId, setHoveredMoviesId] = useState(null);
  const { openMoviesDetails } = useMovies();

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (!current) return; 

    const scrollAmount = (direction === "left"
      ? -current.clientWidth * 0.75
      : current.clientWidth * 0.75);
      
    setIsScrolling(true); 

    current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 500); 
  };
  
  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };
  
  const handleMovieClick = (moviesId) => {
    openMoviesDetails(moviesId);
  };
  
  if (!movies || movies.length === 0) {
    return null;
  }
  
  return (
    // *** FIX: Apply the 'id' prop to the main section element ***
    <section id={id} className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between mb-8">
          <div className="text-2xl md:text-3xl font-bold text-white">
            <h2>{title}</h2>
            {/*Conditional Rendering*/}
            {subtitle && (
              <p className="text-neutral-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              className=" p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all disabled:opacity-50"
              aria-label="Scroll left"
              onClick={() => scroll("left")}
              disabled={isScrolling} // Disable button while scrolling
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all disabled:opacity-50"
              aria-label="Scroll right"
              onClick={() => scroll("right")}
              disabled={isScrolling} // Disable button while scrolling
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/*Movie Slider*/}
        <div className="relative">
          <div
            className=" flex space-x-4 scrollbar-hide pb-4 snap-x overflow-x-auto" 
            ref={sliderRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/*conditional rendering */}
            {movies.map((movie) => {
              return (
                <div
                  className="min-w-[200px] md:min-w-[240px] snap-start relative group cursor-pointer"
                  key={movie.id}
                  onMouseEnter={() => setHoveredMoviesId(movie.id)}
                  onMouseLeave={()=>setHoveredMoviesId(null)}
                  onClick={()=> handleMovieClick(movie.id)}
                >
                  <div className="rounded-lg overflow-hidden bg-neutral-800">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={getImageURL(movie.poster_path, "w500")}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35"
                      />

                      {/* Hover overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300`}
                      >
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3">
                          <div className="flex items-center justify-between ">
                            <div className="flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-yellow-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c-.3-.921-1.603-.921-1.902 0l-.758 2.343a1 1 0 01-.95.69H3.45c-.969 0-1.371 1.24-.588 1.81l1.958 1.42a1 1 0 01.364 1.118l-.75 2.293c-.3.92.755 1.688 1.54 1.118l1.958-1.42a1 1 0 011.175 0l1.958 1.42c.785.57 1.84-.197 1.54-1.118l-.75-2.293a1 1 0 01.364-1.118l1.958-1.42c.783-.57.38-1.81-.588-1.81h-2.689a1 1 0 01-.95-.69l-.758-2.343z" />
                              </svg>
                              <span className=" text-yellow-400 text-sm font-medium">
                                {formatRating(movie.vote_average)}
                              </span>
                            </div>
                            <span className="text-neutral-400 text-sm">
                              {movie.release_date?.substring(0,4) || "N/A"}
                            </span>
                          </div>
                          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* movies Info */}
                  <div className="mt-3">
                    <h3 className=" text-white text-sm font-medium truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.944a1 1 0 0 0 .95.69h4.146c.969 0 1.371 1.24.588 1.81l-3.356 2.44a1 1 0 0 0-.364 1.118l1.286 3.944c.3.921-.755 1.688-1.54 1.118l-3.356-2.44a1 1 0 0 0-1.175 0l-3.356 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.944a1 1 0 0 0-.364-1.118L2.08 9.371c-.783-.57-.38-1.81.588-1.81h4.146a1 1 0 0 0 .95-.69l1.286-3.944z" />
                        </svg>
                        <span className="text-neutral-400 text-xs"> {formatRating(movie.vote_average)}</span>
                      </div>
                      <span className="text-neutral-500 text-xs">
                        {movie.release_date?.substring(0, 10) || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieSlider;