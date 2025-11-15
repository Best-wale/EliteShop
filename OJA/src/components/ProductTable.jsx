const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

function ProductsTable({products,handleEditProduct, handleDeleteProduct}) {
   const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + '...'; // Subtract 3 for the ellipsis
  }
  return text;
}
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Product</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Price</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img src={apiUrl + product.image_url} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium">{shortenText(product.name,20)}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
  <span
    
    className={`text-xs font-medium px-3 py-1 rounded-full mr-2 `}
  >
    {product.category.name}
  </span>
</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold">₦{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">₦{product.originalPrice}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${product.stock < 20 ? "text-red-600" : "text-green-600"}`}>{product.stock}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.stock > 0  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : product.stock === 0
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>{product.stock>0 ? 'avalable': 'out of stock'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditProduct(product)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default ProductsTable;