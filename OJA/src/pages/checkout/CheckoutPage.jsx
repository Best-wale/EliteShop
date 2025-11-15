import React from "react";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import {CheckoutHead,ProgressIndicator } from "../../components/header";


import MainContent from "./MainContent";


function CheckoutPage() {
  
  return (
    <>
      
      
    <div className="bg-gray-50 dark:bg-dark text-gray-900 dark:text-white transition-colors duration-300">
    <CheckoutHead/>
    
      <MainContent/>
         
        </div>
       
    </>
  );
}

export default CheckoutPage;
