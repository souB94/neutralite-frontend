import FreeShippingIcon from '../../assets/icons/free-shipping-icon.png';
import CustomerSupportIcon from '../../assets/icons/customer-support-icon.png';
import EasyReturnIcon from '../../assets/icons/return-icon.png';
import './FeatureBar.css';
import { useLocation } from 'react-router-dom';


function FeatureBar (){

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isAbout = location.pathname === '/about';

    const featureBarClasses = `
    feature_bar_wrapper
    ${isHomePage ? 'bg-cream-400' : ''} 
    ${isAbout ? 'bg-cream-100' : ''} 
  `.trim();

    return (
        
        <section className={featureBarClasses}>
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="feature_bar_content flex items-center justify-between">
                    <div className="feature_box flex items-center max-w-[310px] w-full py-7 px-7">
                        <div className="icon_wrapper mr-4">
                            <img src={FreeShippingIcon} alt="Free Shipping" />
                        </div>
                        <div className='text_wrapper'>
                            <h5 className='uppercase text-black text-xs font-roboto tracking-wider'>Shipping</h5>
                            <h3 className='text-black text-[16px] font-urbanist font-semibold'>Free Shipping World Wide</h3>
                        </div>
                    </div>
                    <div className='dash w-[150px] h-[1px] bg-black'></div>
                    <div className="feature_box flex items-center max-w-[310px] w-full py-7 px-7">
                        <div className="icon_wrapper mr-4">
                            <img src={CustomerSupportIcon} alt="Customer Support" />
                        </div>
                        <div className='text_wrapper'>
                            <h5 className='uppercase text-black text-xs font-roboto tracking-wider'>HASSELE FREE</h5>
                            <h3 className='text-black text-[16px] font-urbanist font-semibold'>24*7 Customer Support</h3>
                        </div>
                    </div>
                     <div className='dash w-[150px] h-[1px] bg-black'></div>
                    <div className="feature_box flex items-center max-w-[310px] w-full py-7 px-7">
                        <div className="icon_wrapper mr-4">
                            <img src={EasyReturnIcon} alt="Easy Return" />
                        </div>
                        <div className='text_wrapper'>
                            <h5 className='uppercase text-black text-xs font-roboto tracking-wider'>EASY RETURN</h5>
                            <h3 className='text-black text-[16px] font-urbanist font-semibold'>30 Days Return Policy</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    );
}

export default FeatureBar;