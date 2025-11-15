import React, { useState, useEffect } from "react";

function ProductModal({ open, onClose, onSave, product,categories, loading }) {
  
  const [form, setForm] = useState(
    product || {
      name: "",
      category: "",
      price: "",
      original_price: "",
      stock: "",
      status: "active",
      description: "",
      image_file: ""
    }
  );

  useEffect(() => {
    setForm(product || {
      name: "",
      category: "",
      price: "",
      original_price: "",
      stock: "",
      status: "active",
      description: "",
      image_file: ""
    });
  }, [product]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      ...form,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      stock: parseInt(form.stock)
    });
  };
console.log(form)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300 p-8">
          {loading && (
            <div className="absolute  inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 rounded-3xl">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="text-primary font-semibold">Saving...</span>
              </div>
            </div>
          )}
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <h3 className="text-2xl font-bold mb-6">{product ? "Edit Product" : "Add Product"}</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base" />
              </div>
              <div>
              
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
  name="category"
  value={form.category}
  onChange={handleChange}
  required
  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"
>
  <option value="">Select Category</option>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>
  {cat.name}
</option>

  ))}
</select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <input type="number" name="price" value={form.price} onChange={handleChange}  required className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Original Price ($)</label>
                <input type="number" name="original_price" value={form.original_price} onChange={handleChange} step="0.01" className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                <input type="number" name="stock" value={form.stock} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base">
                  <option value="available">Available</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
            </div>
            
<div>
  <label className="block text-sm font-medium mb-2">Product Image</label>
  
      <input
  type="file"
  accept="image/*"
  onChange={e => {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, image: file }));
      // For preview, you can use FileReader, but DO NOT store base64 in form.image
    }
  }}
  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
/>
  {form.image && (
  <img
    src={
      typeof form.image === "string"
        ? form.image
        : URL.createObjectURL(form.image)
    }
    alt="Preview"
    className="mt-2 w-24 h-24 object-cover rounded-xl border"
  />
)}
</div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"></textarea>
            </div>
            <div className="flex space-x-4">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default ProductModal;