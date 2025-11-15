import React from "react";

function ProductModal({ product,onClose,onAddToCart }) {
  if (!product) return null;
console.log('product:',product)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 opacity-100 pointer-events-auto transition-opacity duration-300">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="aspect-square overflow-hidden rounded-3xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-4">
            
  <span className="text-xs font-medium px-3 py-1 rounded-full mr-2 bg-blue-100 text-blue-600">
    {product.categories.name}
  </span>

              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating} (125 reviews)</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl font-bold text-primary">₦{product.price}</span>
              <span className="text-xl text-gray-500 line-through">₦{product.originalPrice}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                Add to Cart
              </button>
              <button className="w-full border-2 border-primary text-primary py-4 rounded-2xl font-semibold text-lg hover:bg-primary hover:text-white transition-colors">
                Buy Now
              </button>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Free shipping on orders over ₦50</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">30-day return guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">1-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductModal;