import InnerBanner from '../../components/InnerBanner/InnerBanner';
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";

function Contact (){
    return(
        <>
        
        <div className="main_content_wrapper">
            <InnerBanner />
            <section className="contact_us_section py-10 bg-white">
                <div className="container max-w-[1320px] mx-auto px-4">
                    <div className="section_content_wrapper flex flex-wrap">
                        <div className="content_wrapper w-1/2 pr-10">
                        <div className="section_header">
                                <h2 className="text-black text-[45px] font-semibold mb-2">Reach Us</h2>
                                <p className="text-gray text-[15px]">We're here to answer your questions and provide the support you need. Feel free to contact us anytime.</p>
                            </div>
                            <div className="contact_list_wrapper mt-8">
                                <ul className="contact_list">
                                    <li className="phone mb-6">
                                        <a href="tel:0123456789" className="flex items-center justify-start">
                                            <span className="icon_wrapper w-15 h-15 bg-cream-400 text-black flex justify-center items-center text-[20px] rounded-full"><i className="fi fi-sr-phone-call flex"></i></span>
                                            <span className="text_wrapper ml-3 w-[70%]">
                                                <span className="text_1 uppercase tracking-widest text-[12px] block">phone</span>
                                                <span className="text_2 text-black text-[20px] font-urbanist font-medium">0000 - 123 - 456789</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="email mb-6">
                                        <a href="mailto:info@example.com" className="flex items-center justify-start">
                                            <span className="icon_wrapper w-15 h-15 bg-cream-400 text-black flex justify-center items-center text-[20px] rounded-full"><i className="fi fi-sc-envelope flex"></i></span>
                                            <span className="text_wrapper ml-3 w-[70%]">
                                                <span className="text_1 uppercase tracking-widest text-[12px] block">email</span>
                                                <span className="text_2 text-black text-[20px] font-urbanist font-medium">info@example.com</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="address">
                                        <a href="mailto:info@example.com" className="flex items-center justify-start">
                                            <span className="icon_wrapper w-15 h-15 bg-cream-400 text-black flex justify-center items-center text-[20px] rounded-full"><i className="fi fi-ss-marker flex"></i></span>
                                            <span className="text_wrapper ml-3 w-[70%]">
                                                <span className="text_1 uppercase tracking-widest text-[12px] block">address</span>
                                                <span className="text_2 text-black text-[20px] font-urbanist font-medium">No: 58 A, East Madison Street,
                                                    Baltimore, MD, USA 4508
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content_wrapper w-1/2 pl-10">
                            <div className="section_header">
                                <h2 className="text-black text-[45px] font-semibold mb-4">Locate Us</h2>
                                <div className="location_map_wrapper">
                                    <Map />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact_form_section py-10 bg-cream-100">
                <div className="container max-w-[1320px] px-4 mx-auto">
                    <div className="section_content_wrapper">
                        <div className="section_header text-center">
                                <h2 className="text-black text-[45px] font-semibold mb-2">Let's talk</h2>
                                <p className="text-gray text-[15px] font-roboto">Reach out with any questions, feedback, or support needs — we’ll get back to you as soon as possible.</p>
                            </div>
                            <div className="contact_form_wrapper">
                                <form id="contact_form" className="bg-cream-400 mt-8 max-w-[850px] mx-auto">
                                    <div className="form_inner_wrapper flex flex-wrap p-5 items-start justify-between">
                                        <div className="form_group name w-full ">
                                            <input id="name" name="name" type="text" className="form_control py-3 px-5 bg-white w-full" placeholder="Name" />
                                        </div>
                                            <div className="form_group email w-full mt-3">
                                            <input id="email" name="email" type="email" className="form_control py-3 px-5 bg-white w-full" placeholder="Email" />
                                        </div>
                                        <div className="form-group message w-full mt-3">
                                            <textarea name="mesage" id="message" className="form_control h-40 bg-white w-full py-3 px-5" placeholder="Your Message"></textarea>
                                        </div>
                                        <div className="submit_btn_wrapper w-full mt-4">
                                            <button className="flex-1 bg-brown-600 text-white py-3 px-4 cursor-pointer w-full font-urbanist font-bold">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer />
        </>
    );
}

export default Contact;