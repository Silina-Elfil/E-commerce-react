import React from 'react'
import { useState, useEffect } from 'react';
import ProductListing from './ProductListing';
import Spinner from './Spinner';
import SideNavBar from './SideNavBar';

const ProductsListings = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(sessionStorage.getItem('selectedCategory') || null);


    const handleChangeCategory = (category) => {
            setSelectedCategory(category);
        
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products`);
                const data = await res.json();
                console.log("Fetched data:", data);
                setProducts(data.products);
            } catch (error) {
                console.log("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, products]);

    

    return (
        <>
        <div className="flex float-left">
        <SideNavBar onChangeCategory={handleChangeCategory} />
        </div>
            <div className="bg-white w-3/4 float-right">
                <div className="mx-auto max-w-2xl px-2 py-2 sm:px-2 sm:py-2 lg:max-w-7xl lg:px-6">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>
                    {
                        loading ?
                            <Spinner loading={loading} /> : (
                                filteredProducts.length > 0 ? (
                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-6">
                                    {filteredProducts.map((product) => (
                                        <ProductListing key={product.id} product={product} />
                                    ))}
                                </div>
                                ) : (
                                    <div className="text-gray-600 text-lg mt-4">No available products. </div>
                                )
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductsListings
