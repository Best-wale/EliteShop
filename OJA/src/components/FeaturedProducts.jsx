import React from "react";
import { Link } from 'react-router-dom';
import Card from "./general/Cards";


function FeaturedProducts({ products,filterName ,addToCart}) {


const categoryName = filterName; // The category to filter by
const filteredProducts = products.filter(product => product.category.name === categoryName).slice(0, 4);

 
  
  if (filteredProducts.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-8">{filterName|| null}</h3>
          <div className="flex flex-col items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 64 64"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="#f3f4f6" />
              <path d="M20 28h24M20 36h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M26 44c2 2 10 2 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="26" cy="24" r="2" fill="currentColor" />
              <circle cx="38" cy="24" r="2" fill="currentColor" />
            </svg>
            <span className="text-lg font-semibold text-gray-500">There are no products available in this category.</span>
          </div>
          
        </div>
      </section>
    );
  }
  


  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-3xl font-bold">{filterName||null}</h3>
                    <Link to='/product' className="text-primary font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card product={product}  key={product.id} addToCart={addToCart} />
            
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;