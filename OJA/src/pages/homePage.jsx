import React, { useState, useEffect } from "react";
import Header from "../components/header";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedProducts from "../components/FeaturedProducts";
import CartSidebar from "../components/CartSidebar";
import ProductModal from "../components/ProductModal";
import useProducts from "../hooks/products"; // Move your products array here
import Footer from "../components/Footer";

function HomePage() {

  useEffect(() => {
    document.title = "EliteShop - Home";
  }, []);

  const { productsListing, cart,categoryList,loading, addToCart, removefromCart, deletefromCart } = useProducts();
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const cartItems = cart?.items || [];
  const total = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0); // Added initial value 0 here

console.log('categoryList',categoryList)
  // Modal handlers
  const openProductModal = (product) => setModalProduct(product);
  const closeProductModal = () => setModalProduct(null);

  return (
    <div className="bg-white dark:bg-dark text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">

      <Header cartCount={total} onCartClick={() => setCartOpen(true)} />
      

      <HeroSection />

    {loading && (
            <div className="relative bg-white dark:bg-dark inset-0  bg-opacity-30 flex items-center justify-center z-50 rounded-3xl">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="text-primary font-semibold">loading...</span>
              </div>
            </div>
          )}

{categoryList.map((cat) =>
      <FeaturedProducts
        key={cat.id}
        filterName={cat.name}
        products={productsListing}
        addToCart={addToCart}   
      />
      )}

      <CartSidebar
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        updateQuantity={addToCart}
        removefromCart={removefromCart}
        deletefromCart={deletefromCart}
      />

      

      <Footer />
    </div>
  );
}

export default HomePage;
