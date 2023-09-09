import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="container mx-auto">
        <Link to="/">
          <h1 className="text-4xl text-white font-semibold">CookBookie App</h1>
        </Link>
      </div>
      <Link to="/create-recipe">
        <button className="bg-white px-4 py-2 rounded-full text-black-900 font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
          Create Recipe
        </button>
      </Link>
    </header>
  );
};

export default Header;
