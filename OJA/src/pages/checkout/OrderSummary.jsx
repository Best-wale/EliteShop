import React from "react";

const mockCartItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    quantity: 2,
    price: 6000,
    image: "https://via.placeholder.com/80", // Replace with real image URLs
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    quantity: 1,
    price: 3000,
    image: "https://via.placeholder.com/80",
  },
];

function formatCurrency(amount) {
  return `₦${amount.toLocaleString()}`;
}

function OrderSummary() {
  const subtotal = mockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 1000;
  const total = subtotal + shipping;

  return (
    <>
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {mockCartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        You will receive an order confirmation by email shortly.
      </p>
    </>
  );
}

export default OrderSummary;
