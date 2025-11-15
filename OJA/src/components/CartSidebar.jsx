import React from "react";
import { Link } from "react-router-dom";
import {CartItems} from "../components/general/Cards";
function CartSidebar({ open, cart, onClose, updateQuantity,removefromCart, deletefromCart}) {
  

  const cartItems = cart?.items || [];
    const totalQuantity = cartItems.reduce((sum, item) =>{
      // The variable 'totalPrice' declared here is not used and can be removed.
    return sum + item.quantity;
  }, 0);

  // Calculate the total price of all items
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

 
  
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-96 bg-white dark:bg-gray-800 shadow-2xl transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold">Shopping Cart</h3>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h10" />
                </svg>
                <p>Your cart is empty</p>
              </div>
            ) : (
              
  
  
              cartItems.map((item) => (
                <CartItems item={item} key={item.id} removefromCart={removefromCart} updateQuantity={updateQuantity} deletefromCart={deletefromCart}/>
                
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">₦{totalPrice.toFixed(2)}</span>
              </div>
              <Link to='/checkout'>
              <button className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors">
                Checkout
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
    </>
  );
}

export default CartSidebar;