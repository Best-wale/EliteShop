  // Orders Table
  function OrdersTable({orders}) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>

                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Order ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Email</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-6 font-medium">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{order.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400"></p>
                    </div>
                  </td>
                  <td className="py-4 px-6">{order.email}</td>

                  <td className="py-4 px-6 font-semibold">₦ {order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : order.status === "processing"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                    }`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default OrdersTable;