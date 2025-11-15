import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import {getAuthHeaders,ensureSession } from './userprofile';
import useProducts from "./products";
  
export function OrderList() {

  const [Allorders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/order/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);
  console.log(Allorders)
  return { Allorders, loading };
}



function useOrder() {
	   const { fetchCart } = useProducts();
    const [status, setStatus] = useState(null);
    const [orderloading, setOrderLoading] = useState(true)

    const Checkout = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/carts/checkout/`, {
                method: 'POST',
                headers: getAuthHeaders(),
                credentials: 'include',
            });

            if (!response.ok) {
                // Handle potential errors from the server (e.g., non-2xx status codes)
                const errorData = await response.json();
                console.error('Checkout failed:', response.status, errorData);
                throw new Error(`Checkout failed with status ${response.status}`);
            }

            const responseData = await response.json();
            setStatus(responseData, response.status);
            console.log(responseData, response.status);
            setOrderLoading(false)
            console.log(status)
            return {responseData, response}; // Return the response data for further use
        } catch (error) {
            console.error('An error occurred during checkout:', error.message);
            setStatus(null); // Reset status on error
            throw error; // Rethrow error for further handling
        }
          fetchCart();
    };

    return { Checkout, status,orderloading };
}

export default useOrder;



