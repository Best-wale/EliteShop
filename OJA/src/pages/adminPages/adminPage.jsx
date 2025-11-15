import React, { useState, useEffect } from "react";
import useProducts from "../../hooks/products";
import Sidebar from "../../components/SideBar";
import ProductModal from "../../components/ProductModelAdmin";
import MainContent from "./MainContent";
import useUserProfile from '../../hooks/userprofile';
import {OrderList} from '../../hooks/order';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
// Sample data
/*

const initialOrders = [
  { id: "ORD-001", customer: "John Doe", email: "john@example.com", product: "Wireless Headphones", amount: 299.99, date: "2024-01-15", status: "delivered" },
  { id: "ORD-002", customer: "Jane Smith", email: "jane@example.com", product: "Smart Watch", amount: 199.99, date: "2024-01-14", status: "shipped" },
  { id: "ORD-003", customer: "Mike Johnson", email: "mike@example.com", product: "Leather Jacket", amount: 499.99, date: "2024-01-13", status: "processing" },
  { id: "ORD-004", customer: "Sarah Wilson", email: "sarah@example.com", product: "Yoga Mat", amount: 49.99, date: "2024-01-12", status: "pending" },
];
*/
/*
const initialCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 5, totalSpent: 1299.95, joinDate: "2023-06-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 3, totalSpent: 799.97, joinDate: "2023-08-22" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 7, totalSpent: 2149.93, joinDate: "2023-03-10" },
  { id: 4, name: "John Doe", email: "john@example.com", orders: 5, totalSpent: 1299.95, joinDate: "2023-06-15" },
  { id: 5, name: "Jane Smith", email: "jane@example.com", orders: 3, totalSpent: 799.97, joinDate: "2023-08-22" },
  { id: 6, name: "Mike Johnson", email: "mike@example.com", orders: 7, totalSpent: 2149.93, joinDate: "2023-03-10" },
  
];
*/
const initialOrders = [];
const initialCustomers = [];
function AdminDashboard() {
  const { user } = useUserProfile();
  const { Allorders} = OrderList();
  console.log(Allorders)
  useEffect(() => {
    document.title = "EliteShop- Admin Dashboard";
  }, []);
  const { productsListing, categoryList } = useProducts();

  const [section, setSection] = useState("dashboard");
  const [products, setProducts] = useState([]);

  const [orders] = useState(Allorders);
  const [customers] = useState(initialCustomers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  React.useEffect(() => {
    setProducts(productsListing);
  }, [productsListing]);

  const [loading, setLoading] = useState(false); // Add loading state

  // Function to handle saving a product

  const handleSaveProduct = async (product) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append(
      "price",
      product.price !== undefined &&
        product.price !== null &&
        product.price !== ""
        ? String(product.price)
        : "0.0",
    );
    formData.append(
      "original_price",
      product.original_price !== undefined &&
        product.original_price !== null &&
        product.original_price !== ""
        ? String(product.original_price)
        : "0.0",
    );
    formData.append("category_id", product.category);
    formData.append("description", product.description);
    formData.append(
      "stock",
      product.stock !== undefined &&
        product.stock !== null &&
        product.stock !== ""
        ? String(product.stock)
        : "0",
    );
    formData.append("image", product.image);
    formData.append("rating", String(product.rating ?? 4)); // default rating

    // Only append rating if it's a valid number

    try {
      let response;
      if (product.id) {
        response = await fetch(
          `${apiUrl}/api/products/${product.id}/`,
          {
            method: "PUT",
            body: formData,
          },
        );
      } else {
        response = await fetch(`${apiUrl}/api/products/`, {
          method: "POST",
          body: formData,
        });
      }
      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + JSON.stringify(errorData));
        throw new Error("Failed to save product");
      }
      const savedProduct = await response.json();
      if (product.id) {
        setProducts(
          products.map((p) => (p.id === product.id ? savedProduct : p)),
        );
      } else {
        setProducts([...products, savedProduct]);
      }
      setModalOpen(false);
      setEditProduct(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  // Function to handle editing a product

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };
  // Function to handle deleting a product
  const handleDeleteProduct = async (id) => {
    alert("Are you sure you want to delete this product?");
    try {
      const response = await fetch(
        `${apiUrl}/api/products/${id}/`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Main content
if (!user.is_staff){
return (
    <div className="bg-gray-50 dark:bg-dark text-gray-900 dark:text-white min-h-screen flex">
      {/* Sidebar for mobile and desktop */}
    <div>NOt and admin </div>
    </div>)

};
  return (
    <div className="bg-gray-50 dark:bg-dark text-gray-900 dark:text-white min-h-screen flex">
      {/* Sidebar for mobile and desktop */}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        section={section}
        setSection={setSection}
      />

      <MainContent
        products={products}
        setSidebarOpen={setSidebarOpen}
        orders={Allorders}
        customers={customers}
        section={section}
        setEditProduct={setEditProduct}
        setModalOpen={setModalOpen}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
      />

      <ProductModal
        categories={categoryList}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={editProduct}
        loading={loading}
      />
    </div>
  );
}

export default AdminDashboard;
