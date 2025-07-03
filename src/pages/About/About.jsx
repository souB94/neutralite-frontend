
import InnerBanner from '../../components/InnerBanner/InnerBanner';
import ImageTextBlockThree from '../../components/ImageTextBlockThree/ImageTextBlockThree';
import ImageTextBlockFour from '../../components/ImageTextBlockFour/ImageTextBlockFour';
import OurExpert from "../../components/OurExpert/OurExpert";
import Footer from "../../components/Footer/Footer";
import FeatureBar from '../../components/FeatureBar/featureBar';
import LeafVectorOne from '../../assets/images/about/leaf_vector_1.png';
import './About.css';

function About(){

    return(
        <>
           
            <div className="main_content_wrapper">
                <InnerBanner />
                <ImageTextBlockThree />
                <ImageTextBlockFour />
                <OurExpert />
                <FeatureBar />
                <section className="business_timing py-10 bg-white overflow-hidden relative">
                    <div className='floating_object_1 absolute right-0 -bottom-10 w-70 transform rotate-90 z-1'><img className='w-full' src={LeafVectorOne} alt="Leaf Image One" /></div>
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper relative z-2">
                            <div className="section_header text-center">
                                <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Expert Spotlight</h5>
                                <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">The Times That We're Open</h2>
                            </div>
                            <div className="business_timing_row flex items-start justify-center mt-10">
                                <div className="business_timing_box w-1/4 p-5 text-center border-r-1 border-gray-300">
                                    <h4 className="business_day text-[25px] text-black">Monday</h4>
                                    <p className="business_status text-red-500 text-[16px]">Closed</p>
                                </div>
                                <div className="business_timing_box w-1/4 p-5 text-center border-r-1 border-gray-300">
                                    <h4 className="business_day text-[25px] text-black">Tuesday - Friday</h4>
                                    <p className="business_status text-brown-600 text-[16px]">9:00am - 15:00pm</p>
                                </div>
                                <div className="business_timing_box w-1/4 p-5 text-center border-r-1 border-gray-300">
                                    <h4 className="business_day text-[25px] text-black">Saturday</h4>
                                    <p className="business_status text-brown-600 text-[16px]">8:00am - 13:00pm</p>
                                </div>
                                <div className="business_timing_box w-1/4 p-5 text-center">
                                    <h4 className="business_day text-[25px] text-black">Sunday</h4>
                                    <p className="business_status text-red-500 text-[16px]">Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default About;