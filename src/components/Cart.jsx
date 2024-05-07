import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ product, cart, setCart }) => {

    const removeFromCart = (productId) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this product from your cart?");
        if (isConfirmed) {
            const updatedCart = cart.filter(product => product.id !== productId);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Product removed successfully');
        } else {
            toast.error('Failed to remove the product');
        }
    };

    return (
        <>
            <div className="App">
                <ToastContainer />
            </div>
            <div key={product.id} className="border p-4 rounded-md flex items-center mb-2">
                <img src={product.thumbnail} className="w-16 h-16 mr-4 object-cover rounded" alt={`Product Thumbnail`} />
                <div>
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <button onClick={() => removeFromCart(product.id)} className="text-red-500"><FaTrash /></button>
                </div>
            </div>
        </>
    )
}

export default Cart
