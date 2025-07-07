import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Homepage/Home';
import Header from './components/Header/Header';
import ProductCategory from './pages/Shop/ProductCategory';
import ProductDetails from './pages/SingleProduct/SingleProduct';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import Checkout from './pages/Checkout/Checkout';
import About from './pages/About/About';
import Faq from './pages/FAQ/Faq';
import Blog from './pages/Blog/Blog';
import SingleBlog from './pages/SingleBlog/SingleBlog';
import Contact from './pages/Contact/Contact';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import SignIn from './pages/SignIn/SignIn';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ThankYou from './pages/ThankYou/ThankYou';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import NotFoundPage from './components/NotFoundPage/NotFoundPage'; // Create this component
import Dashboard from './pages/Dashboard/Dashboard';

// Import the new Register component


function App() {
  return (
    <>
    <CartProvider>
        <WishlistProvider> {/* WishlistProvider should also wrap your routes */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<ProductCategory />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/thankyou" element={<ThankYou />} />
             <Route path="/dashboard" element={<Dashboard />} /> {/* New: Dashboard Route (create this) */}
            {/* **Crucial: Define a route for /404** */}
            <Route path="/404" element={<NotFoundPage />} />
            {/* **Crucial: Define a catch-all route for any other unmatched paths** */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </>
  )
}

export default App
