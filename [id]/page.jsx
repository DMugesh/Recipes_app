'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

async function getData(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default function RecipeDetail({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const recipeData = await getData(id);
      setData(recipeData);

      // Check if the recipe is already in favorites
      const res = await fetch('/api/favorites');
      const favorites = await res.json();
      setIsFavorite(favorites.some((fav) => fav.idMeal === id));
    };
    fetchData();
  }, [id]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        await fetch(`/api/favorites?idMeal=${id}`, { method: 'DELETE' });
      } else {
        // Add to favorites
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idMeal: id,
            strMeal: data.meals[0].strMeal,
            strMealThumb: data.meals[0].strMealThumb,
          }),
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto my-20">
      <div className="flex border-2 border-gray-300 p-4">
        <div className="relative w-[50%] h-[500px] mr-8">
          <Image
            src={data.meals[0]?.strMealThumb}
            layout="fill"
            objectFit="cover"
            alt="Meal Image"
          />
        </div>

        <div className="w-[50%]">
          <h1 className="bg-white py-4 text-gray-500 font-semibold text-2xl text-center mb-4">
            {data.meals[0]?.strMeal}
          </h1>

          <button
            onClick={handleFavorite}
            className={`w-full py-2 mb-4 ${
              isFavorite ? 'bg-red-500' : 'bg-gray-300'
            } text-white font-bold`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <div className="bg-white p-4 mb-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
              const ingredient = data.meals[0][`strIngredient${index}`];
              const measurement = data.meals[0][`strMeasure${index}`];

              if (ingredient && measurement) {
                return (
                  <div key={index} className="mb-2">
                    <span className="font-semibold">{ingredient}:</span> {measurement}
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="bg-white p-4 mb-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">Steps:</h2>
            <ol className="list-decimal pl-4">
              {data.meals[0]?.strInstructions.split('\r\n').map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {data.meals[0]?.strYoutube && (
            <div className="mb-4">
              <iframe
                width="100%"
                height="315"
                src={data.meals[0]?.strYoutube.replace('watch?v=', 'embed/')}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
