import { useNavigate } from 'react-router-dom';
import AboutProductImageOne from '../../assets/images/about/feat_img_1.png';
import './ImageTextBlockThree.css';

function ImageTextBlockThree(){

    const navigate = useNavigate();
    const handleViewProduct = () => {
        navigate('/shop');
    }

    return(

        <section id="our_iconic_cosmetic" className="image_text_block py-10 bg-white our_iconic_cosmetic">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapper flex items-center justify-center">
                    <div className="image_wrapper w-1/2 pr-5">
                        <div className="inner_image_wrapper relative">
                            <img className="max-w-[100%] relative z-1" src={AboutProductImageOne} alt="Our Iconic Cosmetic Products Image" />
                            
                        </div>
                    </div>
                    <div className='text_wrapper w-1/2 pl-5'>
                        <div className="section_header">
                            <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Iconic. Inspiring. Indispensable.</h5>
                            <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Concerning Our Iconic Cosmetic Products</h2>
                        </div>
                        <p className='text-gray font-normal text-[15px] font-roboto leading-6'>At Neutrilite, we believe beauty should be timeless. Our iconic cosmetic products are crafted with precision, passion, and purpose—celebrating individuality while delivering exceptional results. Rooted in quality and innovation, we blend classic elegance with modern science to create beauty staples that stand the test of time. Join us in redefining iconic beauty, one product at a time.
                        </p>
                        <ul className='mt-5 font-roboto text-[14px] text-gray about_feat_list columns-2'>
                            <li className='mb-2'>Deep Tissue</li>
                            <li className='mb-2'>Aromatherapy</li>
                            <li className='mb-2'>Myofascial</li>
                            <li className='mb-2'>Swedish</li>
                            <li className='mb-2'>Craniosacral</li>
                            <li className='mb-2'>Hot Stone</li>
                            <li className='mb-2'>Reflexology</li>
                            <li className='mb-2'>Pregnancy</li>
                        </ul>
                        <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mt-8 w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5" onClick={handleViewProduct}>
                            Shop Now <span className="fi fi-rr-arrow-right ml-2 transform translate-y-[3px]"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default ImageTextBlockThree;