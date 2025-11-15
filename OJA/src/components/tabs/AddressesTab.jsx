import React from 'react';

const dummyAddresses = [
  {
    id: 1,
    label: 'Home',
    name: 'John Doe',
    street: '1234 Elm Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
    country: 'USA',
    phone: '+1 555 123 4567',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    name: 'John Doe',
    street: '500 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA',
    phone: '+1 555 987 6543',
    isDefault: false,
  },
];

export default function AddressesTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Your Addresses</h2>

      {dummyAddresses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">You haven’t added any addresses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyAddresses.map(address => (
            <div key={address.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{address.label}</h3>
                  <p className="text-sm mt-1">
                    {address.name}<br />
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}<br />
                    {address.country}<br />
                    <span className="text-gray-600 dark:text-gray-400">{address.phone}</span>
                  </p>
                  {address.isDefault && (
                    <span className="inline-block mt-3 text-xs bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                      Default Address
                    </span>
                  )}
                </div>
                <div className="space-x-2">
                  <button className="text-sm text-primary hover:underline">Edit</button>
                  <button className="text-sm text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <button className="mt-4 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition">
          + Add New Address
        </button>
      </div>
    </div>
  );
}
