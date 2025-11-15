import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomePage from './pages/homePage';
import AdminDashboard from './pages/adminPages/adminPage';
import FeaturedProducts from './components/FeaturedProducts';
import ProductListing from './pages/productlistingPage';
import AuthPage from './pages/authPage'
import Profile from './pages/Profile';
import CheckoutPage from './pages/checkout/CheckoutPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/featured" element={<FeaturedProducts />} />
        <Route path="/product" element={<ProductListing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;