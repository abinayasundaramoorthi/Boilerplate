const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const moviesFilePath = path.join(__dirname, 'movies_metadata.json');
let movies = [];

try {
  const rawData = fs.readFileSync(moviesFilePath);
  movies = JSON.parse(rawData);
} catch (error) {
  console.error('Error loading movies data:', error);
}


function getMovieById(id) {
  return movies.find((m) => String(m.id) === String(id));
}


app.get('/api/movies', (req, res) => {
  const list = movies.map(({ id, title, tagline, vote_average }) => ({
    id,
    title,
    tagline,
    vote_average: vote_average / 10,
  }));
  res.json({ data: list });
});


app.get('/api/movies/:id', (req, res) => {
  const movie = getMovieById(req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json({ data: movie });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
