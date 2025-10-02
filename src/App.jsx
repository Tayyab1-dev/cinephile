// import React from "react";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import MovieContent from "./components/MovieContent";
// import ScrollToTop from "./components/ScrollToTop";
// import { MoviesProvider } from "./context/MoviesContext";
// function App() {
//   return (
//   <MoviesProvider>
//       <div className="min-h-screen text-white">
//       <Navbar />
//       <main>
//         <MovieContent />
//       </main>
//         <Footer/>
//         <ScrollToTop />
//     </div>
//   </MoviesProvider>
//   );
// }

// export default App;
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieContent from "./components/MovieContent";
import ScrollToTop from "./components/ScrollToTop";
import { MoviesProvider } from "./context/MoviesContext"; // ✅ fixed import (singular)

function App() {
  return (
    <MoviesProvider>
      <div className="min-h-screen text-white bg-neutral-900">
        <Navbar />
        <main>
          <MovieContent />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </MoviesProvider>
  );
}

export default App;
