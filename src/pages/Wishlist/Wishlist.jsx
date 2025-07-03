// src/pages/Wishlist.jsx
import React from 'react';
import Footer from "../../components/Footer/Footer";
import InnerBanner from "../../components/InnerBanner/InnerBanner";
// ProductImageTwo might not be needed if items have their own imageUrl
// import ProductImageTwo from '../../assets/images/products/recommended/product_2.png';
import { useCart } from '../../context/CartContext'; // Keep this for "Add to Cart" functionality
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext'; // Correct import path for WishlistContext

function Wishlist(){

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    const { wishlistItems, setWishlistItems } = useWishlist();
    const { setCartItems, cartItems } = useCart(); // Destructure cartItems as well for "Add to Cart" logic

    // Function to remove an item from the wishlist
    const removeItemFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter((item) => item._id !== id));
    };

    // Function to add an item to the cart (you can call this 'addToCart' if your CartContext has it)
    const addItemToCart = (itemToAdd) => {
        // Check if item already exists in cart
        const existingItem = cartItems.find(item => item._id === itemToAdd._id);

        if (existingItem) {
            // If exists, increase quantity
            setCartItems(
                cartItems.map(item =>
                    item._id === itemToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            // If not, add as new item with quantity 1
            setCartItems(prevItems => [...prevItems, { ...itemToAdd, quantity: 1 }]);
        }
        // Optionally, remove from wishlist after adding to cart
        removeItemFromWishlist(itemToAdd._id);
    };

    // --- REMOVE UNNECESSARY CART-RELATED FUNCTIONS ---
    // You don't need increaseItemQuantity, decreaseItemQuantity, removeItem (for cart),
    // and calculateTotalPrice here UNLESS you explicitly want to show a cart summary on the wishlist page.
    // For a dedicated wishlist page, these are typically not needed.
    // I've removed them to keep the code focused on wishlist functionality.
    // You have these functions in Minicart and CartPage, which is where they belong.


    return(
        <>
            <div className="main_content_wrapper">
                <InnerBanner />
                <section className="wishlist_wrapper py-10 bg-cream-100">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper max-w-[100%] overflow-x-auto">

                            {wishlistItems.length === 0 ? ( // <-- CRITICAL FIX: Use wishlistItems.length
                                <div className="text-center py-10">
                                    <p className="text-xl text-gray-600 mb-4">Your wishlist is empty.</p>
                                    <Link to="/shop" className="bg-brown-600 text-white px-6 py-3 hover:bg-brown-700 transition-colors duration-300">
                                        Continue Shopping
                                    </Link>
                                </div>
                            ) : (
                                <table className="wishlist_table text-center max-w-[1320px] w-[1320px]">
                                    <thead className="border-1 border-gray-400">
                                        <tr>
                                            <td className="w-[20%] p-3 bg-cream-200 text-black border-r-1 border-gray-400">Image</td>
                                            <td className="w-[20%] p-3 bg-cream-200 text-black border-r-1 border-gray-400">Product</td>
                                            <td className="w-[20%] p-3 bg-cream-200 text-black border-r-1 border-gray-400">Price</td>
                                            <td className="w-[20%] p-3 bg-cream-200 text-black border-r-1 border-gray-400">Purchase</td>
                                            <td className="w-[20%] p-3 bg-cream-200 text-black border-r-0 border-gray-400">Remove</td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white border-r-1 border-l-1 border-b-1 border-gray-400">
                                        {wishlistItems.map((item) => ( // <-- CRITICAL FIX: Map over wishlistItems
                                            <tr key={item._id}>
                                                <td className="w-[20%] p-4">
                                                    {/* Use item.imageUrl if available, otherwise fallback */}
                                                    <img className="w-1/4 mx-auto" src={`${backendUrl}/uploads/${item.imageUrl}` || ProductImageTwo} alt={item.name} />
                                                </td>
                                                <td className="w-[20%]">
                                                    <h4 className="text-[17px] mb-2">{item.name}</h4>
                                                    {item.skinType && <p className="text-[14px] mb-1">skinType: {item.skinType}</p>}
                                                    {item.usedFor && <p className="text-[14px] mb-1">usedFor: {item.usedFor}</p>}
                                                </td>
                                                <td className="w-[20%]">
                                                    {/* Display price, apply formatting fix */}
                                                    <p className="text-[18px]">
                                                        ${(parseFloat(String(item.price).replace('$', '')) || 0).toFixed(2)}
                                                    </p>
                                                </td>
                                                <td className="w-[20%]">
                                                    <button
                                                        className="py-3 w-full px-3 bg-brown-600 text-white text-[17px] cursor-pointer hover:bg-brown-700 transition-colors duration-300"
                                                        onClick={() => addItemToCart(item)} // Call addItemToCart
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </td>
                                                <td className="w-[20%] text-center">
                                                    <button
                                                        className="text-red-600 text-[22px] cursor-pointer mx-auto"
                                                        onClick={() => removeItemFromWishlist(item._id)} // Call removeItemFromWishlist
                                                    >
                                                        <i className="fi fi-rr-trash flex items-center justify-center"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Wishlist;