import useProducts from "../../hooks/products";
import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

function SearchCard(){
  return(
    <></>
    )
}

export function ProductModal({ isOpen, product, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;
console.log(product)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-100 pointer-events-auto transition-opacity duration-300">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="aspect-square overflow-hidden rounded-3xl">
            <img
              src={ apiUrl+product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full mr-2 bg-blue-100 text-blue-600">{product.category.name}</span>

              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating} (125 reviews)
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl font-bold text-primary">
                ₦{product.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ₦{product.originalPrice}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                OFF
              </span>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.stock !== 0 ? "Add to Cart" : "Out of Stock"}
              </button>
              {product.stock !== 0 ? (<button className="w-full border-2 border-primary text-primary py-4 rounded-2xl font-semibold text-lg hover:bg-primary hover:text-white transition-colors">
                Buy Now
              </button>) : ''}
              
            </div>
            {product.stock !== 0 ? (
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">
                  Free shipping on orders over ₦50
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">30-day return guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">1-year warranty included</span>
              </div>
            </div>): 'Comming back soon'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Card({ product,addToCart }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };
  const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + '...'; // Subtract 3 for the ellipsis
  }
  return text;
}
  return (
    <>
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        onAddToCart={addToCart}
      />
      <div
        key={product.id}
        className="group cursor-pointer animate-scale-in"
        onClick={() => openModal(product)}
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 overflow-hidden">
          <div className="aspect-square overflow-hidden relative">
            <img
              src={apiUrl+ product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {!product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              </div>
            )}
            {product.featured && (
              <div className="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded-lg text-xs font-medium">
                Featured
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full mr-2 bg-blue-100 text-blue-600`}
              >
                {product.category.name}
              </span>

              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({product.reviews})
                </span>
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {shortenText(product.name,20)}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center flex-col justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.original_price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₦{product.original_price.toLocaleString()}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                disabled={product.stock === 0}
                className="bg-primary w-full text-white px-4 py-2 mt-3 rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.stock !== 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function CartItems({item,removefromCart,updateQuantity,deletefromCart}){

  return(

    <div key={item.product.id} className="flex relative items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl mb-4">
                  <img src={apiUrl+ item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h5 className="font-medium text-sm mb-1">{item.product.name}</h5>
                    <p className="text-primary font-semibold">₦{item.product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removefromCart(item.product)}
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                    
                      onClick={() => updateQuantity(item.product, 1)}
                      className={`w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center ${item.product.stock === 0 ? 'bg-gray-300 dark:bg-gray-500 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-500'}`}
  disabled={item.product.stock === 0} >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                  <button className="p-1 absolute top-1 right-1 hover:bg-red-100 dark:hover:bg-red-700 rounded-lg" onClick={() => deletefromCart(item.product)} >
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
                </div>
                                    )
}