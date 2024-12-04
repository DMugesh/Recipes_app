import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
// Replace this with a real database (e.g., MongoDB, MySQL) in production
let favorites = [];

// GET request to retrieve all favorite recipes
export async function GET() {
  return NextResponse.json(favorites);
}

// POST request to add a recipe to favorites
export async function POST(req) {
  const body = await req.json();
  if (!body.idMeal || !body.strMeal || !body.strMealThumb) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  favorites.push(body);
  return NextResponse.json({ message: 'Recipe added to favorites' });
}

// DELETE request to remove a recipe from favorites
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const idMeal = searchParams.get('idMeal');

  if (!idMeal) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  favorites = favorites.filter((fav) => fav.idMeal !== idMeal);
  return NextResponse.json({ message: 'Recipe removed from favorites' });
}
