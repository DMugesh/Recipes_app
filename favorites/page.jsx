'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  if (!favorites.length) {
    return <div className="text-center my-20 text-2xl">No favorite recipes yet!</div>;
  }

  return (
    <div className="container mx-auto my-20">
      <h1 className="text-3xl font-bold text-center mb-10">Favorite Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <Link href={`/recipe/${recipe.idMeal}`} key={recipe.idMeal}>
            <div className="border border-gray-300 p-4 rounded shadow hover:shadow-lg">
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={300}
                height={200}
                className="rounded"
              />
              <h2 className="text-xl font-semibold text-center mt-4">{recipe.strMeal}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
