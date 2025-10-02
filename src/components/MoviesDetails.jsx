import React, { useEffect, useState } from "react";
import { fetchMovieDetails, getImageURL } from "../services/api";
import { Currency, Languages } from "lucide-react";

function MoviesDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    async function getMoviesDetails() {
      try {
        setIsLoading(true);
        setIsError(null); // Reset error state on new fetch

        const movieData = await fetchMovieDetails(movieId);
        
        setMovie(movieData);
      } catch (err) {
        console.error("Failed to load movie details:", err);
        setIsError("Network error or failed to retrieve movie details.");
        setMovie(null); // Ensure movie is null on error
      } finally {
        setIsLoading(false);
      }
    }
    
    getMoviesDetails();
  }, [movieId]);

  if (!movieId) return null;

  const formatRunTime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  
  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };
  
  const formatRevenue = (revenue) => {
    if (!revenue) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(revenue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/95 backdrop-blur-sm overflow-y-auto ">
      <div className="relative w-full max-w-5xl bg-neutral-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-700/80 text-white hover:bg-neutral-600/80    transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 1. LOADING STATE */}
        {loading && (
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse flex flex-col items-center">
              {/* Note: Moved <p> outside the spinner div for proper display, kept within loading block */}
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white">Loading Details............</p>
            </div>
          </div>
        )}
        
        {/* 2. ERROR STATE */}
        {!loading && error && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-bold mt-4">
                Failed to Load Movies Details
              </h2>
              <p className="mt-2 text-neutral-400">{error}</p>
              <button
                onClick={onClose}
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* 3. MOVIE CONTENT STATE (Only render if NOT loading AND we have the movie object) */}
        {!loading && movie && (
          <div>
            <div className="relative h-72 md:h-96 w-full">
              {/* THIS IS WHERE THE ERROR WAS. It is now safely inside an 'if (movie)' block. */}
              {movie.backdrop_path ? (
                <img
                  src={getImageURL(movie.backdrop_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-700"></div>
              )}

              {/* gradient overlay*/}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 via-neutral-800/70 to-transparent"></div>
            </div>

            <div className="p-6 md:p-8">
              <div className="md:flex gap-8 -mt-32 md:-mt-48 relative">
                {/*poster*/}
                <div className="w-32 md:w-64 flex-shrink-0 mb-4 md:mb-0">
                  <div className="rounded-lg overflow-hidden shadow-lg border border-neutral-700">
                    {movie.poster_path ? (
                      <img
                        src={getImageURL(movie.poster_path, "w500")}
                        alt={movie.title}
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-neutral-700 flex items-center justify-center">
                        <span className="text-neutral-500">
                          {" "}
                          No Poster Available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/*Movies info*/}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {movie.title}
                    {movie.release_date && (
                      <span className="text-neutral-400 font-normal ml-2">
                        ({movie.release_date.substring(0, 4)})
                      </span>
                    )}
                  </h1>

                  {/*rating and another meta*/}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm items-center">
                    {movie.vote_average > 0 && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.287 3.958c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.785.57-1.84-.196-1.54-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.075 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.959z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span className="ml-1 font-medium">
                          {formatRating(movie.vote_average)}
                        </span>
                      </div>
                    )}
                    {movie.runtime > 0 && (
                      <span className="text-neutral-300">
                        {formatRunTime(movie.runtime)}
                      </span>
                    )}
                    {movie.release_date && (
                      <span className="text-indigo-300">
                        {movie.release_date}
                      </span>
                    )}
                    {movie.adult && (
                      <span className="bg-red-500/50 text-white text-xs px-2 py-0.5 rounded">
                        18+
                      </span>
                    )}
                  </div>

                  {movie.genres && movie.genres.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-xs"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Tagline */}
                  {movie.tagline && (
                    <p className="mt-4 text-neutral-400 italic">
                      "{movie.tagline}"
                    </p>
                  )}

                  {/* Overview */}
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      Overview
                    </h2>
                    <p className="text-neutral-300">
                      {movie.overview || "No Overview Avalabile"}
                    </p>
                  </div>
                  {/* button */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>
                      Watch Now
                    </button>
                    <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add to Watch List
                    </button>
                  </div>
                </div>
              </div>
              {/* additional details */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Details
                  </h2>
                  <div className="space-y-4">
                    {movie.production_companies &&
                      movie.production_companies.length > 0 && (
                        <div>
                          <h3 className="text-neutral-400 text-sm mb-1">
                            Production Companies
                          </h3>
                          <p className="text-white">
                            {movie.production_companies
                              .map((company) => company.name)
                              .join(",")}
                          </p>
                        </div>
                      )}
                    {movie.production_countries &&
                      movie.production_countries.length > 0 && (
                        <div className="text-neutral-400 text-sm mb-1">
                          <h3 className="text-neutral-400 text-sm mb-1">
                            Production Countries
                          </h3>
                          <p className="text-white">
                            {movie.production_countries
                              .map((country) => country.name)
                              .join(",")}
                          </p>
                        </div>
                      )}

                    {movie.spoken_languages &&
                      movie.spoken_languages.length > 0 && (
                        <div className="text-neutral-400 text-sm mb-1">
                          <h3 className="text-neutral-400 text-sm mb-1">
                            Languages
                          </h3>
                          <p className="text-white">
                            {movie.spoken_languages
                              .map((Language) => Language.english_name)
                              .join(",")}
                          </p>
                        </div>
                      )}
                    {movie.budget > 0 && (
                      <div className="text-neutral-400 text-sm mb-1">
                        <h3 className="text-neutral-400 text-sm mb-1">
                          Budget
                        </h3>
                        <p className="text-white">
                          {formatRevenue(movie.budget)}
                        </p>
                      </div>
                    )}
                    {movie.revenue > 0 && (
                      <div className="text-neutral-400 text-sm mb-1">
                        <h3 className="text-neutral-400 text-sm mb-1">
                          Revenue
                        </h3>
                        <p className="text-white">
                          {formatRevenue(movie.revenue)}
                        </p>
                      </div>
                    )}
                    {movie.status && (
                      <div className="text-neutral-400 text-sm mb-1">
                        <h3 className="text-neutral-400 text-sm mb-1">
                          Status
                        </h3>
                        <p className="text-white">{movie.status}</p>
                      </div>
                    )}
                    {movie.original_language && (
                      <div className="text-neutral-400 text-sm mb-1">
                        Original Language
                        <p className="text-white">
                          {movie.original_language.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Right Column */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4 ">
                    Rating
                  </h2>
                  {movie.vote_average > 0 ? (
                    <div className=" flex items-center">
                      <div className="w-24 rounded-full border-4 border-purple-500 flex items-center justify-center mr-4">
                        <span className="text-3xl font-bold">
                          {formatRating(movie.vote_average)}
                        </span>
                      </div>
                      <div>
                        <p className="text-neutral-300">
                          From {movie.vote_count.toLocaleString()}votes
                        </p>
                        <div className="w-full bg-neutral-700 rounded-full h-2.5 mt-2">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{
                              width: `${(movie.vote_average / 10) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-400">No Rating Available</p>
                  )}
                </div>
                {/* Imdb and Homepage links */}
                <div className="mt-8 space-y-4">
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9 9 9 0 010-18c5.657 0 9 3.343 9 9zm-9-3a3 3 0 100 6 3 3 0 000-6z"
                        />
                      </svg>
                      Official Website
                    </a>
                  )}

                  {movie.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.382 10.13c-.039-.086-.155-.181-.193-.085-.042-.21-.602-.379-.065-.471l.723-.392c.172 0 .304-.073.086-.047-.148-.113-.193-.204-.069-.214.07-.366v-.468c0-.536-.028-.274-.074-.36z" />
                      </svg>
                      View On IMDB
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesDetails;