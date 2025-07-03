import Logo from '../../assets/logo/logo.png'; 
import FacebookIcon from '../../assets/images/facebook_icon.png';
import TwitterIcon from '../../assets/images/twitter_icon.png';
import InstagramIcon from '../../assets/images/instagram_icon.png';
import PaymenyMethodImage from '../../assets/images/footer-payment-method.png';

 
 function Footer() {

    return(

        <footer id="site_footer" className="site_footer pt-10 pb-5 bg-cream-400">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="footer_content_wrapper flex item-start justify-between">
                    <div className="footer_col logo_info w-1/4">
                        <div className="inner_content_wrapper">
                            <img className='footer_logo w-[200px] mb-5' src={Logo} alt="Footer Logo" />
                            <p className='footer_info text-[14px] text-gray font-roboto leading-6.5 mb-5'>At Neutralite, we believe in the power of pure, 
                                baldivanced beauty. Our product essentials are thoughtfully formulated to hydrate, protect, and reveal your 
                                natural glow.
                            </p>
                            <div className='footer_social_wrapper flex items-center justify-start'>
                                <h4 className='text-black text-[16px] font-medium mr-3'>Follow Us:</h4>
                                <ul className='social_media_list flex items-center justify-start gap-5'>
                                    <li className='list facebook'>
                                        <a href="#"><img src={FacebookIcon} alt="Facebook Icon" /></a>
                                    </li>
                                    <li className='list twitter'>
                                        <a href="#"><img src={TwitterIcon} alt="Twitter Icon" /></a>
                                    </li>
                                    <li className='list instagram'>
                                        <a href="#"><img src={InstagramIcon} alt="Instagram Icon" /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='footer_col quick_links w-1/8'>
                        <div className='inner_content_wrapper'>
                            <h3 className='text-black text-[22px] font-semibold mb-3'>Quick Links</h3>
                            <ul className='quick_link_list'>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="/about">About</a>
                                </li>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="/faq">FAQ</a>
                                </li>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="/blog">Blog</a>
                                </li>
                                <li className='list'>
                                    <a className='link text-gray-700' href="/contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer_col help w-1/8'>
                        <div className='inner_content_wrapper'>
                             <h3 className='text-black text-[22px] font-semibold mb-3'>Help</h3>
                            <ul className='help_list'>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="#">Shipping & Returns</a>
                                </li>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="#">Track Order</a>
                                </li>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="#">Promotions</a>
                                </li>
                                <li className='list'>
                                    <a className='link text-gray-700' href="#">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer_col our_company w-1/8'>
                        <div className='inner_content_wrapper'>
                             <h3 className='text-black text-[22px] font-semibold mb-3'>Our Company</h3>
                            <ul className='help_list'>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="#">Our Team</a>
                                </li>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="#">Partnership</a>
                                </li>
                                <li className='list mb-2'>
                                    <a className='link text-gray-700' href="#">Terms & Conditions</a>
                                </li>
                                <li className='list'>
                                    <a className='link text-gray-700' href="#">Latest News</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer_col newsletter w-1/4'>
                        <div className='inner_content_wrapper'>
                            <h3 className='text-black text-[22px] font-semibold mb-3'>Newsletter</h3>
                            <p className='text-[14px] text-gray mb-2 font-roboto'>Signup for our newsletter to stay up to date on sales and events.</p>
                            <div className='subscription_form_wrapper mt-5'>
                                <form id="subscription_form">
                                    <div className='form_group mail mb-2'>
                                        <input id='footer_newsletter' className='form_control bg-white px-5 py-3 w-full' type="text" placeholder='Your Mail' />
                                    </div>
                                    <div className='form_group submit_btn'>
                                        <button className='button_submit w-full px-5 py-3 text-center bg-brown-600 text-white text-[18px] cursor-pointer' type='submit'><i className="fi fi-ss-paper-plane flex justify-center items-center h-[24px]"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copyright_bar flex items-center justify-between border-t-2 mt-8 pt-8 border-black'>
                    <div className='payment_methods'>
                        <img className='' src={PaymenyMethodImage} alt="Payment Method" />
                    </div>
                    <div className='copyright_text'>
                        <p className='text-[14px] font-medium font-roboto'>@2025 Neutralite Cosmetics Pvt. Ltd.</p>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;