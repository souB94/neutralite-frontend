import InnerBanner from '../../components/InnerBanner/InnerBanner';
import Footer from "../../components/Footer/Footer";
import AccordionContentBlock from "../../components/AccordionContentBlock/AccordionContentBlock";

function Faq() {
    return(

        <>
            
            <div className="main_content_wrapper">
                <InnerBanner />
                <section className="faq_wrapper py-10 bg-white">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper">
                            <div className="section_header text-center">
                                <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">FAQ</h5>
                                <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Frequently Asked Questions</h2>
                            </div>
                            <AccordionContentBlock />
                        </div>
                    </div>
                </section>
                
            </div>
            <Footer />
        </>
    )
}

export default Faq;