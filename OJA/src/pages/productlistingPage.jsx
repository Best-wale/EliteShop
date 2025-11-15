


import React, { useState, useMemo, useEffect } from "react";
import Header from "../components/header";
import CartSidebar from "../components/CartSidebar";
import Card from "../components/general/Cards";
import useProducts from "../hooks/products";

const ratings = [
  { value: 4, label: "4+ Stars" },
  { value: 3, label: "3+ Stars" },
];

function ProductListing() {
  useEffect(() => {
    document.title = "EliteShop - Product Listing";
  }, []);
  
  const {
    productsListing,
    categoryList,
    cart,
    addToCart,
    removefromCart,
    deletefromCart,
  } = useProducts();

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]); // Initialize to "all"
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);

  const cartItems = cart?.items || [];
  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Update the selected categories based on the category list
  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectedCategories(["all"]); // Keep "all" as the default
    }
  }, [categoryList]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let products = [...productsListing];

    // Search
    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Categories
    if (!selectedCategories.includes("all")) {
      products = products.filter((p) =>
        selectedCategories.includes(p.category.name)
      );
    }

    // Ratings
    if (selectedRatings.length > 0) {
      products = products.filter((p) =>
        selectedRatings.some((rating) => p.rating >= rating)
      );
    }

    // Price
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    products = products.filter((p) => p.price >= min && p.price <= max);

    // Sort
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        products.sort((a, b) => b.id - a.id);
        break;
      default: // featured
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }, [search, selectedCategories, selectedRatings, minPrice, maxPrice, sortBy, productsListing]);

  // Handlers for category and rating changes
  const handleCategoryChange = (value) => {
    if (value === "all") {
      setSelectedCategories(["all"]);
    } else {
      setSelectedCategories((prev) => {
        const next = prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev.filter((v) => v !== "all"), value];
        return next.length === 0 ? ["all"] : next;
      });
    }
  };

  const handleRatingChange = (value) => {
    setSelectedRatings((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSelectedCategories(["all"]);
    setSelectedRatings([]);
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setSortBy("featured");
  };

  // Render
  return (
    <div className="bg-gray-50 dark:bg-dark text-gray-900 dark:text-white min-h-screen">
      <Header cartCount={total} onCartClick={() => setCartOpen(true)} />
      <CartSidebar
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        updateQuantity={addToCart}
        removefromCart={removefromCart}
        deletefromCart={deletefromCart}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="relative">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6 sticky">
          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 dark:border-gray-200  rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              Categories
            </h3>

            <div className="space-y-3">

              {categoryList.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleCategoryChange(cat.name)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center ${selectedCategories.includes(cat.name) ? "bg-primary border-primary" : "bg-gray-200 dark:bg-gray-600"}`}
                  >
                    {selectedCategories.includes(cat.name) && (
                      <svg
                        className="w-2 h-2 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </span>
                  <span className="ml-3 text-sm">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Price Range */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Min
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Max
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Ratings */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
              Customer Rating
            </h3>
            <div className="space-y-3">
              {ratings.map((r) => (
                <label
                  key={r.value}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(r.value)}
                    onChange={() => handleRatingChange(r.value)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center ${selectedRatings.includes(r.value) ? "bg-primary border-primary" : "bg-gray-200 dark:bg-gray-600"}`}
                  >
                    {selectedRatings.includes(r.value) && (
                      <svg
                        className="w-2 h-2 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </span>
                  <span className="ml-3 text-sm">{r.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Clear Filters */}
          <button
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-2xl font-medium transition-colors"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
          </div>
        </aside>

        <section className="flex-1">
          {/* Sort and View Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold">Products</h2>
              <span className="text-gray-500 dark:text-gray-400">
                {filteredProducts.length} items
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Rating: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  className={`view-toggle px-3 py-2 rounded-lg transition-colors ${view === "grid" ? "bg-white dark:bg-gray-600" : ""}`}
                  onClick={() => setView("grid")}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                </button>
                
              </div>
            </div>
          </div>
          

          {/* Products Grid/List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card product={product} key={product.id} addToCart={addToCart} />
              ))
            ) : (
              <p className="text-center text-lg font-semibold text-gray-600 dark:text-gray-400 my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow">
  No products available.
</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductListing;