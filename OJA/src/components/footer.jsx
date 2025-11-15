import React from "react";

function Footer() {
  return (

    

        <>
        <footer className="bg-gray-100 dark:bg-gray-800 py-10">
            <div className="container mx-auto px-4">
                {/*<!-- Footer Top -->*/}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/*<!-- About Us -->*/}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EliteShop
          </span>
        </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            EliteShop is your one-stop shop for the best deals on electronics, clothing, home essentials,
                            and more. We bring convenience and quality to your shopping experience.
                        </p>
                    </div>

                    {/*<!-- Quick Links -->*/}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#productsContainer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">Shop
                                    Now</a></li>
                            <li><a href="#categories"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">Categories</a>
                            </li>
                            <li><a href="#about"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">About
                                    Us</a></li>
                            <li><a href="#contact"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">Contact
                                    Us</a></li>
                        </ul>
                    </div>

                    {/*<!-- Customer Support -->*/}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Customer Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#faq"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">FAQs</a>
                            </li>
                            <li><a href="#returns"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">Returns
                                    & Refunds</a></li>
                            <li><a href="#shipping"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">Shipping
                                    Info</a></li>
                            <li><a href="#terms"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light text-sm">Terms
                                    & Conditions</a></li>
                        </ul>
                    </div>

                    {/*<!-- Newsletter -->*/}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Stay Connected</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest updates and offers.
                        </p>
                        <form className="flex space-x-2">
                            <input type="email" placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light text-sm"/>
                            <button type="submit"
                                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/*<!-- Footer Bottom -->*/}
                <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                       
                        &copy; {new Date().getFullYear()} EliteShop. All rights reserved.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Designed by <span className="text-primary dark:text-primary-light font-semibold">wale</span>.
                    </p>
                </div>
            </div>
        </footer>
        
    </>
  );
}

export default Footer;