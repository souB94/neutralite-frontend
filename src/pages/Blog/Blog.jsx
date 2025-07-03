
import InnerBanner from '../../components/InnerBanner/InnerBanner';
import BlogSection from "../../components/BlogSection/BlogSection";
import Footer from "../../components/Footer/Footer";
import './Blog.css';

function Blog(){

    return(
        <>
            
            <div className="main_content_wrapper" id="blog">
                <InnerBanner />
                <BlogSection />
                <div className="load_more_btn pb-10 flex justify-center px-4">
                    <button className="blog_btn bg-brown-600 flex text-white text-[16px] cursor-pointer mt-8 w-[150px] items-center justify-center font-urbanist font-semibold py-3 px-5">
                        Load More <span className="fi fi-rr-rotate-right ml-2 flex transform translate-y-[1px]"></span>
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog;