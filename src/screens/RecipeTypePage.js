import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeTypePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const { type } = useParams();

    var pageTitle = type.charAt(0).toUpperCase() + type.slice(1);

  useEffect(() => {
    axios.get(`https://recipe-app-server-o5kh.onrender.com/api/recipes/type/${type}`)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, [type]);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1></div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeTypePage;
