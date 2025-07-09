import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import QuoteIcon from '../../assets/images/quote_icon.png';
import ClientImageOne from '../../assets/images/testimonial/client_img_1.png';
import ClientImageTwo from '../../assets/images/testimonial/client_img_2.png';
import ClientImageThree from '../../assets/images/testimonial/client_img_3.png';

import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import './ClientTestimonial.css';


function ClientTestimonial(){

    const slides = [

        {
            id: 'testimonial_slide_1',
            className: 'testimonial_slide',
            icon: QuoteIcon,
            comment: 'My skin has never felt this soft and radiant! I’ve struggled with dryness for years, and this cream changed everything. It’s part of my daily ritual now.',
            rating: (
                <div className='rating_star flex item-center justify-center text-black gap-1.5 mb-1'>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                </div>
            ),
            ClientName: 'Ariana M'+'.',
            ClientImage: ClientImageOne
        },
        {
            id: 'testimonial_slide_2',
            className: 'testimonial_slide',
            icon: QuoteIcon,
            comment: 'Ahasellus pellentesque Proin tempus tempor diam, non pellentesque quam ornare vel. Aenean laoreet. Praesent in nunc vel urna consequat mattis eget vel libero.',
            rating: (
                <div className='rating_star flex item-center justify-center text-black gap-1.5 mb-1'>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                </div>
            ),
            ClientName: 'Barbara T'+'.',
            ClientImage: ClientImageTwo
        },
        {
            id: 'testimonial_slide_3',
            className: 'testimonial_slide',
            icon: QuoteIcon,
            comment: 'Teaesent in nunc vel urna consequat mattis eget vel libero. Phasellus pellentesque Proin tempus tempor diam, non pellentesque quam ornare vel. Aenean laorees',
            rating: (
                <div className='rating_star flex item-center justify-center text-black gap-1.5 mb-1'>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                    <i className="fi fi-ss-star"></i>
                </div>
            ),
            ClientName: 'Ketty J'+'.',
            ClientImage: ClientImageThree
        }
    ]

    return(
        <section id="testimonial" className="testimonial py-10">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_header text-center mb-8">
                    <h5 className="text-[17px] font-urbanist text-white uppercase tracking-widest">Loved by Thousands</h5>
                    <h2 className="text-[45px] font-bold text-white leading-14 tracking-normal mb-2">What Our Customers Are Saying</h2>
                    <p className='text-white font-normal text-[15px] font-roboto  mx-auto'>Real stories. Real results. Hear from the people who’ve transformed their skincare routines with our clean, effective beauty products.
                    </p>
                </div>
                <div className="testimonial_slider_wrapper">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={true}
                        pagination={false}
                        autoplay={{
                        delay: 5000, // Adjust the delay as needed
                        disableOnInteraction: true,
                        }}
                        loop={true}
                        className="w-3xl" // width set to 100%
                    >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id} className={slide.className}>
                           <div className="inner_content_wrapper flex flex-col items-center justify-center px-10 py-10 bg-white">
                                <div className="quote_icon_wrapper mx-auto mb-5">
                                    <img src={slide.icon} alt="Quote Icon" />
                                </div>
                                <div className="comment_wrapper text-center w-lg mx-auto mb-3">
                                    <p className="text-sm text-[15px] font-roboto text-gray">{slide.comment}</p>
                                </div>
                                <div className="rating_wrapper">
                                    {slide.rating}
                                </div>
                                <div className="client_information text-center">
                                    <h4 className="font-medium mb-4 text-[18px]">{slide.ClientName}</h4>
                                    <img src={slide.ClientImage} alt="Client Image" />
                                </div>
                           </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default ClientTestimonial;