// SearchPage.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

import Footer from "../../components/Footer/Footer";
import InnerBanner from "../../components/InnerBanner/InnerBanner";

// Assuming you have a CSS file for general product card styling
// If not, ensure all styling is handled by Tailwind classes directly
// import './ProductCategory.css'; // You might need to import this if it contains shared styles

function SearchPage() {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    const location = useLocation(); // Hook to access URL information
    const navigate = useNavigate(); // Hook for programmatic navigation

    // State for search results
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for the search query extracted from the URL
    const [searchQuery, setSearchQuery] = useState('');

    // Access cart and wishlist contexts
    const { cartItems, setCartItems } = useCart();
    const { wishlistItems, setWishlistItems } = useWishlist();

    // --- Helper functions for Cart/Wishlist actions (similar to ProductCategory.jsx) ---
    const addToCart = (productToAdd) => {
        const existingItem = cartItems.find(item => item._id === productToAdd._id);
        if (existingItem) {
            setCartItems(
                cartItems.map(item =>
                    item._id === productToAdd._id
                        ? { ...item, quantity: item.quantity + 1 } // Increment quantity by 1 for simplicity here
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
        }
    };

    const addToWishlist = (productToAdd) => {
        const existingItem = wishlistItems.find(item => item._id === productToAdd._id);
        if (!existingItem) {
            setWishlistItems([...wishlistItems, { ...productToAdd, quantity: 1 }]);
        }
    };

    // --- useEffect to extract search query from URL ---
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        // Get the 'query' parameter from the URL (e.g., ?query=your+term)
        const query = queryParams.get('query');
        setSearchQuery(query || ''); // Set the search query state, default to empty string
    }, [location.search]); // Re-run when the URL search parameters change

    // --- useEffect to fetch search results from backend ---
    useEffect(() => {
        const fetchSearchResults = async () => {
            // Only fetch if a search query exists
            if (!searchQuery) {
                setSearchResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // IMPORTANT: You will need to implement a backend endpoint at /api/search
                // that accepts a 'q' query parameter and returns matching products.
                const response = await fetch(`${backendUrl}/api/search?q=${encodeURIComponent(searchQuery)}`);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (err) {
                console.error("Error fetching search results:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery, backendUrl]); // Re-fetch whenever the searchQuery changes

    // --- Reusable Product Card Rendering Function (similar to ProductCategory.jsx) ---
    const renderProductCard = (product) => {
        const isInCart = cartItems.some(item => item._id === product._id);
        const defaultCartIconClasses = 'fi fi-rr-shopping-cart h-[24px]';
        const addedCartIconClasses = 'fi fi-sr-shopping-cart h-[24px]';

        const isInWishlist = wishlistItems.some(item => item._id === product._id);
        const defaultWishlistIconClasses = 'fi fi-rr-heart h-[24px]';
        const addedWishlistIconClasses = 'fi fi-sr-heart h-[24px]';

        const wishlistBoxClasses = `wishlist_icon w-[50px] h-[50px] flex items-center justify-center cursor-pointer bg-cream-400 text-black text-[22px] mb-2 ${isInWishlist ? 'added_to_wishlist' : ''}`;
        const cartBoxClasses = `cart_icon w-[50px] h-[50px] flex items-center justify-center cursor-pointer bg-cream-400 text-black text-[22px] mb-2 ${isInCart ? 'added_to_cart' : ''}`;

        const finalCartIconClasses = isInCart ? addedCartIconClasses : defaultCartIconClasses;
        const finalWishlistIconClasses = isInWishlist ? addedWishlistIconClasses : defaultWishlistIconClasses;

        // Check if product is out of stock to apply visual class
        const isOutOfStock = product.stock === 0; // Assuming product.stock exists

        return (
            <div
                className={`product_box w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 flex flex-col items-center text-center ${isOutOfStock ? 'opacity-60 pointer-events-none relative' : ''}`}
                key={product._id}
                id={product._id}
            >
                {isOutOfStock && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] bg-red-600 text-white px-4 py-2 rounded-md font-bold text-lg z-10">
                        SOLD OUT
                    </div>
                )}
                <div
                    className="product_img_wrapper bg-white border border-gray-200 relative overflow-hidden w-full"
                    onClick={() => navigate(`/product-details/${product._id}`)} // Make image clickable
                >
                    <div className='product_img_box flex items-center justify-center'>
                        <img
                            className='w-full h-[300px] object-contain' // Adjusted for responsiveness
                            src={`${backendUrl}/uploads/${product.imageUrl}`}
                            alt={product.name}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x445/E0E0E0/808080?text=Image+Not+Found'; }}
                        />
                    </div>
                    <div className='floating_wishlist_cart_icon_group absolute top-2 right-2 flex flex-col'>
                        <div className={wishlistBoxClasses} onClick={(e) => {
                            e.stopPropagation(); // Prevent parent div's onClick
                            addToWishlist(product);
                        }}>
                            <i className={finalWishlistIconClasses}></i>
                        </div>
                        <div className={cartBoxClasses} onClick={(e) => {
                            e.stopPropagation(); // Prevent parent div's onClick
                            addToCart(product);
                        }}>
                            <i className={finalCartIconClasses}></i>
                        </div>
                    </div>
                    <button
                        className='buy_now_btn bg-cream-400 px-4 py-3 cursor-pointer uppercase tracking-widest font-urbanist text-[17px] font-medium text-black w-full'
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent parent div's onClick
                            navigate(`/product-details/${product._id}`);
                        }}
                    >
                        view details
                    </button>
                </div>
                <div className='product_text_wrapper mt-5 text-center'>
                    <h3 className='product_title text-[22px] font-urbanist font-medium mb-1.5'>{product.name}</h3>
                    <div className='rating_star flex items-center justify-center text-black gap-1.5 mb-1'>
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fi ${i < parseInt(product.rating) ? 'fi-ss-star' : 'fi-rr-star'}`}></i>
                        ))}
                    </div>
                    <div className='product_price'>
                        <h4 className='font-bold font-urbanist text-[20px]'>{product.price}</h4>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="main_content_wrapper">
                <InnerBanner dynamicTitle={`Search Results for "${searchQuery}"`} />

                <section className='product_category_section bg-cream-100 py-10'>
                    <div className='container max-w-[1320px] mx-auto px-4'>
                        <div className='section_content_wrapper flex flex-col lg:flex-row items-start justify-between'>
                            {/* No sidebar filters on search results page, directly show products */}
                            <div className="product_listing_block w-full">
                                <div className='inner_content_wrapper'>
                                    <div className="product_row_wrapper mt-6 mx-[-20px] flex justify-start flex-wrap">
                                        {loading ? (
                                            <div className="text-center w-full py-10">
                                                <p className="text-[22px] font-urbanist text-gray-700">Searching for products...</p>
                                            </div>
                                        ) : error ? (
                                            <div className="text-center w-full py-10">
                                                <p className="text-[22px] font-urbanist text-red-600">Error searching products: {error.message}</p>
                                            </div>
                                        ) : searchResults.length === 0 ? (
                                            <div className="text-center w-full py-10">
                                                <p className="text-[22px] font-urbanist text-gray-700">No products found for "{searchQuery}".</p>
                                                <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mx-auto w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5 mt-6 rounded-md shadow-md hover:bg-brown-700 transition-colors" onClick={() => navigate('/shop')}>
                                                    Back to Shop
                                                </button>
                                            </div>
                                        ) : (
                                            searchResults.map(renderProductCard)
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default SearchPage;
