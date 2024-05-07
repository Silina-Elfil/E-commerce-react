import React from 'react'

const OrderSummary = ({ cart, totalPrice }) => {
    return (
        <>

            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="py-2">Item</th>
                        <th className="py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>${product.price.toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="font-semibold py-2">Total</td>
                        <td className="font-semibold py-2">${totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold py-2">Shipping</td>
                        <td className="font-semibold py-2">$5.00</td>
                    </tr>
                    <tr>
                        <td className="font-semibold py-2">Tax (8.5%)</td>
                        <td className="font-semibold py-2">${(totalPrice * 0.085).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="font-bold py-2">Order Total</td>
                        <td className="font-bold py-2">${(totalPrice + 5 + (totalPrice * 0.085)).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}

export default OrderSummary
