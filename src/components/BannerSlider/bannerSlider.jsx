import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './bannerSlider.css';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// --- ADD THESE IMPORTS ---
// Assuming these are image assets located in your assets folder.
// ADJUST THESE PATHS based on your actual file structure for your static images.
// For example, if BannerGirl.png is in frontend/src/assets/images/banner/
import BannerGirlDefault from '../../assets/images/banner/banner_girl_img.png'; // Placeholder for if API image is missing
import ProductImageDefault from '../../assets/images/banner/banner_product_img.png'; // Placeholder for if API image is missing
// You might have specific images for each slider, or generic placeholders.
// If you intend for *all* images to come from the API, these defaults might be less used
// but are good for a fallback in the placeholder slide.
// -------------------------


function BannerSlider() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const handleViewProduct = () => {
    navigate('/shop');
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/banners`); // 👈 backend API URL

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBanners(data);
        console.log("Fetched Banners:", data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err); // Set error state
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBanners();
  }, []);

  // Conditional rendering for loading and error states (Good practice)
  if (loading) {
    return (
      <div className="banner_slider_wrapper">
        <div className='container max-w-[1320px] h-[100%] flex items-center mx-auto px-4'>
          <div className="banner_content_wrapper relative flex items-center justify-between pt-40">
            <div className="banner_content w-[47%] transform -translate-y-10">
              <h1 className="text-[65px] text-black font-urbanist font-bold mb-4 leading-[1.2]">Loading Banners...</h1>
              <p className="text-[18px] text-gray font-roboto ">Please wait while we fetch the latest banners for you.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="banner_slider_wrapper">
        <div className='container max-w-[1320px] h-[100%] flex items-center mx-auto px-4'>
          <div className="banner_content_wrapper relative flex items-center justify-between pt-40">
            <div className="banner_content w-[47%] transform -translate-y-10">
              <h1 className="text-[65px] text-red-600 font-urbanist font-bold mb-4 leading-[1.2]">Error Loading Banners!</h1>
              <p className="text-[18px] text-red-400 font-roboto ">Failed to fetch banners: {error.message}. Please check your backend server.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="banner_slider_wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000, // Adjust the delay as needed
          disableOnInteraction: true,
        }}
        loop={true}
        className="w-full" // width set to 100%
      >
        {banners.length > 0 ? (
          banners.map((banner) => (
            <SwiperSlide key={banner._id} className="banner_slide">
              <div className='container max-w-[1320px] h-[100%] flex items-center mx-auto px-4'>
                <div className="banner_content_wrapper relative flex items-center justify-between pt-40">
                  <div className="banner_content w-[47%] transform -translate-y-10">
                    <h1 className="text-[65px] text-black font-urbanist font-bold mb-4 leading-[1.2]">{banner.title}</h1>
                    <p className="text-[18px] text-gray font-roboto ">{banner.description || "Discover the ultimate face cream for radiant, healthy skin. Packed with natural ingredients, our formula hydrates, nourishes, and revives—giving your skin the care it truly deserves."}</p>
                    <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer font-urbanist font-semibold py-3 px-5 mt-6" onClick={handleViewProduct}>
                      Shop Now <span className="fi fi-rr-arrow-right ml-2 transform translate-y-[3px]"></span>
                    </button>
                  </div>
                  <div className="banner_image_wrapper w-[50%] relative">
                    {/* Use banner.bannerGirlImage (or whatever field holds the main banner image) from your API data */}
                    <img
                      className='main-img ml-auto relative z-2 w-[500px] tranform translate-x-[60px]'
                      src={banner.bannerGirlImage} // <--- USE DYNAMIC IMAGE URL FROM API
                      alt={banner.title || "Banner Girl Image"}
                      onError={(e) => { e.target.onerror = null; e.target.src = BannerGirlDefault; }} // Fallback
                    />
                    <div className='product_img_wrapper absolute w-[300px] left-[0px] top-auto bottom-[0px] z-1'>
                      {/* Use banner.bannerProductImage (or whatever field holds the product image) from your API data */}
                      <img
                        className='w-full'
                        src={banner.bannerProductImage} // <--- USE DYNAMIC IMAGE URL FROM API
                        alt={banner.title || "Banner Product Image"}
                        onError={(e) => { e.target.onerror = null; e.target.src = ProductImageDefault; }} // Fallback
                      />
                    </div>
                    <div className='blur_bg'></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          // Fallback if banners.length is 0 after loading (e.g., no data in DB)
          <SwiperSlide className="banner_slide">
            <div className='container max-w-[1320px] h-[100%] flex items-center mx-auto px-4'>
              <div className="banner_content_wrapper relative flex items-center justify-between pt-40">
                <div className="banner_content w-[47%] transform -translate-y-10">
                  <h1 className="text-[65px] text-black font-urbanist font-bold mb-4 leading-[1.2]">No Banners Available</h1>
                  <p className="text-[18px] text-gray font-roboto ">Please check your database or add new banners.</p>
                </div>
                <div className="banner_image_wrapper w-[50%] relative">
                  {/* Use default imported images for this static fallback slide */}
                  <img className='main-img ml-auto relative z-2 w-[500px] tranform translate-x-[60px]' src={BannerGirlDefault} alt="Default Banner Girl Image" />
                  <div className='product_img_wrapper absolute w-[300px] left-[0px] top-auto bottom-[0px] z-1'>
                    <img className='max-w-[100px]' src={ProductImageDefault} alt="Default Product Image" />
                  </div>
                  <div className='blur_bg'></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default BannerSlider;
