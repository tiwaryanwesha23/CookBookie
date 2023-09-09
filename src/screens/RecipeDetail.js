import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteRecipe = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {  
      axios
        .delete(`http://localhost:3000/api/recipes/${id}`)
        .then(() => {
          toast.success('Recipe deleted successfully', {
            duration: 3000,
          });
        })
        .catch((error) => {
          // Handle errors and show an error message
          console.error('Error deleting recipe:', error);
          toast.error('Error deleting recipe');
        })
    }
  };
  
  

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>    
          <div className="mb-4">
            <img
              src={recipe.image || '/placeholder-image.png'}
              alt={recipe.title}
              className="w-full h-72 object-cover rounded-lg mb-4"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <div className="text-gray-700 mb-4">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
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
          <div className="text-gray-700 mb-4">
            <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
            <p>{recipe.instructions}</p>
          </div>
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold focus:outline-none">
              <Link to="/">Back to Recipe List</Link>
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full font-semibold ml-4 focus:outline-none"
              onClick={handleDeleteRecipe}
            >
              Delete Recipe
            </button>
            <Link
              to={`/edit-recipe/${id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-full font-semibold ml-4 inline-block focus:outline-none"
            >
              Edit Recipe
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
