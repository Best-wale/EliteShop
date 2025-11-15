import ProductsTable from "../../components/ProductTable"
import OrdersTable from "../../components/OrdersTable";
import CustomersTable from "../../components/CustomersTable";

function MainContent({orders, customers, products, section, setSidebarOpen,  setEditProduct, setModalOpen, handleEditProduct, handleDeleteProduct}) {
  console.log(orders)
    return (
      <main  className="flex-1 lg:ml-64 bg-gray-50 dark:bg-gray-900 min-h-screen w-60">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-bold">{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Welcome back, Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <input type="text" placeholder="Search..." className="w-64 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base" />
            </div>
          </div>
        </header>
        {/* Sections */}
        <div className="p-6 space-y-8">
        {section === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow ">
                <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>
                        <span class="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">+12%</span>
                    </div>
                <h3 className="text-3xl font-bold mb-1">₦0</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </div>
                        <span class="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">+8%</span>
                    </div>
                <h3 className="text-3xl font-bold mb-1">0</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Orders</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <span class="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full">+5</span>
                    </div>
                <h3 className="text-3xl font-bold mb-1">0</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Products</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                            </svg>
                        </div>
                        <span class="text-xs font-medium px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 rounded-full">+23</span>
                    </div>
                <h3 className="text-3xl font-bold mb-1">0</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Customers</p>
              </div>
            </div>
            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Recent Orders</h3>
              </div>
              <OrdersTable orders={orders} />
            </div>
          </div>
        )}
        {section === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Products</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
              </div>
            
            
              <button onClick={() => { setEditProduct(null); setModalOpen(true); }} className="bg-primary text-white px-6 py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                <span>Add Product</span>
              </button>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-6">
                <div class="flex flex-wrap items-center gap-4">
                    <select class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Home</option>
                        <option>Books</option>
                    </select>
                    <select class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Out of Stock</option>
                    </select>
                    <input type="text" placeholder="Search products..." class="flex-1 min-w-64 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base"/>
                </div>
            </div>
            <ProductsTable  products={products} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct}  />
          </div>
        )}
        {section === "orders" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Orders</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
              </div>
            </div>
            <OrdersTable  orders={orders} />
          </div>
        )}
        {section === "customers" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Customers</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage customer accounts</p>
              </div>
            </div>
            
            <CustomersTable customers={customers} />
          </div>
        )}
        {section === "analytics" && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Analytics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h4 className="text-lg font-bold mb-4">Sales Performance</h4>
                <div className="h-48 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h4 className="text-lg font-bold mb-4">Customer Growth</h4>
                <div className="h-48 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    );
  }

export default MainContent;