import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="flex bg-black p-10 justify-between items-center">
      <h1 className="text-3xl font-semibold text-white">Recipes</h1>
      <Link href="/favorites">
        <button className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200">
          Favorites
        </button>
      </Link>
    </div>
  );
}

export default Header;

