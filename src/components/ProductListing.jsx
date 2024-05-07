import React from 'react'
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

const ProductListing = ({ product }) => {
    return (
        <>
            <Link
                to={`/products/${product.id}`}
            >
                <div className="group relative bg-gray-100 rounded-md shadow-md">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img src={product.thumbnail}
                            alt="Product Image"
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                    </div>
                    <div className="px-2 pt-4 pb-2">
                        <p className='text-sm text-gray-700'>{product.title}</p>
                    </div>
                    <div className="px-2 pb-2 flex justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900 line-through">{product.price}$</p>
                            <p className="text-sm font-medium text-red-800">{(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}$</p>
                            <div className="mt-4">
                            <AddToCart product={product} onClick={(e) => e.preventDefault()} />
                        </div>
                        </div>
                    </div>
                </div>

            </Link>
        </>
    )
}

export default ProductListing
