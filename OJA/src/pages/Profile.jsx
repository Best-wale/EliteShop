// This file will contain the componentized version of the profile page in React.
// It will use Tailwind CSS for styling and break down into Header, Sidebar, and Tabs.
// Here's the scaffold. Full implementation of all components is extensive, so we'll start with the layout structure.

import React, { useState, useEffect } from 'react';
import Header from '../components/profileHeader';
import Sidebar from '../components/SidebarProfile';
import OverviewTab from '../components/tabs/OverviewTab';
import OrdersTab from '../components/tabs/OrdersTab';
import AddressesTab from '../components/tabs/AddressesTab';
import PaymentTab from '../components/tabs/PaymentTab';
import WishlistTab from '../components/tabs/WishlistTab';
import SettingsTab from '../components/tabs/SettingsTab';
import useProducts from "../hooks/products"; // Move your products array here
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";



const tabs = {
  overview: <OverviewTab />, 
  orders: <OrdersTab />, 
  addresses: <AddressesTab />, 
  payment: <PaymentTab />, 
  wishlist: <WishlistTab />, 
  settings: <SettingsTab />,
};

export default function ProfilePage() {
 
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

   const {cart, addToCart,removefromCart,deletefromCart} = useProducts();
 
   const cartItems = cart?.items || [];
    const total = cartItems.reduce((sum, item) =>{
    return sum + item.quantity;
  }, 0);

  useEffect(() => {
    document.documentElement.classList.add('light');
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-dark text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Header
        cartCount={total}
        onCartClick={() => setCartOpen(true)}
      />
      <CartSidebar
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        updateQuantity={addToCart}
        removefromCart={removefromCart}
        deletefromCart={deletefromCart}
      />

      {/* Mobile toggle button */}
      <div className="lg:hidden px-4 pt-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-primary text-white px-4 py-2 rounded-xl"
        >
          {sidebarOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar visibility toggle */}
          <div className={`lg:sticky lg:top-24 h-fit ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="lg:col-span-3">
            {tabs[activeTab]}
          </div>
        </div>
      </main>
    </div>
  );
}

