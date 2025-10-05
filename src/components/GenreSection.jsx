import React, { useEffect, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import { getImageURL, fetchMoviesByGenre } from "../services/api";

function GenreSection() {
    const { genres, loading, openMoviesDetails } = useMovies();
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genreMovies, setGenreMovies] = useState([]);
    // FIX: Renamed state variable from loadingGenreMovies to prevent conflict 
    // with the function of the same name later in the code.
    const [isLoadingGenreMovies, setIsLoadingGenreMovies] = useState(false); 

    useEffect(() => {
        // FIX: Added a check for genres existence and array status
        if (!loading && genres && genres.length > 0) {
            setSelectedGenre(genres[0]);
        }
    }, [loading, genres]); 

    useEffect(() => {
        const loadGenreMovies = async () => { // Renamed the function
            if (!selectedGenre) return;
            // FIX: Use the correct state setter for the loading state
            setIsLoadingGenreMovies(true); 
            try {
                const movies = await fetchMoviesByGenre(selectedGenre.id);
                // The API fetch might return 'results' or the array directly, 
                // but assuming it returns an object with a 'results' array:
                const movieResults = movies?.results || movies || []; 
                setGenreMovies(movieResults.slice(0, 8));
            } catch (error) {
                console.error("Failed to fetch movies by genre:", error);
                setGenreMovies([]); // Clear movies on error
            } finally {
                // FIX: Use the correct state setter
                setIsLoadingGenreMovies(false); 
            }
        };
        loadGenreMovies();
    }, [selectedGenre]);

    if (loading || !selectedGenre) {
        return (
            <section className="py-12 bg-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-pulse">
                            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
    const formatRating = (rating) => {
        return (Math.round(rating * 10) / 10).toFixed(1);
    };

    return (
        <section className="py-12 bg-neutral-900/50 " id="genre-section">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    Browse by Genre
                </h2>
                {/* genre tabs */}
                <div className="mb-8 overflow-x-auto pb-2">
                    <div className="flex space-x-2 min-w-max">
                        {/* Use (genres || []) for safe slicing and mapping */}
                        {(genres || []).slice(0, 10).map((gen) => {
                            return (<button
                                key={gen.id} // Added key for list items
                                className={`px-4 py-2 rounded-md transition-colors text-sm ${selectedGenre?.id === gen.id ? "bg-purple-600 text-white" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"}`}
                                onClick={() => setSelectedGenre(gen)}
                            >
                                {gen.name}
                            </button>);
                        })}
                    </div>
                </div>
                {/*conditional rendering */}
                {isLoadingGenreMovies ? (<div className="h-64 flex items-center justify-center ">
                    <div className="animate-pulse">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {/*map method*/}
                    {genreMovies.map((movie) => {
                        return (<div key={movie.id} className="group cursor-pointer" onClick={() => openMoviesDetails(movie.id)}>
                            <div className="relative rounded-lg overflow-hidden bg-neutral-800">
                                <div className="aspect-[2/3]">
                                    {/* ... rest of movie card JSX ... */}
                                    <img
                                        src={getImageURL(movie.poster_path, "w500")}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                        <div className="flex items-center justify-between">
                                            {/* ... rating and date display ... */}
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.36 2.444c-.784.57-1.838-.197-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.98 8.257c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 00.95-.69L9.049 2.927z" />
                                                </svg>
                                                <span className="text-yellow-400 text-sm font-medium">
                                                    {formatRating(movie.vote_average)}
                                                </span>
                                            </div>
                                            <span className="text-neutral-400 text-sm">
                                                {movie.release_date?.substring(0, 4) || "N/A"}
                                            </span>
                                        </div>
                                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md flex items-center justify-center gap-1 transition-all text-sm">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-0.445-10.832l3.22 3.22a.75.75 0 01-1.06 1.06l-2.69-2.69-2.69 2.69a.75.75 0 01-1.06-1.06l3.22-3.22a.75.75 0 011.06 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            View Details
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="mt-3">
                                <h3 className="text-white text-sm font-medium truncate">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 text-yellow-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"

                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.36 2.444c-.784.57-1.838-.197-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.98 8.257c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 00.95-.69L9.049 2.927z" />
                                        </svg>
                                        <span className="text-neutral-400 text-xs">{formatRating(movie.vote_average)}</span>
                                    </div>
                                    <span className="text-neutral-500 text-xs">{movie.release_date?.substring(0, 4) || "N/A"}</span>
                                </div>
                            </div>
                        </div>);
                    })}

                </div>)}

            </div>
        </section>
    );
}

export default GenreSection;