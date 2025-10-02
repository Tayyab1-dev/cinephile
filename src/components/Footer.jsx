import React from "react";

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <a href="/" className="inline-block mb-6 ">
              <span className="text-purple-500 font-bold text-2xl">
                Cine <span className="text-white">Phile</span>
              </span>
            </a>
            <p className="mb-4 text-sm">
              Discover and explore the latest movies from around the world.
              CinePhile gives you access to a vast collection of films across
              all genres.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.333-4.056 11.484-11.484 11.484-2.282 0-4.402-.662-6.187-1.797.324.037.636.05.973.05 1.884 0 3.616-.636 5-1.71a4.044 4.044 0 0 1-3.774-2.8c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.038 4.038 0 0 1-3.24-3.96v-.05c.537.299 1.149.486 1.799.511a4.03 4.03 0 0 1-1.797-3.366c0-.748.199-1.422.548-2.017a11.486 11.486 0 0 0 8.334 4.232c-.574-2.749 1.484-4.982 3.96-4.982 1.149 0 2.186.486 2.915 1.273a7.82 7.82 0 0 0 2.562-.974 4.02 4.02 0 0 1-1.773 2.23 7.897 7.897 0 0 0 2.299-.624 8.62 8.62 0 0 1-2.02 2.086z" />
                </svg>
              </a>
              <a
                href=""
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.88a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0z" />
                </svg>
              </a>
              <a
                href=""
                className="text-neutral-500 hover:text-purple-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.675 0h-21.35C.596 0 0 .596 0 
    1.325v21.351C0 23.404.596 24 1.325 
    24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 
    1.894-4.788 4.659-4.788 1.325 0 
    2.463.099 2.795.143v3.24l-1.918.001c-1.504 
    0-1.795.715-1.795 1.763v2.311h3.587l-.467 
    3.696h-3.12V24h6.116C23.404 24 24 
    23.404 24 22.676V1.325C24 .596 23.404 
    0 22.675 0z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-all">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#trending"
                  className="hover:text-purple-400 transition-all"
                >
                  Trending
                </a>
              </li>
              <li>
                <a
                  href="#popular"
                  className="hover:text-purple-400 transition-all"
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href="#top-rated"
                  className="hover:text-purple-400 transition-all"
                >
                  Top Rated
                </a>
              </li>
              <li>
                <a
                  href="#genres"
                  className="hover:text-purple-400 transition-all"
                >
                  Browse By Genre
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resourses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Stay up to date with the latest movies and news{" "}
            </p>
            <form className="space-y-3">
              <div className="relative ">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-neutral-800 border-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                />
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all text-sm">
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between">
            <p className="text-xs">
              &copy; CinePhile. All Rights reserved.{" "}
              <br className="md:hidden" />
              <span className="hidden md:inline">.</span>
              Powered by{""}
              <a href="" className="text-purple-400 hover:text-purple-300">
                TMDB API
              </a>
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-xs">
              <a href=" Privacy Policy" className="hover:text-purple-400">
                Privacy Policy
              </a>
              <a href=" Privacy Policy" className="hover:text-purple-400">
                Terms of Services
              </a>
              <a href=" Privacy Policy" className="hover:text-purple-400">
                Cookie Policy
              </a>
            </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
