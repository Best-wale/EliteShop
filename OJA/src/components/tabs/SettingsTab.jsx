import React, { useState } from 'react';
import useUserProfile from '../../hooks/userprofile';
export default function SettingsTab() {
   const { user } = useUserProfile();
console.log(user)
  const [formData, setFormData] = useState({
    name: user.username,
    email: user.email,
    password: '',
    notifications: true
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Settings saved:', formData);
    alert('Settings updated successfully.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Account Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-6 rounded-2xl shadow border border-white/20">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent"
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="h-4 w-4 text-primary rounded border-gray-300 dark:border-gray-600"
          />
          <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Receive email notifications
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
