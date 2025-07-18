import React, { useState, useEffect } from 'react';

export default function MovieDetails({ movieId, onBack }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/movies/${movieId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Movie not found');
        return res.json();
      })
      .then((data) => {
        setMovie(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  // Format release_date localized
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : 'N/A';

  // Calculate runtime minutes
  const runtime = movie.runtime ? `${movie.runtime} minutes` : 'N/A';

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={onBack}>Back to list</button>
      <h2>{movie.title}</h2>
      <p><b>Tagline:</b> {movie.tagline || 'N/A'}</p>
      <p><b>Rating:</b> {(movie.vote_average / 10).toFixed(1)}/10</p>
      <p><b>Release Date:</b> {releaseDate}</p>
      <p><b>Runtime:</b> {runtime}</p>
      <p><b>Overview:</b> {movie.overview || 'N/A'}</p>
      {/* Add other fields as you want */}
    </div>
  );
}
