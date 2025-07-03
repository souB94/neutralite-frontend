// SingleProduct.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Footer from "../../components/Footer/Footer";
import InnerBanner from "../../components/InnerBanner/InnerBanner";


import { FaStar, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import './SingleProduct.css'; // Assuming this CSS file exists for styling

function ProductDetails() {
    const { id } = useParams(); // Get the product ID from the URL parameters
    const navigate = useNavigate();

    const { cartItems, setCartItems } = useCart(); // Access cart items from context
    const { wishlistItems, setWishlistItems } = useWishlist(); // Access wishlist items from context

    const [product, setProduct] = useState(null); // State to store the fetched product
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null);    // State to track any fetch errors
    const [quantity, setQuantity] = useState(1); // Default quantity to 1
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'shipping', label: 'Shipping Information' },
        { id: 'reviews', label: 'Reviews' },
    ];

    // Functions for navigation (existing logic)
    const GoToWishlist = () => { navigate('/wishlist'); };
    const GoToCart = () => { navigate('/cart'); };
    
    // Add to Cart function (remains the same for the "Add To Cart" button)
    const addToCart = (productToAdd) => {
        const existingItem = cartItems.find(item => item._id === productToAdd._id);

        if (existingItem) {
            setCartItems(
                cartItems.map(item =>
                    item._id === productToAdd._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...productToAdd, quantity: quantity }]);
        }
    };

     // Add to Wishlist function (remains the same)
    const addToWishlist = (productToAdd) => {
        const existingItem = wishlistItems.find(item => item._id === productToAdd._id);

        if (!existingItem) { // Only add if not already in wishlist
            setWishlistItems([...wishlistItems, { ...productToAdd, quantity: 1 }]);
        }
    };

    // Functions to handle quantity changes for the CURRENT product
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    // --- IMPORTANT CHANGE HERE: handleBuyNow passes state to checkout ---
    const handleBuyNow = () => {
        if (product) {
            // Navigate to checkout and pass the product details directly via state
            navigate('/checkout', {
                state: {
                    buyNowItem: { ...product, quantity: quantity }
                }
            });
        }
    };

    // --- useEffect to fetch product data ---
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            let fetchedProduct = null;

            // Try fetching from the general products API first
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (response.ok) {
                    fetchedProduct = await response.json();
                } else if (response.status !== 404) { // Only throw error if it's not a 404 (product not found)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (err) {
                console.error("Error fetching general product:", err);
                // Don't set error immediately, try personal care products
            }

            // If not found in general products, try fetching from personal care products API
            if (!fetchedProduct) {
                try {
                    const response = await fetch(`http://localhost:5000/api/personalProducts/${id}`); // Note 'personalProducts'
                    if (response.ok) {
                        fetchedProduct = await response.json();
                    } else if (response.status !== 404) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                } catch (err) {
                    console.error("Error fetching personal care product:", err);
                    setError(err); // Set error if neither fetch works
                }
            }

            // If not found in Best Seller products, try fetching from best seller products API
            if (!fetchedProduct) {
                try {
                    const response = await fetch(`http://localhost:5000/api/bestSellers/${id}`); // Note 'bestSellers'
                    if (response.ok) {
                        fetchedProduct = await response.json();
                    } else if (response.status !== 404) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                } catch (err) {
                    console.error("Error fetching best seller product:", err);
                    setError(err); // Set error if neither fetch works
                }
            }

            if (fetchedProduct) {
                setProduct(fetchedProduct);
            } else {
                setError(new Error('Product not found in any category.')); // If no product was found after both attempts
            }
            setLoading(false);
        };

        if (id) { // Only fetch if an ID is present in the URL
            fetchProduct();
        } else {
                setLoading(false);
                setError(new Error('No product ID provided in the URL.'));
            }
        }, [id]); // Re-run effect if the ID in the URL changes

    // Conditional rendering for loading, error, or no product found (unchanged)
    if (loading) {
        return (
            <>
                <div className="main_content_wrapper">
                    <InnerBanner />
                    <section className='product_details_section bg-cream-100 py-10'>
                        <div className='container max-w-[1320px] mx-auto px-4 text-center'>
                            <p className="text-[22px] font-urbanist text-gray-700">Loading product details...</p>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="main_content_wrapper">
                    <InnerBanner />
                    <section className='product_details_section bg-cream-100 py-10'>
                        <div className='container max-w-[1320px] mx-auto px-4 text-center'>
                            <h5 className="text-[17px] text-red-600 uppercase tracking-widest">Error!</h5>
                            <p className="text-[22px] font-bold mt-2">Failed to load product: {error.message}</p>
                            <p className="text-[16px] text-gray-700 mt-1">Please ensure your backend server is running and the product ID is valid.</p>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <div className="main_content_wrapper">
                    <InnerBanner />
                    <section className='product_details_section bg-cream-100 py-10'>
                        <div className='container max-w-[1320px] mx-auto px-4 text-center'>
                            <h5 className="text-[17px] text-brown-600 uppercase tracking-widest">Product Not Found</h5>
                            <p className="text-[22px] font-bold mt-2">The product you are looking for does not exist.</p>
                            <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mx-auto w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5 mt-6 rounded-md shadow-md hover:bg-brown-700 transition-colors" onClick={() => navigate('/shop')}>
                                Back to Shop
                            </button>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        );
    }

    // If product is loaded successfully, render the details (unchanged)
    return (
        <>
            <div className="main_content_wrapper">
                <InnerBanner dynamicTitle={product?.name} />
                <section className='product_details_section bg-cream-100 py-10'>
                    <div className='container max-w-[1320px] mx-auto px-4'>
                        <div className='section_content_wrapper flex items-start justify-between overflow-visible border-b-1 border-gray-700 pb-10'>
                            <div className="product_view_block w-[48%] left">
                                <div className="inner_content_wrapper bg-white p-5 flex items-start justify-between">
                                    <div className="product_preview mx-auto">
                                        <img
                                            className="w-full h-auto max-w-[500px] object-contain"
                                            src={product.imageUrl}
                                            alt={product.name || 'Product Image'}
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x700/E0E0E0/808080?text=Image+Not+Found'; }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="product_details_block w-[48%] right">
                                <div className="inner_content_wrapper">
                                    <div className="product_info_row border-b-1 border-gray-200 pb-2">
                                        <h3 className="text-black font-urbanist font-semibold text-[35px] product_title">{product.name}</h3>
                                        <div className="rating_review flex items-center mt-1">
                                            <div className="rating_star mr-4">
                                                <div className='rating_star flex items-center justify-start text-black gap-1.5 mb-1 max-w-max'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`fi ${i < parseInt(product.rating) ? 'fi-ss-star' : 'fi-rr-star'}`}></i>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="review">
                                                <p className="text-black font-roboto text-[15px] "><span className="review_counter">0</span> review(s)</p>
                                            </div>
                                        </div>
                                        <div className="product_price">
                                            <h3 className="price text-[35px] font-semibold">{product.price}</h3>
                                        </div>
                                    </div>
                                    <div className="product_variation_info mb-4 pt-5 border-b-1 border-gray-200 pb-2">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="font-medium w-25">Skin Type</span>
                                            <span className="bg-gray-200 px-2 py-1">Normal</span>
                                            <span className="bg-[#d7c09e] px-2 py-1">Dry</span>
                                            <span className="bg-[#f4e9d6] px-2 py-1">Oil</span>
                                        </div>

                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="font-medium w-25">Item Type</span>
                                            <span className="bg-gray-700 text-white px-2 py-1">Cream</span>
                                        </div>

                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="font-medium w-25">Used For</span>
                                            <span className="bg-gray-700 text-white px-2 py-1">Whitening</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex justify-center items-center gap-2 mt-4 md:mt-0 product_quantity">
                                            <button onClick={decreaseQuantity} className="w-8 h-8 border text-xl text-center cursor-pointer hover:bg-gray-200">-</button>
                                            <span className="w-8 text-center">{quantity}</span>
                                            <button onClick={increaseQuantity} className="w-8 h-8 border text-xl text-center cursor-pointer hover:bg-gray-200">+</button>
                                        </div>
                                        
                                        <button className="flex-1 bg-gray-800 text-white py-3 px-4 cursor-pointer" onClick={() => addToCart(product)}>
                                            Add To Cart
                                        </button>
                                    </div>
                                    <div className="flex gap-2 mb-4">
                                        <button className="flex-1 bg-[#bfa35a] text-white py-3 px-4 cursor-pointer" onClick={() => addToWishlist(product)}>
                                            Add To Wishlist
                                        </button>
                                        <button className="flex-1 bg-[#c46629] text-white py-3 px-4 cursor-pointer" onClick={handleBuyNow}>
                                            Buy It Now
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3 mt-6 text-xl">
                                        <span className="text-sm font-medium">Share With Us:</span>
                                        <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                                        <FaXTwitter className="cursor-pointer hover:text-black" />
                                        <FaInstagram className="cursor-pointer hover:text-pink-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product_information_block mx-auto mt-10">
                            {/* Tabs */}
                            <div className="flex mb-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`px-4 py-3 text-sm font-medium uppercase border-0 mr-2 cursor-pointer ${
                                            activeTab === tab.id
                                                ? 'bg-cream-500 text-white'
                                                : 'bg-cream-400 text-black'
                                        }`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="p-4 text-sm leading-relaxed bg-white border border-t border-gray-300">
                                {activeTab === 'description' && (
                                    <>
                                        {product.description.split('\n').map((paragraph, index) => (
                                            <p key={index} className={`mb-4 text-gray ${index === product.description.split('\n').length - 1 ? 'mb-0' : ''}`}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </>
                                )}

                                {activeTab === 'shipping' && (
                                    <p>Shipping information content goes here.</p>
                                )}

                                {activeTab === 'reviews' && (
                                    <p>Customer reviews content goes here.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetails;