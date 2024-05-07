import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToCart from '../components/AddToCart';

const ProductPage = () => {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams();

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    

    const title = product?.title ? product.title : "untitled";
    const brand = product?.brand ? product.brand : "no brand";
    const price = product?.price ? product.price : "no price";
    const priceAfterDiscount = product?.discountPercentage ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2) : "no discount";
    const description = product?.description ? product.description : "no description";
    const stock = product?.stock ? product.stock : "0";
    const rating = product?.rating ? product.rating : "0";

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.log('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]); // Add id to dependency array

    return (
        <>
            <div className="App">
                <ToastContainer />
            </div>
            <Link to={`/products`}
                className="flex items-center text-black-500 m-5">
                <FaArrowLeft className="mr-2" />
                <span>Back to Products Page</span>
            </Link>

            {
                loading ?
                    <Spinner loading={loading} /> : (
                        <div className='w-full md:flex'>
                            <div className="w-full sm:w-1/2 p-4">
                                <div className="relative">
                                    <img
                                        src={product.images[currentImageIndex]}
                                        alt={`Product Image ${currentImageIndex + 1}`}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                                    >
                                        <FaArrowLeft />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 p-4">
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <p className="text-lg text-gray-600"> <span className="font-semibold underline">Brand:</span> {brand}</p> {/* Corrected typo */}
                                <div className="flex items-center mt-2">
                                    <p className="text-lg text-red-500 mr-2 line-through">$ {price}</p>
                                    <p className="text-lg font-bold text-green-500">$ {priceAfterDiscount}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-lg font-semibold underline">Rating:</span>
                                    <div className="ml-2">
                                        {rating}
                                    </div>
                                </div>
                                <div className="text-lg text-gray-700 mt-4">
                                    <p className='font-semibold underline'>Description:</p> {description}
                                </div>
                                <div className="mt-4">
                                    <p className="text-lg text-gray-600"><span className="font-semibold underline">Quantity Left:</span> {stock}</p> {/* Corrected typo */}
                                </div>
                                <div className="mt-4">
                                    <AddToCart product={product}/>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default ProductPage;
