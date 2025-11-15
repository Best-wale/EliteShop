import React from "react";
const icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
    </svg>
  ),
  products: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4"></path>
    </svg>
  ),
  orders: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m4 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2z"></path>
    </svg>
  ),
  analytics: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v10zm-6 4a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2h2z"></path>
    </svg>
  ),
  customers: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"></path>
    </svg>
  ),
};

function Sidebar({ open, onClose, section, setSection }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EliteShop</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {["dashboard", "products", "orders", "analytics", "customers"].map(sec => (
            <button
              key={sec}
              onClick={() => setSection(sec)}
              className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all ${section === sec ? "bg-primary/10 text-primary" : ""}`}>
               {icons[sec]}
              <span className="font-medium">{sec.charAt(0).toUpperCase() + sec.slice(1)}</span>
            </button>
          ))}
        </nav>
        {/* User Profile */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AD</span>
            </div>
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@eliteshop.com</p>
            </div>
          </div>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;