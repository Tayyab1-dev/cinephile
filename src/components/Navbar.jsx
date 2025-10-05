import React, { useEffect, useRef, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import { getImageURL, searchMovies } from "../services/api";

function Navbar() {
  const { openMoviesDetails } = useMovies();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuerry, setSearchQuerry] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuerry.trim().length > 2) {
        setIsSearching(true);
        try {
          const result = await searchMovies(searchQuerry);
          setSearchResult(result ? result.slice(0, 4) : []);
        } catch (error) {
          console.error("Error Searching movies", error);
        } finally {
          setIsSearching(false);
          setShowSearchResults(true);
        }
      } else {
        setSearchResult([]);
        setShowSearchResults(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuerry]);

  const handleSearchFocus = () => {
    if (searchQuerry.trim().length > 2 && searchResult.length > 0) {
      setShowSearchResults(true);
    }
  };
  
  const handleClickOutside = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setShowSearchResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMovieSelect = (movieId) => {
    openMoviesDetails(movieId);
    setShowSearchResults(false);
    setSearchQuerry("");
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-purple-500 font-bold text-3xl">
                Cine <span className="text-white">Phile</span>
              </span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-white hover:text-purple-400 transition-all font-medium "
            >
              Home
            </a>
            <a
              href="#trending"
              className="text-white hover:text-purple-400 transition-all font-medium "
            >
              Trending
            </a>
            <a
              href="#popular"
              className="text-white hover:text-purple-400 transition-all font-medium "
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="text-white hover:text-purple-400 transition-all font-medium "
            >
              Top Rated
            </a>
          </nav>
          
          <div
            className="hidden md:block relative search-container"
            ref={searchContainerRef}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuerry}
                onChange={(e) => setSearchQuerry(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Search Movies..."
                className="bg-neutral-800/50 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              
              {isSearching ? (
                <div className="absolute right-3 top-2.5">
                  <svg
                    className="w-4 h-4 text-neutral-400 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 absolute right-3 top-3 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
            
            {showSearchResults && searchResult && searchResult.length > 0 && (
              <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                <ul className="divide-y divide-neutral-700">
                  {searchResult.map((movie) => {
                    return (
                      <li key={movie.id} className="hover:bg-neutral-700"> 
                        <button
                          className="flex items-center p-3 w-full text-left"
                          onClick={() => handleMovieSelect(movie.id)}
                        >
                          <div className="w-10 h-10 bg-neutral-700 rounded overflow-hidden flex shrink-0">
                            
                            {movie.poster_path ? (
                              <img
                                src={getImageURL(movie.poster_path, "w92")}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                No Image
                              </div>
                            )}

                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-white truncate">
                              {movie.title}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {movie.release_date?.split("-")[0] || "N/A"} 
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            
            {showSearchResults &&
              searchQuerry.trim().length > 2 &&
              (!searchResult || searchResult.length === 0) &&
              !isSearching && (
                <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className=" p-4 text-center text-neutral-400 text-sm">
                    No Movies Found Matching ......
                  </div>
                </div>
              )}
          </div>
          
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          >
            
            {isMobileMenuOpen ? ( 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                viewBox="0 0 24 24"
                stroke="currenColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                viewBox="0 0 24 24"
                stroke="currenColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        
        {isMobileMenuOpen && ( 
          <div className="mt-4 pb-4 space-y-4 md:hidden">
            <a
              href="#"
              className="block text-white hover:text-purple-400 transition-colors py-2 "
            >
              Home
            </a>
            <a
              href="#trending"
              className="text-white hover:text-purple-400 transition-all font-medium "
            >
              Trending
            </a>
            <a
              href="#popular"
              className="text-white hover:text-purple-400 transition-all font-medium "
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="text-white hover:text-purple-400 transition-all font-medium "
            >
              Top Rated
            </a>
            <div
              className="relative mt-3 search-container"
              ref={searchContainerRef}
            >
              <input
                type="text"
                value={searchQuerry}
                onChange={(e) => setSearchQuerry(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Search Movies..."
                className="bg-neutral-800/50 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              
              {isSearching ? (
                <div className="absolute right-3 top-2.5">
                  <svg
                    className="w-4 h-4 text-neutral-400 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 absolute right-3 top-3 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              
              {showSearchResults && searchResult && searchResult.length > 0 && (
                <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <ul className="divide-y divide-neutral-700">
                    
                    {searchResult.map((movie) => {
                      return (
                        <li key={movie.id} className="hover:bg-neutral-700"> 
                          <button 
                            className="flex items-center p-3 w-full text-left"
                            onClick={() => handleMovieSelect(movie.id)}
                          >
                            <div className="w-10 h-10 bg-neutral-700 rounded-full overflow-hidden flex-shrink-0">
                                {movie.poster_path ? (
                                    <img
                                        src={getImageURL(movie.poster_path, "w92")}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-white truncate">
                                {movie.title}
                              </p>
                              <p className="text-xs text-neutral-400">
                                {movie.release_date?.split("-")[0] || "N/A"} 
                              </p>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              
              {showSearchResults &&
                searchQuerry.trim().length > 2 &&
                (!searchResult || searchResult.length === 0) &&
                !isSearching && (
                  <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-4 text-center text-neutral-400 text-sm">
                      No Movies found matching......
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar; 