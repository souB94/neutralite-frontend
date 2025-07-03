import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './topBrands.css';

function topBrands() {

    const [products, setProducts] = useState([]);
    const { cartItems, setCartItems } = useCart(); // Access cart items from context
    const { wishlistItems, setWishlistItems } = useWishlist(); // Access wishlist items from context

    const navigate = useNavigate();
    const handleViewProduct = () =>{
        navigate('/shop');
    }

   const handleViewProductDetails = (productId) => {
        navigate(`/product-details/${productId}`);
    };


    // NEW: Add to Cart function
    const addToCart = (productToAdd) => {
        // Check if the item already exists in the cart based on its _id
        const existingItem = cartItems.find(item => item._id === productToAdd._id);

        if (existingItem) {
            // If the item already exists, update its quantity
            setCartItems(
                cartItems.map(item =>
                    item._id === productToAdd._id
                        ? { ...item, quantity: item.quantity + 1 } // Increment quantity
                        : item // Keep other items as they are
                )
            );
        } else {
            // If the item is new, add it to the cart with a quantity of 1
            setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
        }
    };

     // NEW: Add to Wishlist function
    const addToWishlist = (productToAdd) => {
        // Check if the item already exists in the wishlist based on its _id
        const existingItem = wishlistItems.find(item => item._id === productToAdd._id);

        if (existingItem) {
            // If the item already exists, update its quantity
            setWishlistItems(
                wishlistItems.map(item =>
                    item._id === productToAdd._id
                        ? { ...item, quantity: item.quantity + 1 } // Increment quantity
                        : item // Keep other items as they are
                )
            );
        } else {
            // If the item is new, add it to the wishlist with a quantity of 1
            setWishlistItems([...wishlistItems, { ...productToAdd, quantity: 1 }]);
        }
    };
    

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/products`)
        .then(async res => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`HTTP error! status: ${res.status}, Response: ${text}`);
            }
            return res.json();
        })
        .then(data => {
            setProducts(data);
            console.log("Fetched Products:", data);
        })
        .catch(err => console.error('Fetch error:', err));
    },[]);

    useEffect(() => {
        console.log("Cart Items UPDATED:", cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log("Wishlist Items UPDATED:", wishlistItems);
    }, [wishlistItems]);

    return (
        
        <section className="top_brands bg-cream-100 py-10">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapprt">
                    <div className="section_header text-center">
                        <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">top brands</h5>
                        <h2 className="text-[45px] font-urbanist font-bold text-black leading-14 tracking-normal">Beauty Care Products</h2>
                    </div>
                    <div className="product_row_wrapper mt-6">
                        <div className="product_row flex items-center justify-center">
                             {products.map((product) => {
                                const isInCart = cartItems.some(item => item._id === product._id);
                                const defaultCartIconClasses = 'fi fi-rr-shopping-cart h-[24px]'; // Default cart icon class
                                const addedCartIconClasses = 'fi fi-sr-shopping-cart h-[24px]'; // Class for when the product is in the cart

                                const isInWishlist = wishlistItems.some(item => item._id === product._id);
                                const defaultWishlistIconClasses = 'fi fi-rr-heart h-[24px]'; // Default wishlist icon class
                                const addedWishlistIconClasses = 'fi fi-sr-heart h-[24px]'; // Class for when the product is in the wishlist

                                const wishlistBoxClasses = `wishlist_icon w-[50px] h-[50px] flex items-center justify-center cursor-pointer bg-cream-400 text-black text-[22px] mb-2 ${isInWishlist ? 'added_to_wishlist' : ''}`; // Add desired classes here
                                const cartBoxClasses = `cart_icon w-[50px] h-[50px] flex items-center justify-center cursor-pointer bg-cream-400 text-black text-[22px] mb-2 ${isInCart ? 'added_to_cart' : ''}`; // Add desired classes here
                                // Change icon color based on cart and wishlist status
                                // Use ternary operators to conditionally apply classes based on whether the product is in the cart or wishlist
                                // If the product is in the cart, use the addedCartIconClasses, otherwise use the defaultCartIconClasses
                                // If the product is in the wishlist, use the addedWishlistIconClasses, otherwise use the defaultWishlistIconClasses
                                // This will change the icon color based on whether the product is in the cart or wishlist
                                const finalCartIconClasses = isInCart ? addedCartIconClasses : defaultCartIconClasses; // Change icon color based on cart status
                                const finalWishlistIconClasses = isInWishlist ? addedWishlistIconClasses : defaultWishlistIconClasses; // Change icon color based on wishlist status

                                return (
                                    <a href={`/product-details/${product._id}`} className="product_box w-1/3 p-5" key={product._id} id={product._id}>
                                        <div className="product_img_wrapper bg-white border-1 border-gray-200 relative overflow-hidden">
                                            <div className='product_img_box flex item-center justify-center'>
                                                <img className='w-[300px] h-[445px]' src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/top_brands/${product.imageUrl}`} alt={product.name} />
                                            </div>
                                            <div className='floating_wishlist_cart_icon_group absolute'>
                                                <div className={wishlistBoxClasses} onClick={(e) => {
                                                        e.preventDefault(); // Prevent navigation if this button is inside an <a> tag
                                                        addToWishlist(product); // Call addToWishlist with the current product object
                                                    }} >    
                                                    <i className={finalWishlistIconClasses}></i>
                                                </div>
                                                <div className={cartBoxClasses} onClick={(e) => {
                                                        e.preventDefault(); // Prevent navigation if this button is inside an <a> tag
                                                        addToCart(product); // Call addToCart with the current product object
                                                    }}
                                                    >
                                                    <i className={finalCartIconClasses}></i>
                                                </div>
                                            </div>
                                            <button className='buy_now_btn bg-cream-400 px-4 py-3 cursor-pointer uppercase tracking-widest font-urbanist text-[17px] font-medium text-black' onClick={() => handleViewProductDetails(product._id)}>
                                                buy now
                                            </button>
                                        </div>
                                        <div className='product_text_wrapper text-wrapper mt-5 text-center'>
                                            <h3 className='product_title text-[22px] font-urbanist font-medium mb-1.5'>{product.name}</h3>
                                            <div className='rating_star flex item-center justify-center text-black gap-1.5 mb-1'>
                                                <i className="fi fi-ss-star"></i>
                                                <i className="fi fi-ss-star"></i>
                                                <i className="fi fi-ss-star"></i>
                                                <i className="fi fi-ss-star"></i>
                                                <i className="fi fi-ss-star"></i>
                                            </div>
                                            <div className='product_price'>
                                                <h4 className='font-bold font-urbanist text-[20px]'>{product.price}</h4>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className='section_cta_wrapper text-center mt-5'>
                        <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mx-auto w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5 mt-6" onClick={handleViewProduct}>
                            View All <span className="fi fi-rr-arrow-right ml-2 transform translate-y-[3px]"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default topBrands;