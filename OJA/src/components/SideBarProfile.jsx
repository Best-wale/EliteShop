import React from 'react';
import {
  HomeIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  HeartIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import useUserProfile from '../hooks/userprofile';

const navItems = [
  { id: 'overview', label: 'Overview', icon: HomeIcon },
  { id: 'orders', label: 'Orders', icon: ShoppingBagIcon },
  { id: 'addresses', label: 'Addresses', icon: MapPinIcon },
  { id: 'payment', label: 'Payment Methods', icon: CreditCardIcon },
  { id: 'wishlist', label: 'Wishlist', icon: HeartIcon },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user } = useUserProfile();

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 animate-fade-in">
        {/* Profile */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
              {user.username?.slice(0, 2) || ""}
            </div>
            <button className="absolute bottom-4 right-0 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
          <div className="mt-4 px-3 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-full text-xs font-medium text-yellow-800 dark:text-yellow-200 inline-block">
            ⭐ Gold Member
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all text-left ${
                activeTab === id ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Sign out */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button onClick={() => {
                        // Add your logout logic here, e.g. call logout function or redirect
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("access_token");
                          window.location.href = "/";
                        }
                      }} className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
