import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="mx-auto flex w-full items-center justify-between p-6 lg:px-8 top-0 bg-gray-100 shadow-sm" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link to="/" className="-m-1.5 p-1.5 font-bold text-lg">
          Online Store
        </Link>
      </div>
      <div className="flex gap-x-12">
        <Link to="/products" className="text-sm font-semibold leading-6 text-gray-900">Products</Link>
        <Link to="/cart" className="text-lg pt-1 font-semibold leading-6 text-gray-900">
        <FaCartPlus />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
