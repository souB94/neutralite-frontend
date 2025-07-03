import { useNavigate } from 'react-router-dom';
import './WeekendOfferBlock.css';

function WeekendOfferBlock(){

    const navigate = useNavigate();

    const handleViewProduct = () => {
        navigate('/shop');
    };

    return(
        <section className="weekend_offer_block py-10">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapper">
                    <div className="weekend_offer_box max-w-[620px] flex justify-center flex-wrap mx-auto py-15 px-20 bg-white relative my-10">
                        <h2 className="text-center text-black text-[45px] mb-1 font-semibold">20% Off This Weekend</h2>
                        <p className="text-gray text-[15px] font-roboto text-center">Receive 20% off on everything in-store, when you spend over $100. Discounts Applied automatically at checkout.</p>
                        <button className="banner_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mt-5 w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5" onClick={handleViewProduct}>
                            Shop Now <span className="fi fi-rr-arrow-right ml-2 transform translate-y-[3px]"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WeekendOfferBlock;