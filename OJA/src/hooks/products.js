
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

import { useEffect, useState } from 'react';
import useUserProfile,{getAuthHeaders,ensureSession } from './userprofile';

function useProducts() {
  const [productsListing, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true)
  const { user } = useUserProfile();

 

  // Fetch cart items
  const fetchCart = async () => {
    await ensureSession(); // Ensures session is ready
    const res = await fetch(`${apiUrl}/api/carts/`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    const data = await res.json();
    setCart(data);
    console.log("🛒 Current Cart:", data);
  };

  useEffect(() => {
    fetchCart();
  }, [user]); // Refresh cart on user change

  useEffect(() => {
    fetch(`${apiUrl}/api/products/`)
      .then(res => res.json())
      .then(data =>{
        setProducts(data);
        setLoading(false);
    });

    fetch(`${apiUrl}/api/categories/`)
      .then(res => res.json())
      .then(setCategoryList);
  }, []);

  const addToCart = async (product, quantity = 1) => {
    await fetch(`${apiUrl}/api/carts/add_item/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ product_id: product.id, quantity }),
    });
    fetchCart();
  };

  const removefromCart = async (product) => {
    await fetch(`${apiUrl}/api/carts/decrement_item/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ product_id: product.id }),
    });
    fetchCart();
  };

  const deletefromCart = async (product) => {
    await fetch(`${apiUrl}/api/carts/remove_item/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ product_id: product.id }),
    });
    fetchCart();
  };

  return {
    productsListing,
    categoryList,
    cart,
    addToCart,
    removefromCart,
    deletefromCart,
    fetchCart,
    loading
  };
}

export default useProducts;
