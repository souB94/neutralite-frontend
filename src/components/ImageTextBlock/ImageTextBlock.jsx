import { useNavigate } from 'react-router-dom';
import SqureGirlImage from '../../assets/images/top_brands_girl_square_img.png';
import AuthenticBadge from '../../assets/images/authentic_badge.png';
import NoChemicalIcon from '../../assets/icons/no_chemical_icon.png';
import TraditionalMethodIcon from '../../assets/icons/traditional_methods.png';
import NaturalAromaIcon from '../../assets/icons/natural_aroma.png';

import './ImageTextBlock.css';

function ImageTextBlock(){

    const navigate = useNavigate();
    const handleViewProduct = () =>{

        navigate('/shop');
    }

    return(

        <section id="beauty_rooted_nature" className="image_text_block py-10 bg-white beauty_rooted_nature">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapper flex items-center justify-center">
                    <div className="image_wrapper w-1/2 pr-5">
                        <div className="inner_image_wrapper relative">
                            <img className="max-w-[100%] relative z-1" src={SqureGirlImage} alt="Beauty Rooted In Natured Image" />
                            <div className='badge_wrapper absolute top-[20px] right-[20px] z-2 animate-spin'><img className='' src={AuthenticBadge} alt="Authentic Badge" /></div>
                        </div>
                    </div>
                    <div className='text_wrapper w-1/2 pl-5'>
                        <div className="section_header">
                            <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Brighten. Balance. Restore</h5>
                            <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Beauty Rooted in Nature</h2>
                        </div>
                        <p className='text-gray font-normal text-[15px] font-roboto'>Experience skincare that blends nature and science. Our products are thoughtfully crafted to nourish, protect, and enhance your natural beauty
                            — leaving your skin healthy, radiant, and refreshed every day.
                        </p>
                        <div className='product_feature_block mt-10'>
                            <div className='product_feature_box flex item-center justify-items-start'>
                                <div className='icon_wrapper mr-4'>
                                    <img src={NoChemicalIcon} alt="No Chemical Icon" />
                                </div>
                                <div className='text_wrapper'>
                                    <h4 className='text-[25px] text-black mb-3 font-medium leading-6'>No Chemicals</h4>
                                    <p className='text-[15px] font-roboto text-gray'>Crafted without toxins or harsh additives. Just clean, conscious skincare.</p>
                                </div>
                            </div>
                            <div className='product_feature_box flex item-center justify-items-start'>
                                <div className='icon_wrapper mr-4'>
                                    <img src={TraditionalMethodIcon} alt="Traditional Method" />
                                </div>
                                <div className='text_wrapper'>
                                    <h4 className='text-[25px] text-black mb-3 font-medium leading-6'>Traditional Methods</h4>
                                    <p className='text-[15px] font-roboto text-gray'>Handmade using time-honored techniques passed down through generations.</p>
                                </div>
                            </div>
                            <div className='product_feature_box flex item-center justify-items-start'>
                                <div className='icon_wrapper mr-4'>
                                    <img src={NaturalAromaIcon} alt="Natural Icon" />
                                </div>
                                <div className='text_wrapper'>
                                    <h4 className='text-[25px] text-black mb-3 font-medium leading-6'>Natural Aroma</h4>
                                    <p className='text-[15px] font-roboto text-gray'>Infused with botanical scents for a light, refreshing experience.</p>
                                </div>
                            </div>
                        </div>
                        <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mt-10 w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5" onClick={handleViewProduct}>
                            Shop Now <span className="fi fi-rr-arrow-right ml-2 transform translate-y-[3px]"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default ImageTextBlock;