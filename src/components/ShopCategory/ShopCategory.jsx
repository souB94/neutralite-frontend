import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// Remove these local image imports as you'll be using URLs from the backend
// import BodyLotionImage from '../../assets/images/products/category/body_lotion.png';
// import MoisturizerImage from '../../assets/images/products/category/moisturizer.png';
// import FaceCreamImage from '../../assets/images/products/category/face_cream.png';
// import TeethWhitnerImage from '../../assets/images/products/category/teeth_whitner.png';
// import BathingSaltImage from '../../assets/images/products/category/bathing_salt.png'
import './ShopCategory.css';

function ShopCategory() {
    const [ProductCategory, setProductCategory] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const navigate = useNavigate();
    const handleViewProduct = () => {
        navigate('/shop');
    };

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                setLoading(true); // Start loading
                const response = await fetch('http://localhost:5000/api/shopCategories'); // 👈 backend API URL

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setProductCategory(data);
                console.log("Fetched Product Categories:", data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err); // Set error state
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchProductCategories();
    }, []);

    // Split ProductCategory into two columns
    // Assuming ProductCategory is an array of product objects

    // Ensure ProductCategory has data before slicing to avoid errors if it's empty
    const leftColumn = ProductCategory.slice(0, 4);
    const rightColumn = ProductCategory.slice(4, 5);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-urbanist text-gray-700">Loading categories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <section className="shop_category py-10 bg-cream-100">
                <div className="container max-w-[1320px] mx-auto px-4">
                    <div className="section_content_wrapper">
                        <div className="section_header text-center">
                            <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Top Picks</h5>
                            <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Shop By Category</h2>
                        </div>
                        <div className="product_category_row flex items-stretch justify-center mt-15">
                            <div className="text-center w-full py-10">
                                <p className="text-[22px] font-urbanist text-red-600">Error loading categories: {error.message}</p>
                                <p className="text-[18px] font-urbanist text-gray-700">Please try again later or check your backend server.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (ProductCategory.length === 0) {
        return (
            <section className="shop_category py-10 bg-cream-100">
                <div className="container max-w-[1320px] mx-auto px-4">
                    <div className="section_content_wrapper">
                        <div className="section_header text-center">
                            <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Top Picks</h5>
                            <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Shop By Category</h2>
                        </div>
                        <div className="product_category_row flex items-stretch justify-center mt-15">
                            <div className="text-center w-full py-10">
                                <p className="text-[22px] font-urbanist text-gray-700">No product categories found.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="shop_category py-10 bg-cream-100">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapper">
                    <div className="section_header text-center">
                        <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Top Picks</h5>
                        <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Shop By Category</h2>
                    </div>
                    <div className="product_category_row flex items-stretch justify-center mt-15">
                        <div className="product_category_col w-[70%] flex flex-wrap gap-4">
                            {/* Map over leftColumn data */}
                            {leftColumn.map((product) => (
                                <div key={product._id} className="product_category_box relative overflow-hidden w-[48%] cursor-pointer" onClick={handleViewProduct}>
                                    {/* Use product.image (which is the URL from backend) */}
                                    <img className="w-full h-full object-cover" src={product.image} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300?text=Image+Not+Found'; }} />
                                    <div className="floating_text absolute left-10 bottom-10 w-70 z-2">
                                        <h6 className="text-[12px] uppercase text-black tracking-widest">{product.category}</h6>
                                        {/* Use product.name for the title */}
                                        <h4 className="text-[22px] font-medium text-black mb-1">{product.name}</h4>
                                        <p className="text-gray text-[14px] font-roboto">{product.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="product_category_col w-[30%] flex flex-wrap gap-4">
                            {/* Map over rightColumn data */}
                            {rightColumn.map((product) => (
                                <div key={product._id} className="product_category_box relative overflow-hidden w-[100%] cursor-pointer" onClick={handleViewProduct}>
                                    {/* Use product.image (which is the URL from backend) */}
                                    <img className="w-full h-full object-cover object-left" src={product.image} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x600?text=Image+Not+Found'; }} />
                                    <div className="floating_text absolute left-10 bottom-10 w-70 z-2">
                                        <h6 className="text-[12px] uppercase text-black tracking-widest">{product.category}</h6>
                                        {/* Use product.name for the title */}
                                        <h4 className="text-[22px] font-medium text-black mb-1">{product.name}</h4>
                                        <p className="text-gray text-[14px] font-roboto">{product.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShopCategory;