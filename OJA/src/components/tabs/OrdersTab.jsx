import React from 'react';

const dummyOrders = [
  {
    id: 'ORD123456',
    date: '2025-05-12',
    status: 'Delivered',
    total: '$89.99',
    items: ['Wireless Mouse', 'USB-C Charger'],
  },
  {
    id: 'ORD123457',
    date: '2025-04-30',
    status: 'Shipped',
    total: '$59.49',
    items: ['Bluetooth Headphones'],
  },
  {
    id: 'ORD123458',
    date: '2025-04-15',
    status: 'Cancelled',
    total: '$29.99',
    items: ['Laptop Sleeve'],
  },
];

export default function OrdersTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Your Orders</h2>
      

      {dummyOrders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {dummyOrders.map(order => (
            <div key={order.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow border border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Order ID: <span className="font-mono text-gray-900 dark:text-white">{order.id}</span></div>
                  <div className="text-sm">Date: <span className="font-medium">{order.date}</span></div>
                  <div className="text-sm">Status: <span className={`font-semibold ${statusColor(order.status)}`}>{order.status}</span></div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right space-y-2">
                  <p className="text-lg font-bold">{order.total}</p>
                  <button className="text-sm text-primary font-medium hover:underline">View Details</button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Items:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function statusColor(status) {
  switch (status) {
    case 'Delivered':
      return 'text-green-600 dark:text-green-400';
    case 'Shipped':
      return 'text-blue-600 dark:text-blue-400';
    case 'Cancelled':
      return 'text-red-600 dark:text-red-400';
    default:
      return '';
  }
}
