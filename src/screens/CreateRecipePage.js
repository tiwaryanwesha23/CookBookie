import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateRecipePage = () => {
    const initialFormData = {
        title: '',
        ingredients: '',
        instructions: '',
        type: '',
        imageType: 'url',
        imageUrl: '',
        imageFile: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
                imageType: 'file',
            });
        } else if (name === 'ingredients') {
            const ingredientsArray = value.split(',').map((ingredient) => ingredient.trim());
            setFormData({ ...formData, [name]: ingredientsArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (submitting) {
            return;
        }
        setSubmitting(true);
        if (formData.imageType === 'file' && formData.imageFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Image = event.target.result;
                sendRecipeData(base64Image);
            };
            reader.readAsDataURL(formData.imageFile);
        } else {
            sendRecipeData(formData.imageUrl);
        }
    };

    const sendRecipeData = (imageData) => {
        const recipeData = {
          title: formData.title,
          ingredients: formData.ingredients,
          instructions: formData.instructions,
          type: formData.type,
          image: imageData,
        };
      
        axios
          .post('https://recipe-app-server-o5kh.onrender.com/api/recipes', recipeData)
          .then((response) => {
            console.log(response.data);
            toast.success('Recipe created successfully', {
              duration: 3000,
            });
            setFormData(initialFormData);
            setSubmitting(false);
          })
          .catch((error) => {
            console.error('Error creating recipe:', error);
            setSubmitting(false);
          });
      };
      

    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto max-w-lg">
                <h1 className="text-3xl font-semibold mb-4">Create Recipe</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2" htmlFor="title">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter the recipe title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2" htmlFor="ingredients">
                            Ingredients (comma-separated):
                        </label>
                        <input
                            type="text"
                            id="ingredients"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g., Ingredient 1, Ingredient 2, Ingredient 3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2" htmlFor="instructions">
                            Instructions:
                        </label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter the recipe instructions"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
  <label className="block text-gray-800 font-semibold mb-2" htmlFor="type">
    Type:
  </label>
  <select
    id="type"
    name="type"
    value={formData.type}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    required
  >
    <option value="">Select a type</option>
    <option value="breakfast">Breakfast</option>
    <option value="maincourse">Main Course</option>
    <option value="dessert">Dessert</option>
  </select>
</div>


                    {/* Toggle between image URL and file upload */}
                    <div className="mb-4">
                        <label className="block text-gray-800 font-semibold mb-2">
                            Image Source:
                        </label>
                        <div className="flex space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="imageType"
                                    value="url"
                                    checked={formData.imageType === 'url'}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                URL
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="imageType"
                                    value="file"
                                    checked={formData.imageType === 'file'}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                Upload Image
                            </label>
                        </div>
                    </div>

                    {/* Conditional rendering based on imageType */}
                    {formData.imageType === 'url' && (
                        <div className="mb-4">
                            <label className="block text-gray-800 font-semibold mb-2" htmlFor="imageUrl">
                                Image URL:
                            </label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter the image URL (optional)"
                            />
                        </div>
                    )}

                    {formData.imageType === 'file' && (
                        <div className="mb-4">
                            <label className="block text-gray-800 font-semibold mb-2" htmlFor="imageFile">
                                Upload Image:
                            </label>
                            <input
                                type="file"
                                id="imageFile"
                                name="imageFile"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold focus:outline-none"
                        >
                            Create Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipePage;
