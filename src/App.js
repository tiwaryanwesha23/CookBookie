import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './screens/HomePage';
import CreateRecipePage from './screens/CreateRecipePage';
import { Toaster } from 'react-hot-toast';
import RecipeDetail from './screens/RecipeDetail';
import EditRecipePage from './screens/EditRecipePage';
import RecipeTypePage from './screens/RecipeTypePage';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/:type" element={<RecipeTypePage />} />
          <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
