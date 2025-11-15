import {CartItems} from "../../components/general/Cards";
import Toast from "../../components/general/Toast";
import useProducts from "../../hooks/products";
import useOrder from "../../hooks/order";
import React, { useState, useEffect } from "react";
function Model({loading,progress}){
    console.log(progress)

    return(
<div  className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${loading ? '': 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full mx-4 text-center transform scale-95 transition-transform duration-300">
            <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto flex items-center justify-center relative">
                    <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <div className="absolute inset-0 rounded-full border-4 border-primary/30">
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Processing Order</h3>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we process your payment...</p>
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000" style={{width: `${progress}%`}} ></div>
            </div>
        </div>
    </div>

        )
}
export default function MainContent(){


const {Checkout,status,orderloading} = useOrder();

   const { productsListing, cart, addToCart,fetchCart, removefromCart, deletefromCart } = useProducts();
   const [toastVisible, setToastVisible] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('info');


    const showToast = (title, message, type = 'info') => {
        setToastTitle(title);
        setToastMessage(message);
        setToastType(type);
        setToastVisible(true);
    };

    const hideToast = () => {
        setToastVisible(false);
    };

   
  const cartItems = cart?.items || [];
const [loading, setLoading] = useState(false)
 const [progress, setProgress] = useState(0);

    const updateLoading = () => {
        if (progress < 100) {
            setProgress((prev) => prev + 1);
        }
    };

   
const handleCheckout = async () => {
        try {
            const responseData = await Checkout();

            if (responseData.response.status === 200) {
                showToast('Order Placed!', 'Your order has been successfully placed. You will receive a confirmation email shortly.', 'success');
            } else {
                showToast('Checkout Failed', 'There was an issue with your checkout.', 'error');
            }
        } catch (error) {
            showToast('Error', error.message, 'error');
        }
        fetchCart();

    };



   const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
  
    return(
        <>
      <Model loading={loading} progress={progress} /> 
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/*<!-- Checkout Form -->*/}
            <div className="lg:col-span-2 space-y-8">
                
                {/*<!-- Contact Information -->*/}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center">
                            <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            Contact Information
                        </h2>
                        <span className="text-sm text-gray-500">Step 1 of 4</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">First Name</label>
                            <input type="text" id="firstName" required 
                                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                   placeholder="John" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Last Name</label>
                            <input type="text" id="lastName" required 
                                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                   placeholder="Doe" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">Email Address</label>
                            <input type="email" id="email" required 
                                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                   placeholder="john@example.com" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold mb-2">Phone Number</label>
                            <input type="tel" id="phone" required 
                                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                   placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>
                </div>

                {/*<!-- Shipping Address -->*/}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 animate-fade-in" >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center">
                            <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Shipping Address
                        </h2>
                        <span className="text-sm text-gray-500">Step 2 of 4</span>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Street Address</label>
                            <input type="text" id="address" required 
                                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                   placeholder="123 Main Street" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Apartment, suite, etc. (optional)</label>
                            <input type="text" id="apartment" 
                                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                   placeholder="Apt 4B" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">City</label>
                                <input type="text" id="city" required 
                                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                       placeholder="New York" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">State</label>
                                <select id="state" required 
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base">
                                    <option value="">Select State</option>
                                    <option value="NY">New York</option>
                                    <option value="CA">California</option>
                                    <option value="TX">Texas</option>
                                    <option value="FL">Florida</option>
                                    <option value="IL">Illinois</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">ZIP Code</label>
                                <input type="text" id="zipCode" required 
                                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                       placeholder="10001" />
                            </div>
                        </div>
                    </div>
                </div>

                {/*<!-- Shipping Method -->
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 animate-fade-in" >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center">
                            <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                            </svg>
                            Shipping Method
                        </h2>
                        <span className="text-sm text-gray-500">Step 3 of 4</span>
                    </div>
                    
                    <div className="space-y-4">
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                            <input type="radio" name="shipping" value="standard" className="text-primary focus:ring-primary" checked />
                            <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">Standard Shipping</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">5-7 business days</p>
                                    </div>
                                    <span className="font-bold text-green-600">FREE</span>
                                </div>
                            </div>
                        </label>
                        
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                            <input type="radio" name="shipping" value="express" className="text-primary focus:ring-primary" />
                            <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">Express Shipping</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
                                    </div>
                                    <span className="font-bold">$9.99</span>
                                </div>
                            </div>
                        </label>
                        
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                            <input type="radio" name="shipping" value="overnight" className="text-primary focus:ring-primary"/>
                            <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">Overnight Shipping</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Next business day</p>
                                    </div>
                                    <span className="font-bold">$24.99</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
*/}
                {/*<!-- Payment Method -->*/}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 animate-fade-in" >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center">
                            <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                            </svg>
                            Payment Method
                        </h2>
                        <span className="text-sm text-gray-500">Step 4 of 4</span>
                    </div>
                    
                    {/*<!-- Payment Method Selection -->*/}
                    <div className="mb-6 space-y-4">
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                            <input type="radio" name="payment" value="card" className="text-primary focus:ring-primary" checked onchange="togglePaymentMethod('card')"/>
                            <div className="ml-4 flex-1 flex items-center justify-between">
                                <span className="font-semibold">Credit / Debit Card</span>
                                <div className="flex space-x-2">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23ff5f00'/%3E%3Ctext x='20' y='16' text-anchor='middle' fill='white' font-size='8' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-6"/>
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23eb001b'/%3E%3Ccircle cx='15' cy='12' r='8' fill='%23eb001b'/%3E%3Ccircle cx='25' cy='12' r='8' fill='%23ff5f00'/%3E%3C/svg%3E" alt="Mastercard" className="h-6"/>
                                </div>
                            </div>
                        </label>
                        
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                            <input type="radio" name="payment" value="paypal" className="text-primary focus:ring-primary" onchange="togglePaymentMethod('paypal')"/>
                            <div className="ml-4 flex-1 flex items-center justify-between">
                                <span className="font-semibold">PayPal</span>
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='24' viewBox='0 0 60 24'%3E%3Crect width='60' height='24' rx='4' fill='%23003087'/%3E%3Ctext x='30' y='16' text-anchor='middle' fill='white' font-size='10' font-weight='bold'%3EPayPal%3C/text%3E%3C/svg%3E" alt="PayPal" className="h-6"/>
                            </div>
                        </label>
                        
                        <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                            <input type="radio" name="payment" value="apple" className="text-primary focus:ring-primary" onchange="togglePaymentMethod('apple')"/>
                            <div className="ml-4 flex-1 flex items-center justify-between">
                                <span className="font-semibold">Apple Pay</span>
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='24' viewBox='0 0 50 24'%3E%3Crect width='50' height='24' rx='4' fill='%23000'/%3E%3Ctext x='25' y='16' text-anchor='middle' fill='white' font-size='8' font-weight='bold'%3E🍎 Pay%3C/text%3E%3C/svg%3E" alt="Apple Pay" className="h-6"/>
                            </div>
                        </label>
                    </div>
                    
                   {/* <!-- Credit Card Form -->*/}
                    <div id="cardForm" className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Card Number</label>
                            <div className="relative">
                                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19"
                                       className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                       onInput="formatCardNumber(this)"/>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                                <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5"
                                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                                       onInput="formatExpiryDate(this)"/>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">CVV</label>
                                <input type="text" id="cvv" placeholder="123" maxlength="4"
                                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"/>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
                            <input type="text" id="cardholderName" placeholder="John Doe"
                                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"/>
                        </div>
                    </div>
                    
                    {/*<!-- PayPal Message -->*/}
                    <div id="paypalForm" className="hidden">
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">You will be redirected to PayPal to complete your payment.</p>
                        </div>
                    </div>
                    
                    {/*<!-- Apple Pay Message -->*/}
                    <div id="appleForm" className="hidden">
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">Use Touch ID or Face ID to pay with Apple Pay.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*<!-- Order Summary -->*/}
            <div className="lg:col-span-1">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 sticky top-24 animate-fade-in" >
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        Order Summary
                    </h2>
                    
                    {/*<!-- Cart Items -->*/}
                    <div className="space-y-4 mb-6" id="cartItems">
                        {cartItems.length === 0  && (
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

                        {/*<!-- Items will be rendered here -->*/}
                    {cartItems.map(item => <CartItems item={item} removefromCart={removefromCart} updateQuantity={addToCart} deletefromCart={deletefromCart}/>
      )}
                    </div>
                    
                    {/*<!-- Promo Code -->*/}
                    <div className="mb-6">
                        <div className="flex space-x-2">
                            <input type="text" id="promoCode" placeholder="Promo code"
                                   className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"/>
                            <button 
                                    className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                                Apply
                            </button>
                        </div>
                    </div>
                    
                    {/*<!-- Order Total -->*/}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span id="subtotal">₦{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span id="shippingCost" className="text-green-600 font-medium">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax</span>
                            <span id="tax">₦10</span>
                        </div>
                        <div id="discountRow" className="hidden flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span id="discount">-₦50.00</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span id="totalAmount">₦ {totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    {/*<!-- Place Order Button -->*/}
                    <button onClick={handleCheckout}
                            className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Complete Order
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    {/*<!-- Security Badges -->*/}
                    <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            <span>Safe Payment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
 <Toast
                title={toastTitle}
                message={toastMessage}
                type={toastType}
                isVisible={toastVisible}
                onClose={hideToast}
            />
    </>

        )
}


