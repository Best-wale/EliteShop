import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import useUserProfile from '../hooks/userprofile';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header({ onCartClick, cartCount }) {


  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
   const value = e.target.value;
console.log('Searching:', value);
    setQuery(value);
    setShowDropdown(true);

    if (value.length > 1) {
      fetch(`${apiUrl}/api/products/?search=${value}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
    } else {
      setResults([]);
    }
  };
  useEffect(()=>{handleSearch})

  const selectItem = (product) => {
    console.log('Selected:', product);
    setQuery(product.name);
    setShowDropdown(false);
  };
console.log('this is the results:',results)
  
  const { user } = useUserProfile();
  const navigate = useNavigate();
console.log(user)
  return (
    <>
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:tracking-wide transition-all">
              EliteShop
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={handleSearch}

                placeholder="Search for products..."
                className="w-full px-5 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base transition-all"
              />

              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              {showDropdown && results.length > 0 && (
  <ul className="absolute left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
    {results.map((product) => (
      <li
        key={product.id}
        onClick={() => selectItem(product)}
        className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out"
      >
        <img 
          src={apiUrl+product.image_url} 
          alt={product.name} 
          className="w-16 h-16 object-cover rounded-lg shadow-md" 
        />
        <div className="flex-1 ml-4">
          <h5 className="font-semibold text-base mb-1 text-gray-800 dark:text-gray-200">{product.name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{product.description}</span>
        </div>
      </li>
    ))}
  </ul>
)}
            </div>
          </div>

          


          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            {/* Cart */}
            <button
              onClick={onCartClick}
              id="cartBtn"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h10"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            {/* User Profile or Login/Signup */}
            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center space-x-1 px-2 py-2 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl font-semibold text-lg shadow hover:scale-105 transition-all focus:outline-none"
                  type="button"
                >
                  <span className="uppercase font-bold font-medium">{user.username?.slice(0, 2) || ""}</span>
                  <span className="hidden md:inline">{user.username}</span>
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity z-50">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.username?.slice(0, 2) || ""}
                      </div>
                      <div>
                        <div className="font-semibold">{user.username}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                  {user.is_staff ?
                  <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
                    >
                      Admin dashboard
                    </Link>
                    : 
                     <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
                    >
                      Profile
                    </Link>
                  }
                   
                    <button
                      onClick={() => {
                        navigate('/product');
                          localStorage.removeItem("access_token");
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center ">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
              </Link>
            )}
          </div>
          {/* End of flex container */}
        </div>
        {/* Mobile Search Bar */}
        <div className="block md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
               value={query}
                onChange={handleSearch}

              placeholder="Search for products..."
              className="w-full px-5 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base transition-all"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            {showDropdown && results.length > 0 && (
  <ul className="absolute left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-2xl shadow z-50 max-h-60 overflow-y-auto">
    {results.map((product) => (
      <li
        key={product.id}
        onClick={() => selectItem(product)}
        className="px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      >
        {product.name}
      </li>
    ))}
  </ul>
)}
          </div>
        </div>
      </div>
    </header>
    <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          showDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() =>{setShowDropdown(false)}}
      ></div>
    </>
  );
}

export default Header;








export function CheckoutHead(){
  return(
<header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                {/*<!-- Logo -->*/}
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                            <span class="text-white font-bold text-xl">E</span>
                        </div>
                        <h1 class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EliteShop</h1>
                    </div>
                </div>

                {/*<!-- Security Badge -->*/}
                  <Link to="/product" >
                <div  class="text-primary hover:underline text-sm font-medium cursor-pointer">← Continue Shopping</div>
           </Link>
            </div>
        </div>
    </header>

    )
}

export  function  ProgressIndicator (){

    return(
<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-8">
                    {/*<!-- Step 1: Cart -->*/}
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-green-600">Cart</span>
                    </div>
                    
                    <div class="w-16 h-0.5 bg-green-500"></div>
                    
                    {/*<!-- Step 2: Checkout -->*/}
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span class="text-white text-sm font-bold">2</span>
                        </div>
                        <span class="text-sm font-medium text-primary">Checkout</span>
                    </div>
                    
                    <div class="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    
                   { /*<!-- Step 3: Confirmation -->*/}
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <span class="text-gray-500 text-sm font-bold">3</span>
                        </div>
                        <span class="text-sm text-gray-500">Confirmation</span>
                    </div>
                </div>
                
                {/*<!-- Continue Shopping Link -->*/}
               
                <div  class="text-primary hover:underline text-sm font-medium">← Continue Shopping</div>
               
            </div>
        </div>
    </div>

        )
}






        // Mega menu data
        const megaMenuData = {
            'Electronics': {
                color: 'primary',
                colorClass: 'text-primary',
                bgClass: 'bg-primary/10',
                columns: [
                    {
                        title: 'Computing',
                        items: ['Laptops', 'Desktops', 'Tablets', 'Monitors', 'Keyboards & Mice', 'Storage', 'Software']
                    },
                    {
                        title: 'Mobile & Accessories',
                        items: ['Smartphones', 'Cases & Covers', 'Screen Protectors', 'Chargers & Cables', 'Power Banks', 'Wireless Earbuds']
                    },
                    {
                        title: 'Audio & Video',
                        items: ['Headphones', 'Speakers', 'Cameras', 'Gaming Headsets', 'Home Theater', 'Streaming Devices']
                    },
                    {
                        title: 'Gaming',
                        items: ['Gaming Laptops', 'Consoles', 'Gaming Accessories', 'VR Headsets', 'Gaming Chairs', 'RGB Lighting']
                    }
                ],
                featured: {
                    title: 'Featured Deal',
                    product: 'Latest MacBook Pro',
                    price: '$1,999',
                    discount: '15% OFF',
                    image: 'laptop'
                }
            },
            'Fashion': {
                color: 'secondary',
                colorClass: 'text-secondary',
                bgClass: 'bg-secondary/10',
                columns: [
                    {
                        title: "Men's Fashion",
                        items: ['Shirts', 'T-shirts', 'Jeans', 'Formal Wear', 'Casual Wear', 'Shoes', 'Accessories']
                    },
                    {
                        title: "Women's Fashion",
                        items: ['Dresses', 'Tops & Blouses', 'Pants & Skirts', 'Ethnic Wear', 'Shoes', 'Handbags', 'Jewelry']
                    },
                    {
                        title: "Kids' Fashion",
                        items: ['Boys Clothing', 'Girls Clothing', 'Baby Clothes', 'Kids Shoes', 'School Uniforms', 'Party Wear']
                    },
                    {
                        title: 'Sportswear',
                        items: ['Athletic Wear', 'Running Shoes', 'Gym Clothes', 'Swimwear', 'Sports Bras', 'Yoga Pants']
                    }
                ],
                featured: {
                    title: 'Spring Collection',
                    product: 'Designer Dresses',
                    price: 'From $79',
                    discount: 'Up to 40% OFF',
                    image: 'dress'
                }
            },
            'Home & Living': {
                color: 'accent',
                colorClass: 'text-accent',
                bgClass: 'bg-accent/10',
                columns: [
                    {
                        title: 'Furniture',
                        items: ['Sofas & Chairs', 'Tables', 'Beds & Mattresses', 'Storage', 'Office Furniture', 'Outdoor Furniture']
                    },
                    {
                        title: 'Home Decor',
                        items: ['Wall Art', 'Lighting', 'Rugs & Carpets', 'Curtains', 'Mirrors', 'Vases & Planters']
                    },
                    {
                        title: 'Kitchen & Dining',
                        items: ['Cookware', 'Dinnerware', 'Kitchen Appliances', 'Storage Containers', 'Bar Accessories']
                    },
                    {
                        title: 'Garden & Outdoor',
                        items: ['Garden Tools', 'Plants & Seeds', 'Outdoor Decor', 'BBQ & Grills', 'Patio Furniture']
                    }
                ],
                featured: {
                    title: 'Home Makeover',
                    product: 'Premium Furniture',
                    price: 'Starting $299',
                    discount: '25% OFF',
                    image: 'furniture'
                }
            },
            'Sports & Outdoors': {
                color: 'green-600',
                colorClass: 'text-green-600',
                bgClass: 'bg-green-500/10',
                columns: [
                    {
                        title: 'Fitness Equipment',
                        items: ['Treadmills', 'Weight Training', 'Yoga Equipment', 'Resistance Bands', 'Exercise Bikes']
                    },
                    {
                        title: 'Outdoor Sports',
                        items: ['Camping Gear', 'Hiking Equipment', 'Cycling', 'Water Sports', 'Winter Sports']
                    },
                    {
                        title: 'Team Sports',
                        items: ['Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball', 'Volleyball']
                    },
                    {
                        title: 'Sports Nutrition',
                        items: ['Protein Supplements', 'Vitamins', 'Energy Drinks', 'Meal Replacement', 'Pre-Workout']
                    }
                ],
                featured: {
                    title: 'Fitness Goals',
                    product: 'Home Gym Set',
                    price: '$599',
                    discount: '30% OFF',
                    image: 'fitness'
                }
            },
            'Beauty & Health': {
                color: 'pink-600',
                colorClass: 'text-pink-600',
                bgClass: 'bg-pink-500/10',
                columns: [
                    {
                        title: 'Skincare',
                        items: ['Cleansers', 'Moisturizers', 'Serums', 'Sunscreen', 'Face Masks', 'Anti-Aging']
                    },
                    {
                        title: 'Makeup',
                        items: ['Foundation', 'Lipstick', 'Eyeshadow', 'Mascara', 'Blush', 'Nail Polish']
                    },
                    {
                        title: 'Hair Care',
                        items: ['Shampoo', 'Conditioner', 'Hair Styling', 'Hair Tools', 'Hair Color', 'Hair Treatments']
                    },
                    {
                        title: 'Health & Wellness',
                        items: ['Vitamins', 'Supplements', 'First Aid', 'Personal Care', 'Oral Care', 'Weight Management']
                    }
                ],
                featured: {
                    title: 'Beauty Essentials',
                    product: 'Skincare Bundle',
                    price: '$89',
                    discount: 'Buy 2 Get 1 Free',
                    image: 'beauty'
                }
            },
            'Books & Media': {
                color: 'purple-600',
                colorClass: 'text-purple-600',
                bgClass: 'bg-purple-500/10',
                columns: [
                    {
                        title: 'Books',
                        items: ['Fiction', 'Non-Fiction', 'Textbooks', 'Children\'s Books', 'Comics', 'Audiobooks']
                    },
                    {
                        title: 'Movies & TV',
                        items: ['DVDs & Blu-rays', 'Digital Movies', 'TV Series', 'Documentaries', 'Kids Movies']
                    },
                    {
                        title: 'Music',
                        items: ['CDs', 'Vinyl Records', 'Digital Music', 'Music Instruments', 'Audio Equipment']
                    },
                    {
                        title: 'Digital Content',
                        items: ['E-books', 'Software', 'Games', 'Apps', 'Online Courses', 'Subscriptions']
                    }
                ],
                featured: {
                    title: 'Best Sellers',
                    product: 'Top Fiction Books',
                    price: '$12.99',
                    discount: '20% OFF',
                    image: 'books'
                }
            },
            'More': {
                color: 'gray-600',
                colorClass: 'text-gray-600',
                bgClass: 'bg-gray-500/10',
                columns: [
                    {
                        title: 'Automotive',
                        items: ['Car Accessories', 'Motorcycle Gear', 'Tools', 'Car Care', 'Electronics', 'Tires']
                    },
                    {
                        title: 'Baby & Kids',
                        items: ['Baby Care', 'Toys & Games', 'Strollers', 'Car Seats', 'Baby Food', 'Educational']
                    },
                    {
                        title: 'Pet Supplies',
                        items: ['Dog Supplies', 'Cat Supplies', 'Fish & Aquatic', 'Bird Supplies', 'Pet Food', 'Pet Toys']
                    },
                    {
                        title: 'Office & Business',
                        items: ['Office Supplies', 'Furniture', 'Printers', 'Stationery', 'Business Equipment']
                    }
                ],
                featured: {
                    title: 'Special Category',
                    product: 'Mixed Bundle',
                    price: 'Various',
                    discount: 'Special Offers',
                    image: 'misc'
                }
            }
        };


export const Category = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const categories = Object.keys(megaMenuData);

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-8 py-4 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                        <div className="category-dropdown relative group" key={category}>
                            <button
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl hover:${megaMenuData[category].bgClass} transition-all font-medium whitespace-nowrap`}
                                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {/* Insert appropriate icon path here */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={megaMenuData[category].icon} />
                                </svg>
                                <span className={megaMenuData[category].colorClass}>{category}</span>
                                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mega Menu Container */}
            {activeCategory && (
                <div className={`absolute top-full left-0 w-full ${megaMenuData[activeCategory].bgClass} backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-2xl opacity-100 transition-all duration-300 z-40`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <h2 className={`text-lg font-bold ${megaMenuData[activeCategory].colorClass}`}>{activeCategory} Subcategories</h2>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {megaMenuData[activeCategory].columns.map((column, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold " >{column.title}</h3>
                                    <ul className="mt-2">
                                        {column.items.map((item, idx) => (
                                            <li key={idx} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500 mb-4">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        
                        
                    </div>
                </div>
            )}
        </nav>
    );
};

