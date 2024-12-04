const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let favorites = []; // Replace this with a database for production

app.use(cors());
app.use(bodyParser.json());

// Get all favorites
app.get('/api/favorites', (req, res) => {
  res.json(favorites);
});

// Add a recipe to favorites
app.post('/api/favorites', (req, res) => {
  const recipe = req.body;
  if (!favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
    favorites.push(recipe);
  }
  res.status(200).json({ message: 'Added to favorites' });
});

// Remove a recipe from favorites
app.delete('/api/favorites/:id', (req, res) => {
  const { id } = req.params;
  favorites = favorites.filter((fav) => fav.idMeal !== id);
  res.status(200).json({ message: 'Removed from favorites' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
