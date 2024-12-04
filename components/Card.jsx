import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Card({ meal, isFavorite, onFavorite }) {
  return (
    <div className='max-w-sm border-2 border-gray-300 cursor-pointer hover:border-black'>
      <Link href={`/recipe/${meal?.idMeal}`}>
        <Image src={meal?.strMealThumb} width={350} height={250} alt='meal image' />
      </Link>
      <h1 className='bg-white py-4 text-gray-500 font-semibold text-2xl text-center'>{meal?.strMeal}</h1>
      
    </div>
  );
}

export default Card;
