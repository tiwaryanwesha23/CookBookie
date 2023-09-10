import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 flex flex-row justify-between items-center">
      <div className="container mx-auto flex justify-start items-center">
        <Link to="/">
          <h1 className="text-4xl text-white font-semibold">CookBookie App</h1>
        </Link>
      </div>
      <div className='flex justify-center items-center space-x-5'>
        <div className="container">
          <Link to="/breakfast">
            <h1 className="text-lg text-white font-semibold">Breakfast</h1>
          </Link>
        </div>
        <div className="container">
          <Link to="/maincourse">
            <h1 className="text-lg text-white font-semibold whitespace-nowrap">Main Course</h1>
          </Link>
        </div>
        <div className="container">
          <Link to="/dessert">
            <h1 className="text-lg text-white font-semibold">Dessert</h1>
          </Link>
        </div>
      </div>
      <div className="container mx-auto flex justify-end items-center">
        <Link to="/create-recipe">
          <button className="bg-white px-4 py-2 rounded-full text-black-900 font-semibold hover:bg-blue-200 hover:text-white transition duration-300">
            Create Recipe
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
