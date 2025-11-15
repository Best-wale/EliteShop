function CustomersTable({ customers }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Email</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Orders</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Total Spent</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 dark:text-gray-400">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{customer.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">{customer.email}</td>
                  <td className="py-4 px-6 font-semibold">{customer.orders}</td>
                  <td className="py-4 px-6 font-semibold">${customer.totalSpent}</td>
                  <td className="py-4 px-6">{customer.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default CustomersTable;