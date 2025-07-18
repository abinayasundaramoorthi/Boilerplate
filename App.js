import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Fetch movies on load
  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data.data))
      .catch(() => alert('Failed to load movies'));
  }, []);

  if (selectedMovieId) {
    return (
      <MovieDetails
        movieId={selectedMovieId}
        onBack={() => setSelectedMovieId(null)}
      />
    );
  }

  return (
    <MovieList movies={movies} onSelect={setSelectedMovieId} />
  );
}

export default App;
