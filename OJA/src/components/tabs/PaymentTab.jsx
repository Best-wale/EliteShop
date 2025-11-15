import React from 'react';

const dummyCards = [
  {
    id: 1,
    brand: 'Visa',
    last4: '1234',
    expiry: '08/27',
    holder: 'John Doe',
    isDefault: true,
  },
  {
    id: 2,
    brand: 'Mastercard',
    last4: '5678',
    expiry: '03/26',
    holder: 'John Doe',
    isDefault: false,
  },
];

export default function PaymentTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Payment Methods</h2>

      {dummyCards.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">You haven’t added any payment methods yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyCards.map(card => (
            <div
              key={card.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{card.brand} ending in {card.last4}</p>
                  <p className="text-lg font-semibold">{card.holder}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expires {card.expiry}</p>
                  {card.isDefault && (
                    <span className="inline-block mt-2 text-xs bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="space-x-2">
                  <button className="text-sm text-primary hover:underline">Edit</button>
                  <button className="text-sm text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <button className="mt-4 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition">
          + Add New Card
        </button>
      </div>
    </div>
  );
}
