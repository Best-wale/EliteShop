import React from 'react';

const dummyWishlist = [
  {
    id: 1,
    name: 'Noise Cancelling Headphones',
    price: '$199.99',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Smartwatch Series 7',
    price: '$249.00',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: '4K Action Camera',
    price: '$139.50',
    image: 'https://via.placeholder.com/100',
  },
];

export default function WishlistTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Your Wishlist</h2>

      {dummyWishlist.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyWishlist.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-4 rounded-2xl shadow border border-white/20"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-sm bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 transition">
                  Add to Cart
                </button>
                <button className="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
