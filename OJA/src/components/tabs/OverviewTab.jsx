import React, { useEffect } from 'react';
import useUserProfile from '../../hooks/userprofile';

export default function OverviewTab() {
   const { user } = useUserProfile();
  console.log(user)
  useEffect(() => {
    // You can replace this logic with real data fetching
    // For now, we're just simulating the behavior with console logs
    console.log('OverviewTab mounted');
  }, []);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}! 👋</h1>
            <p className="text-blue-100">Thanks for being a loyal customer. Here's your account overview.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-bounce-subtle">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Orders" value="0" color="primary" icon={
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        } />
        <StatCard title="Total Spent" value="₦0" color="secondary" icon={
          <span className="text-2xl text-secondary font-bold">₦</span>
        } />
        <StatCard title="Saved Items" value="0" color="accent" icon={
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        } />
      </div>

      {/* Placeholder for dynamic sections */}
      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
        Add dynamic components for recent orders and quick actions here.
      </div>
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  return (
    <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 animate-scale-in`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-3xl font-bold text-${color}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}/10 rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
