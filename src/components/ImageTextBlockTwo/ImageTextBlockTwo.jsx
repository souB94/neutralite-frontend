import { useNavigate } from 'react-router-dom';
import LuxuriousCream from '../../assets/images/luxurious_cream.png';

function ImageTextBlockTwo(){

    const navigate = useNavigate();
    const handleViewProduct = () => {
        navigate('/shop');
    }

    return(

        <section id="luxurious_face_cream" className="image_text_block py-10 bg-cream-100 luxurious_face_cream">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapper flex items-center justify-center">
                    <div className="image_wrapper w-1/2 pr-5">
                        <div className="inner_image_wrapper relative">
                            <img className="max-w-[100%] relative z-1" src={LuxuriousCream} alt="Beauty Rooted In Natured Image" />
                            
                        </div>
                    </div>
                    <div className='text_wrapper w-1/2 pl-5'>
                        <div className="section_header">
                            <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Vitamin C rich</h5>
                            <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Luxurious Feeling Face Creams</h2>
                        </div>
                        <p className='text-gray font-normal text-[15px] font-roboto'>Experience skincare that blends nature and science. Our products are thoughtfully crafted to nourish, protect, and enhance your natural beauty
                            — leaving your skin healthy, radiant, and refreshed every day.Experience deep hydration with a silky feel. Our Vitamin C-rich formulas brighten, nourish, and smooth—leaving your skin soft, radiant, and revived.
                        </p>
                        <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mt-8 w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5" onClick={handleViewProduct}>
                            Shop Now <span className="fi fi-rr-arrow-right ml-2 transform translate-y-[3px]"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default ImageTextBlockTwo;