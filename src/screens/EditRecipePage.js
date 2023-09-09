import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Router, useParams } from 'react-router-dom';

const EditRecipePage = () => {
    const initialFormData = {
        title: '',
        ingredients: '',
        instructions: '',
        imageType: 'url',
        imageUrl: '',
        imageFile: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`https://recipe-app-server-o5kh.onrender.com/api/recipes/${id}`)
            .then((response) => {
                const { title, ingredients, instructions, image } = response.data;
                setFormData({
                    title,
                    ingredients: ingredients.join(', '),
                    instructions,
                    imageType: image.startsWith('data:image') ? 'file' : 'url',
                    imageUrl: image.startsWith('data:image') ? '' : image,
                    imageFile: null,
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching recipe:', error);
                setLoading(false);
            });
    }, [id]);

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
            image: imageData,
        };

        // Send a PUT request to update the recipe
        axios
            .put(`https://recipe-app-server-o5kh.onrender.com/api/recipes/${id}`, recipeData)
            .then(() => {
                console.log('Recipe updated');
                toast.success('Recipe updated successfully', {
                    duration: 3000,
                });
                setSubmitting(false);
                Router.push(`/recipe/${id}`);
            })
            .catch((error) => {
                console.error('Error updating recipe:', error);
            });
    };

    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto max-w-lg">
                <h1 className="text-3xl font-semibold mb-4">Edit Recipe</h1>
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
                            Update Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRecipePage;
