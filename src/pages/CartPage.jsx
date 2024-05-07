import React, { useState, useEffect } from 'react';
import Cart from '../components/Cart';
import OrderSummary from '../components/OrderSummary';

const CartPage = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cart.reduce((acc, product) => acc + product.price, 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <>
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <div className="border p-4 rounded-md">
                                <OrderSummary cart={cart} totalPrice={totalPrice} />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Checkout</button>
                            </div>
                        </div>
                        <div>
                            {cart.map((product) => (
                                <Cart key={product.id} product={product} cart={cart} setCart={setCart} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
