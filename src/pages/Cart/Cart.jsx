// src/pages/CartPage.jsx
import React from 'react';
import Footer from "../../components/Footer/Footer";
import InnerBanner from "../../components/InnerBanner/InnerBanner";
// CartImageTwo is likely not needed if items have their own imageUrl
// import CartImageTwo from '../../assets/images/products/recommended/product_2.png';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for "Continue Shopping"
import { useCart } from '../../context/CartContext'; // Import your CartContext hook

function CartPage() { // Renamed component to CartPage for consistency and clarity
    // --- CRITICAL FIX: Get cartItems and setCartItems from Context ---
    const { cartItems, setCartItems } = useCart();

    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    // Functions to handle quantity changes and item removal (same as in Minicart)
    const increaseItemQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item._id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseItemQuantity = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item._id !== id));
    };

    // Calculate total price for all items in the cart
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const priceString = String(item.price).replace('$', '');
            const price = parseFloat(priceString) || 0;
            const quantity = item.quantity || 0;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    // Handler for "Continue Shopping" button
    const handleContinueShopping = () => {
        navigate('/shop'); // Or '/products' if that's your shop page route
    };

    // Handler for "Checkout" button
    const handleCheckout = () => {
        navigate('/checkout'); // Navigate to your checkout page
    };

    return (
        <>
            <div className="main_content_wrapper">
                <InnerBanner title="Shopping Cart" breadcrumb="Home / Cart" />

                <section className="shopping_cart_details_wrapper py-10 px-4 bg-[#fdf4ed] text-[#2a2a2a]">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_header mb-10 flex items-center justify-between">
                            <h2 className="text-[35px] text-black font-semibold">Shopping Cart</h2>
                            <button
                                className="bg-gray-800 text-white px-5 py-2 font-urbanist cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={handleContinueShopping}
                            >
                                Continue Shopping
                            </button>
                        </div>

                        {/* --- CRITICAL FIX: Conditional rendering based on cartItems.length --- */}
                        {cartItems.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                                <Link to="/shop" className="bg-brown-600 text-white px-6 py-3 hover:bg-brown-700 transition-colors duration-300">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="max-w-[5xl] mx-auto product_table_wrapper">
                                {/* Header Row */}
                                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.5fr] font-semibold border-b pb-2 product_table_head text-center">
                                    <span className="text-left">Product</span>
                                    <span>Price</span>
                                    <span>Quantity</span>
                                    <span className="text-right">Total</span>
                                </div>
                                {/* Product Rows - Map over cartItems */}
                                <div className="mx-auto product_table_body">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="grid md:grid-cols-[2fr_1fr_1fr_0.5fr] items-center py-6 border-b product_table_row">
                                            {/* Product Info */}
                                            <div className="flex gap-4 items-center product_info">
                                                {/* Use item.imageUrl for the image source */}
                                                <img src={`${backendUrl}/uploads/${item.imageUrl}` || CartImageTwo} alt={item.name} className="w-20 h-20 object-contain" />
                                                <div className="text-sm space-y-1">
                                                    <h3 className="font-semibold">{item.name}</h3>
                                                    {/* Display additional item details if available */}
                                                    {item.skinType && <p>Skin Type: {item.skinType}</p>}
                                                    {item.itemForm && <p>Item Form: {item.itemForm}</p>}
                                                    {item.usedFor && <p>Used For: {item.usedFor}</p>}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-center md:text-center">
                                                ${(parseFloat(String(item.price).replace('$', '')) || 0).toFixed(2)}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex justify-center items-center gap-2 mt-4 md:mt-0 product_quantity">
                                                <button onClick={() => decreaseItemQuantity(item._id)} className="w-8 h-8 border text-xl text-center cursor-pointer hover:bg-gray-200">-</button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button onClick={() => increaseItemQuantity(item._id)} className="w-8 h-8 border text-xl text-center cursor-pointer hover:bg-gray-200">+</button>
                                                <button
                                                    className="ml-2 w-[35px] h-[35px] flex items-center justify-center bg-red-100 text-red-600 cursor-pointer text-md hover:bg-red-200"
                                                    onClick={() => removeItem(item._id)}
                                                >
                                                    <i className="fi fi-rr-trash flex"></i>
                                                </button>
                                            </div>

                                            {/* Total for individual item */}
                                            <div className="text-right font-semibold mt-4 md:mt-0 product_price">
                                                ${(parseFloat(String(item.price).replace('$', '')) * item.quantity || 0).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cart Totals and Checkout */}
                                <div className="product_total_row mt-7 flex flex-col md:flex-row items-start md:items-end justify-between">
                                    <div className="add_note_block mb-6 md:mb-0">
                                        <p className="text-black text-sm mb-2">Add Note</p>
                                        <form id="note" className="note">
                                            <div className="form_group">
                                                <textarea name="note" id="" className="w-full md:w-[250px] h-[100px] bg-white border border-gray-400 p-2 resize-y"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="total_price_wrapper text-right w-full md:w-auto">
                                        <p className="text-black text-[16px] font-urbanist mb-1">
                                            Subtotal <span className="ml-3 font-bold text-[22px]">${calculateTotalPrice()}</span>
                                        </p>
                                        <p className="text-black text-[14px] font-roboto text-gray-600 mb-4">Taxes and shipping calculated at checkout</p>
                                        <button
                                            className="bg-brown-600 text-white w-full md:w-[300px] px-5 py-3 font-urbanist cursor-pointer hover:bg-brown-700 transition-colors"
                                            onClick={handleCheckout}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default CartPage; // Export as CartPage