import { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchIcon from './assets/search.svg';
import MovieCard from './MovieCard';
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil';

const API_URL = "https://www.omdbapi.com?apikey=fef2e9a7";

// Atom to manage the search term in Recoil state
const searchTerm = atom({
  key: 'searchTermState',
  default: '',
});

function SearchInputComponent({ searchMovies }) {
  const searchTermValue = useRecoilValue(searchTerm); // Get the search term from Recoil state
  const setSearchTerm = useSetRecoilState(searchTerm); // Set the search term in Recoil state
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTermValue); // Trigger search on Enter
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search For Movies"
        value={searchTermValue}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
        onKeyDown={handleKeyDown} //call the enter press function
      />
      <img
        src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTermValue)} // Trigger search with the search term
      />
    </>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Memoize the searchMovies function to prevent re-creation on each render
  const searchMovies = useCallback(async (title) => {
    setLoading(true); // Start loading
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false); // Stop loading
  }, []); // Empty dependency array ensures searchMovies is not recreated on every render

  // Fetch movies on initial load (default "superman" search)
  useEffect(() => {
    searchMovies("superman");
  }, [searchMovies]); // Dependency array ensures searchMovies is stable

  return (
    <RecoilRoot>
      <div className="app">
        <h1>MOVIE LAND</h1>
        <div className="search">
          <SearchInputComponent searchMovies={searchMovies} />
        </div>

        {loading ? (
          <div className="empty">
            <h2>Loading...</h2>
          </div> // Show loading message while fetching data
        ) : movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} /> // Each MovieCard should have a unique key
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>NO MOVIES FOUND</h2>
          </div>
        )}
      </div>
    </RecoilRoot>
  );
}

export default App;
