import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddToCart = ({ product, onClick }) => {
    const addToCart = (e) => {
        e.stopPropagation();
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductInCart = existingCart.some(item => item.id === product.id);

        if (isProductInCart) {
            toast.error('Product is already in cart');
        } else {
            const updatedCart = [...existingCart, product];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Product added successfully');
        }
    };

    return (
        <>
            <ToastContainer />

            <button onClick={(e) => { addToCart(e); onClick && onClick(e); }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
            </button>
        </>
    )
}

export default AddToCart
