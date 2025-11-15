import React from "react";

const categories = [
  {
    name: "Electronics",
    color: "from-blue-400 to-blue-600",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    desc: "Latest gadgets",
  },
  {
    name: "Fashion",
    color: "from-pink-400 to-pink-600",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    desc: "Trendy styles",
  },
  {
    name: "Home",
    color: "from-green-400 to-green-600",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      </svg>
    ),
    desc: "Decor & furniture",
  },
  {
    name: "Books",
    color: "from-purple-400 to-purple-600",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    desc: "Knowledge hub",
  },
];

function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div className="group cursor-pointer" key={cat.name}>
              <div className={`bg-white dark:bg-gray-800 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all transform group-hover:scale-105`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                  {cat.icon}
                </div>
                <h4 className="font-semibold text-lg mb-2">{cat.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;