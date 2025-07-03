import { useNavigate } from 'react-router-dom';
import AboutProductImageTwo from '../../assets/images/about/feat_img_2.png';
import LeafVectorOne from '../../assets/images/about/leaf_vector_1.png';
import LeafVectorTwo from '../../assets/images/about/leaf_vector_2.png';
import './ImageTextBlockFour.css';

function ImageTextBlockFour(){

    const navigate = useNavigate();
    const handleViewProduct = () => {
        navigate('/shop');
    }

    return(

        <section id="beauty_beyond_trends" className="image_text_block py-10 bg-cream-100 beauty_beyond_trends relative overflow-hidden ">
            <div className='floating_object_1 absolute right-0 top-0 w-70'><img className='w-full' src={LeafVectorOne} alt="Leaf Image One" /></div>
            <div className="container max-w-[1320px] mx-auto px-4 z-2 relative">
                <div className="section_content_wrapper flex items-center justify-center">
                    <div className='text_wrapper w-1/2 pr-5'>
                        <div className="section_header">
                            <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Beauty Beyond Trends</h5>
                            <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">The best skin shine is <br /> what we provide for you</h2>
                        </div>
                        <p className='text-gray font-normal text-[15px] font-roboto leading-6'>The best skin shine is what we provide for you. Our iconic cosmetic products are designed to enhance your natural glow with trusted ingredients and timeless elegance. Committed to quality, innovation, and skin-loving formulas, we help you achieve radiant beauty that lasts. Because your skin deserves nothing less than iconic care.
                        </p>
                        <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mt-8 w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5" onClick={handleViewProduct}>
                            Shop Now <span className="fi fi-rr-arrow-right ml-2 transform translate-y-[3px]"></span>
                        </button>
                    </div>
                    <div className="image_wrapper w-1/2 pl-5">
                        <div className="inner_image_wrapper relative">
                            <img className="max-w-[100%] relative z-1" src={AboutProductImageTwo} alt="Our Iconic Cosmetic Products Image" />
                            <div className='play_btn absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center z-2 bg-white rounded-full text-[25px] cursor-pointer'>
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 -z-1"></span>
                                <i className="fi fi-br-play-circle flex relative z-2"></i>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
             <div className='floating_object_1 absolute left-0 bottom-0 w-70 z-1'><img className='w-full' src={LeafVectorTwo} alt="Leaf Image Iwo" /></div>
        </section>

    );
}

export default ImageTextBlockFour;