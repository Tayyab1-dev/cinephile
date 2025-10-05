import React, { startTransition, useEffect, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import { getImageURL } from "../services/api";

function HeroSection() {
    const { trendingMovies, loading } = useMovies();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransittioning, setIsTransittioning] = useState(false);
    console.log(getImageURL);

    // FIX: Define featuredMovies inside the component body,
    // ensuring trendingMovies is treated as an empty array if undefined 
    // to prevent the 'slice' error on initial render.
    const featuredMovies = (trendingMovies || []).slice(0, 5); 

    useEffect(() => {
        // If loading is true OR if we have no featured movies, exit early
        if (loading || featuredMovies.length === 0) return;

        const interval = setInterval(() => {
            setIsTransittioning(true);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
                setIsTransittioning(false);
            }, 500);
        }, 8000);

        return () => clearInterval(interval);
    }, [loading, featuredMovies.length]);

    // Note: The logic below for the loading state is still correct and serves as 
    // the main safeguard, but the fix above addresses the immediate runtime error.
    if (loading || featuredMovies.length === 0) {
        return (
            <div className="relative w-full h-screen flex items-center justify-center bg-neutral-900">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-neutral-400">Loading movies...</p>
                </div>
            </div>
        );
    }
    
    // ... rest of the component remains the same
    const currentMovie = featuredMovies[currentSlide];
    const formatRating = (rating) => {
        return (Math.round(rating * 10) / 10).toFixed(1);
    };
    
    return (
        <div className="relative w-full h-screen">
            {/*Movies Backdrop*/}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-neutral-900 transition-all duration-700 ${
                    isTransittioning ? "opacity-0" : "opacity-100"
                }`}
                style={{
                    backgroundImage: `url(${getImageURL(currentMovie.backdrop_path)})`,
                }}
            >
                {/*Graidient overlay*/}
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/70 to-neutral-900/20" />
                <div className="absolute inset-0  bg-gradient-to-r from-neutral-900 to-transparent" />
            </div>
            {/*Content*/}
            <div className="absolute inset-0 flex items-center z-10 container mx-auto px-4">
                <div className="max-w-3xl">
                    {/*movies info*/}
                    <div
                        className={`transition-all  duration-700 ${
                            isTransittioning ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <span
                                className="bg-purple-500/90 text-white text-xs font-semibold px-2
                 py-1 rounded-sm"
                            >
                                FEATURED
                            </span>
                            {/* Conditional Rendering */}
                            {currentMovie.vote_average > 0 && (
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-yellow-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c-.3-.921 1.603-.921 1.902 0l.588 
        1.813a1 1 0 00.95.69h1.905c.969 0 
        1.371 1.24.588 1.81l-1.54 1.118a1 
         1 0 00-.364 1.118l.587 1.813c.3.921-.755 
         1.688-1.54 1.118l-1.541-1.118a1 1 0 
         00-1.175 0l-1.541 1.118c-.784.57-1.838-.197-1.539-1.118l.586-1.813a1 
         1 0 00-.364-1.118L2.98 7.24c-.783-.57-.38-1.81.588-1.81h1.905a1 
         1 0 00.95-.69l.588-1.813z"
                                        />
                                    </svg>
                                    <span>{formatRating(currentMovie.vote_average)}</span>
                                </div>
                            )}
                            {/* conditional rendering Close */}
                            <span className="text-neutral-400">.</span>
                            <span className="text-neutral-300 text-sm">
                                {currentMovie.release_date?.substring(0, 4) || "N/A"}
                            </span>
                            {/* Consitional rendering */}
                            {currentMovie.adult && (<>
                                <span className=" text-neutral-400">.</span>
                                <span className=" bg-neutral-700 text-neutral-300 text-xs px-11.5 py-0.5">
                                    
                                </span>
                            </>)}
                            {/*Conditional rendering close */}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {currentMovie.title}
                        </h1>
                        <p className="text-neutral-300 text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-4 max-w-2xl">
                            {currentMovie.overview}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 30"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Watch Now
                            </button>
                            <button
                                className="bg-neutral-800/80 hover:bg-neutral-700/80 text-white px-6
            py-3 rounded-lg flex items-center gap-2 transition-all border border-neutral-600"
                            >
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
            </div>
            {/*pagination*/}
            <div className=" absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
                {featuredMovies.map((_, index) => {
                    return (
                        <button key={index} onClick={() => {
                            setIsTransittioning(true);
                            setTimeout(() => {
                                setCurrentSlide(index);
                                setIsTransittioning(false)
                            }, 500);
                        }} className={`h-1.5 rounded-full transition-all ${currentSlide === index ? "w-8 bg-purple-500" : "w-4 bg-neutral-600/50"}`}></button>
                    )
                })}
            </div>
        </div>
    );
}

export default HeroSection;