// src/components/Header/Minicart.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

function Minicart() {
    const { cartItems, setCartItems } = useCart();
    const { wishlistItems } = useWishlist();

    
    const navigate = useNavigate();
    const handleWishlist = () =>{
        navigate('/wishlist');
    }

    const handleCart = () =>{
        navigate('/cart');
    }

    const handleCheckout = () =>{
        navigate('/checkout');
    }

    // --- DEBUGGING START ---
    // Log cartItems whenever they change in Minicart component
    console.log("Minicart - current cartItems:", cartItems);
    // --- DEBUGGING END ---

    const showMiniCart = () => {
        const cart = document.querySelector('.shopping_cart_wrapper');
        if (cart) {
            cart.classList.toggle('showCart');
        }
    }

    const closeMiniCart = () => {
        const cart = document.querySelector('.shopping_cart_wrapper');
        if (cart) {
            cart.classList.remove('showCart');
        }
    }

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

    const totalCartItemsQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    const totalWishlistItems = wishlistItems.length;

    // Detailed Debugging for calculateTotalPrice
    const calculateTotalPrice = () => {
        let total = 0;

        if (!cartItems || cartItems.length === 0) {
            return "00.00";
        }

        total = cartItems.reduce((acc, item) => {
            // --- CHANGE STARTS HERE ---
            // Remove the dollar sign before parsing
            const priceString = String(item.price).replace('$', ''); // Ensure it's a string, then remove '$'
            const price = parseFloat(priceString);
            // --- CHANGE ENDS HERE ---

            const quantity = item.quantity;

            if (isNaN(price)) {
                console.warn(`WARNING: Price for item ${item._id} ("${item.price}") resulted in NaN even after removing '$'.`);
                return acc + (0 * (quantity || 0));
            }
            if (isNaN(quantity) || quantity === null || quantity === undefined) {
                console.warn(`WARNING: Quantity for item ${item._id} (${item.quantity}) resulted in NaN or invalid.`);
                return acc + (price * 0);
            }

            const itemTotal = price * quantity;
            return acc + itemTotal;
        }, 0);

        return total.toFixed(2);
    };


    return (
        <>
            <div className='minicart_wishlist_wrapper flex'>
                {/* NEW: Wishlist Icon and Counter - Placed next to cart for easy grouping */}
                <div className="wishlist_icon_counter_wrapper cursor-pointer relative mr-4" onClick={handleWishlist}>
                    <i className="fi fi-rr-heart"></i>
                    <span className='absolute top-[-7px] right-[-7px] bg-red-500 w-[18px] h-[18px] text-white text-xs font-bold px-1 rounded-full flex items-center justify-center'>
                        <span className="absolute top-[50%] left-[50%] text-[8px] transform translate-x-[-50%] translate-y-[-50%]">{totalWishlistItems}</span>
                    </span>
                </div>

                {/* Existing Cart Icon and Counter - Now uses dynamic totalCartItemsQuantity */}
                <div className="cart_icon_counter_wrapper cursor-pointer relative" onClick={showMiniCart} >
                    <i className="fi fi-rr-shopping-cart"></i>
                    <span className='absolute top-[-7px] right-[-7px] bg-cream-500 w-[18px] h-[18px] text-white text-xs font-bold px-1 rounded-full flex items-center justify-center'>
                        <span className="absolute top-[50%] left-[50%] text-[8px] transform translate-x-[-50%] translate-y-[-50%]">{totalCartItemsQuantity}</span>
                    </span>
                </div>
            </div>

            {/* Mini Cart Sidebar - REMOVED 'showCart' class initially */}
            <div className="shopping_cart_wrapper w-[400px] h-[546px] bg-cream-100 border-1 absolute z-3 shadow-lg">
                <div className="cart_header py-3 flex items-center justify-between border-b w-[90%] mx-auto mt-3">
                    <h3 className="text-lg font-semibold">Shopping Cart</h3>
                    <button className="text-gray-600 cursor-pointer close_mini_cart hover:text-gray-800 text-[14px] transition-colors duration-300" onClick={closeMiniCart}>
                        <i className="fi fi-rr-cross"></i>
                    </button>
                </div>
                <div className="cart_items_wrapper pt-2 px-5">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500 mt-5">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div className="cart_item flex items-center justify-between p-2 bg-white border-1 border-gray-200 mb-2 relative" key={item._id}>
                                <div className="cart_item_info flex items-center gap-3 relative">
                                    <div className='cart_item_image_wrappper'>
                                        <img src={item.imageUrl} alt={item.name} className='w-[60px] object-cover' />
                                    </div>
                                    <div className="cart_item_details">
                                        <h4 className="text-[17px] font-semibold mb-1">{item.name}</h4>
                                        <div className="cart_item_price text-[15px] font-bold font-urbanist">${(parseFloat(String(item.price).replace('$', '')) || 0).toFixed(2)}</div>
                                        <p className="text-sm text-gray-500 flex items-center">Quantity: <span className="inline-block p-1 text-center bg-red-100 text-red-500 h-[21px] line-height-[5px] ml-2 text-[12px]">{item.quantity || 0}</span></p>
                                        <div className='quantity_selector flex items-center gap-2 mt-2 w-[100px] h-[30px] border-1 justify-center'>
                                            <button
                                                className='quantity_control decrease_quantity w-1/3 cursor-pointer'
                                                onClick={() => decreaseItemQuantity(item._id)}
                                            >
                                                -
                                            </button>
                                            <span className='quantity w-1/3 text-center text-xs'>{item.quantity || 0}</span>
                                            <button
                                                className='quantity_control increase_quantity w-1/3 cursor-pointer'
                                                onClick={() => increaseItemQuantity(item._id)}
                                            >
                                                +
                                            </button>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                <button
                                        className="ml-2 w-[35px] h-[35px] flex items-center justify-center bg-red-100 text-red-600 cursor-pointer text-md hover:bg-red-200 absolute top-2 right-2"
                                        onClick={() => removeItem(item._id)}
                                    >
                                        <i className="fi fi-rr-trash flex"></i>
                                    </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="cart_total_wrapper mt-6 py-5 px-5 bg-cream-300">
                    <div className="cart_total flex items-center justify-between ">
                        <h4 className="text-[17px] font-urbanist font-semibold">Total</h4>
                        <div className="cart_total_price text-[18px] font-bold font-urbanist">
                            ${calculateTotalPrice()}
                        </div>
                    </div>
                    <p className="text-[14px] font-roboto text-gray-600 mt-2">Taxes and shipping calculated at checkout</p>
                    <div className='btn_grp border-t-1 pt-4 mt-4'>
                        <button className='btn_view_cart w-full py-2 bg-black text-white font-urbanist hover:bg-gray-800 transition-colors duration-300 cursor-pointer mb-2' onClick={handleCart}>View Cart</button>
                        <button className='btn_checkout w-full py-2 bg-brown-600 text-white font-urbanist hover:bg-amber-600 transition-colors duration-300 cursor-pointer' onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Minicart;