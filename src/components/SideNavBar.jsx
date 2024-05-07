import React, { useState, useEffect } from 'react';

const SideNavBar = ({ onChangeCategory }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(sessionStorage.getItem('selectedCategory') || null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        sessionStorage.setItem('selectedCategory', category);
        const filtered = category === 'All' ? products : products.filter(product => product.category === category);
        setFilteredProducts(filtered);
       
    };

    return (
        <div className="w-64 bg-gray-200 p-5">
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <ul>
                <li
                    key="All"
                    onClick={() => {handleCategoryClick('All'); onChangeCategory('All')}}
                    className={`cursor-pointer hover:text-blue-500 pl-4 ${selectedCategory === 'All' ? 'font-bold' : ''}`}
                >
                    All
                </li>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => { onChangeCategory(category); handleCategoryClick(category) }}
                        className={`cursor-pointer hover:text-blue-500 pl-4 ${category === selectedCategory ? 'font-bold' : ''}`}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideNavBar;
