'use client';
import React, { useEffect, useState } from 'react';
import Card from './components/Card';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (meal) => {
    const updatedFavorites = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className='container mx-auto my-20'>
      <h1 className='text-3xl font-semibold text-center mb-10'>Favorite Recipes</h1>
      <div className='flex flex-wrap justify-center gap-5'>
        {favorites.length > 0 ? (
          favorites.map((meal) => (
            <Card
              key={meal.idMeal}
              meal={meal}
              isFavorite={true}
              onFavorite={() => handleRemoveFavorite(meal)}
            />
          ))
        ) : (
          <p className='text-xl text-gray-500'>No favorites added yet.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
