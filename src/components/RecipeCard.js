import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xl">
      <img
        src={recipe.image || '/placeholder-image.png'}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
        <div className="text-gray-700 mb-4">
          <p className="mb-2">Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-sm"
              >
                {ingredient}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
        <Link to={`/recipe/${recipe._id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold focus:outline-none">
             View Recipe
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
