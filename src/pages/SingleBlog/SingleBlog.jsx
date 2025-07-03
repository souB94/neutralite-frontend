import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InnerBanner from '../../components/InnerBanner/InnerBanner';
// Use a more descriptive name for the default related blog image

import DefaultRelatedBlogImage from '../../assets/images/blog/blog_big_img_1.png'; // Make sure this path is correct
import Footer from "../../components/Footer/Footer";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './SingleBlog.css';

function SingleBlog(){
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(true);
    const [popularLoading, setPopularLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    // Effect to fetch the main blog
    useEffect(() => {
        const fetchBlog = async () => {
            console.log('Fetching main blog with ID:', id); // Debug: Main blog fetch start
            setLoading(true);
            try {
                const response = await fetch(`${backendUrl}/api/blogs/${id}`);
                console.log('Main blog fetch response status:', response.status); // Debug: Main blog response status
                if (!response.ok) {
                    throw new Error('Failed to fetch blog');
                }
                const data = await response.json();
                console.log('Main blog data received:', data); // Debug: Main blog data
                setBlog(data);
            } catch (error) {
                console.error('Error fetching main blog:', error); // Debug: Main blog fetch error
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, navigate]); // Depend on 'id' to re-fetch when URL changes

    // Effect to fetch related blogs once the main blog data is available
    useEffect(() => {
        const fetchRelatedBlogs = async () => {
            // Debug: Check blog and category before fetch
            console.log('Checking blog for related fetch:', blog);
            if (!blog || !blog.category) {
                console.log("Skipping related blog fetch: main blog or its category is not available yet.");
                setRelatedLoading(false);
                return;
            }

            setRelatedLoading(true);
            console.log(`Attempting to fetch related blogs for category: "${blog.category}", excluding ID: ${id}`);
            try {
                // *** CRUCIAL CHANGE HERE: encodeURIComponent ***
                const relatedApiUrl = `${backendUrl}/api/blogs?category=${encodeURIComponent(blog.category)}&exclude=${id}&limit=2`;
                console.log('Related blogs API URL:', relatedApiUrl); // Debug: Related API URL

                const response = await fetch(relatedApiUrl);
                console.log('Related blogs fetch response status:', response.status); // Debug: Related response status

                if (!response.ok) {
                    throw new Error(`Failed to fetch related blogs: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Related blogs data received from API:', data); // Debug: Actual data received

                setRelatedBlogs(data); // Set the received data
            } catch (error) {
                console.error('Error fetching related blogs:', error); // Debug: Related fetch error
                setRelatedBlogs([]); // Clear related blogs on error
            } finally {
                setRelatedLoading(false);
                console.log('Related loading finished. Related blogs state:', relatedBlogs); // Debug: Final state
            }
        };

        if (blog) { // Only attempt to fetch related blogs if the main blog data is loaded
            fetchRelatedBlogs();
        }
    }, [blog, id]); // Added relatedBlogs to dependencies to see final state change, though it might cause double log. Remove after debug.


    // Effect to fetch popular blogs once the main blog data is available
    useEffect(() => {
        const fetchPopularBlogs = async () => {
            // Debug: Check blog and category before fetch
            console.log('Checking blog for popular fetch:', blog);
            if (!blog || !blog.category) {
                console.log("Skipping popular blog fetch: main blog or its category is not available yet.");
                setPopularLoading(false);
                return;
            }

            setPopularLoading(true);
            console.log(`Attempting to fetch popular blogs for category: "${blog.category}", excluding ID: ${id}`);
            try {
                // *** CRUCIAL CHANGE HERE: encodeURIComponent ***
                const popularApiUrl = `${backendUrl}/api/blogs?category=${encodeURIComponent(blog.category)}&exclude=${id}&limit=2`;
                console.log('Popular blogs API URL:', popularApiUrl); // Debug: Popular API URL

                const response = await fetch(popularApiUrl);
                console.log('Popular blogs fetch response status:', response.status); // Debug: Popular response status

                if (!response.ok) {
                    throw new Error(`Failed to fetch popular blogs: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Popular blogs data received from API:', data); // Debug: Actual data received

                setPopularBlogs(data); // Set the received data
            } catch (error) {
                console.error('Error fetching popular blogs:', error); // Debug: Popular fetch error
                setPopularBlogs([]); // Clear popular blogs on error
            } finally {
                setPopularLoading(false);
                console.log('Popular loading finished. Popular blogs state:', popularBlogs); // Debug: Final state
            }
        };

        if (blog) { // Only attempt to fetch popular blogs if the main blog data is loaded
            fetchPopularBlogs();
        }
    }, [blog, id]);


    // Debug: Watch relatedBlogs state change (outside useEffect for simpler observation)
    // This will log every time relatedBlogs state updates.
    useEffect(() => {
        console.log('Current relatedBlogs state:', relatedBlogs);
        console.log('Current relatedLoading state:', relatedLoading);
    }, [relatedBlogs, relatedLoading]);


    if (loading) {
        return (
            <div className="main_content_wrapper">
                <InnerBanner dynamicTitle="Loading Blog..." />
                <section className="blog_single_section py-10 bg-cream-100">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper flex flex-wrap items-start justify-between">
                            <div className="content_wrapper left w-[65%]">
                                <div>Loading blog details...</div>
                            </div>
                            <div className="content_wrapper right w-[32%]">
                                <p>Loading related blogs...</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="main_content_wrapper">
                <InnerBanner dynamicTitle="Blog Not Found" />
                <section className="blog_single_section py-10 bg-cream-100">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper flex flex-wrap items-start justify-between">
                            <div className="content_wrapper left w-[65%]">
                                <div>Blog could not be found.</div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    return(
        <>
            <div className="main_content_wrapper">
                <InnerBanner dynamicTitle={blog.title} /> {/* Pass dynamic title */}
                <section className="blog_single_section py-10 bg-cream-100">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper flex flex-wrap items-start justify-between">
                            <div className="content_wrapper left w-[65%]">
                                <div className="single_blog_image">
                                    <img className="w-full" src={`${backendUrl}/uploads/${blog.blogImage}`} alt="Blog Details Image" />
                                </div>
                                <div className="blog_description">
                                    <div className="blog_desc_header">
                                        <h2 className="text-black text-[35px] font-semibold mb-3 blog_title leading-12 mt-7">{blog.title}</h2>
                                        {/* Ensure blog.date is available, assuming it comes from processed backend data */}
                                        <p className="blog_date text-[14px] tracking-widest text-brown-600">{blog.month} {blog.day}, {blog.year}</p>
                                    </div>
                                    <div className="blog_desc_content mt-5">
                                        <p className="text-gray text-[15px] mb-3 leading-6">{blog.description}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-6 text-xl">
                                        <span className="text-sm font-medium">Share With Us:</span>
                                        <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                                        <FaXTwitter className="cursor-pointer hover:text-black" />
                                        <FaInstagram className="cursor-pointer hover:text-pink-500" />
                                    </div>
                                </div>
                                <div className="comment_section border-t-1 border-gray-500 mt-8">
                                    <h2 className="text-black text-[35px] font-semibold mb-3 blog_title leading-12 mt-6">Leave A Comment</h2>
                                    <div className="comment_form_wrapper">
                                        <form id="comment_form" className="bg-cream-400">
                                            <div className="form_inner_wrapper flex flex-wrap p-5 items-start justify-between">
                                                <div className="form_group name w-[49%]">
                                                    <input id="name" name="name" type="text" className="form_control py-3 px-5 bg-white w-full" placeholder="Name" autoComplete="on" />
                                                </div>
                                                <div className="form_group email w-[49%]">
                                                    <input id="email" name="email" type="email" className="form_control py-3 px-5 bg-white w-full" placeholder="Email" autoComplete="on" />
                                                </div>
                                                <div className="form-group message w-full mt-5">
                                                    <textarea name="mesage" id="message" className="form_control h-50 bg-white w-full py-3 px-5" placeholder="Your Comment"></textarea>
                                                </div>
                                                <div className="submit_btn_wrapper w-full mt-4">
                                                    <button className="flex-1 bg-brown-600 text-white py-3 px-4 cursor-pointer w-full font-urbanist font-bold">
                                                        Post Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="content_wrapper right w-[32%]">
                                <div className="blog_search_box w-full p-4 bg-cream-400 relative">
                                    <input id="blog_search" name="blog_search" type="text" className="form_control pl-5 pr-8 py-3 bg-white w-full" placeholder="Search" autoComplete="on" />
                                    <div className="search_icon absolute top-8 right-6 cursor-pointer"><i className="fi fi-rr-search"></i></div>
                                </div>

                                {/* RELATED TOPICS SECTION */}
                                <div className="related_topics mb-8">
                                    <h2 className="text-black text-[25px] font-semibold mb-3 blog_title leading-12 mt-6 border-b-1 border-gray-300 pb-1">Related Topics</h2>
                                    <div className="related_topic_list">
                                        {relatedLoading ? (
                                            <p>Loading related blogs...</p>
                                        ) : relatedBlogs.length > 0 ? (
                                            relatedBlogs.map(rb => (
                                                <div
                                                    key={rb._id}
                                                    className="related_topic flex items-start justify-start mb-4 cursor-pointer"
                                                    onClick={() => navigate(`/blogs/${rb._id}`)}
                                                >
                                                    <div className="image_wrapper w-[108px] h-[108px] overflow-hidden mr-3">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={`${backendUrl}/uploads/${rb.blogImage}` || DefaultRelatedBlogImage}
                                                            alt={rb.title || "Related Blog Image"}
                                                        />
                                                    </div>
                                                    <div className="text_wrapper w-[74%]">
                                                        <h4 className="text-black text-[17px] font-semibold leading-5 mb-2">
                                                            {rb.title ? (rb.title.length > 30 ? rb.title.substring(0, 30) + '...' : rb.title) : 'Untitled Blog'}
                                                        </h4>
                                                        <p className="text-gray text-[14px] line-clamp-3">
                                                            {rb.description ? (rb.description.length > 80 ? rb.description.substring(0, 80) + '...' : rb.description) : 'No description available.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No related blogs found in the same category.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Popular Topics and Popular Tags (unchanged, still hardcoded) */}
                                <div className="popular_topics mb-8">
                                    <h2 className="text-black text-[25px] font-semibold mb-3 blog_title leading-12 mt-6 border-b-1 border-gray-300 pb-1">Popular Topics</h2>
                                    <div className="related_topic_list">
                                        {popularLoading ? (
                                            <p>Loading popular blogs...</p>
                                        ) : popularBlogs.length > 0 ? (
                                            popularBlogs.map(pb => (
                                                <div
                                                    key={pb._id}
                                                    className="related_topic flex items-start justify-start mb-4 cursor-pointer"
                                                    onClick={() => navigate(`/blogs/${pb._id}`)}
                                                >
                                                    <div className="image_wrapper w-[108px] h-[108px] overflow-hidden mr-3">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={`${backendUrl}/uploads/${pb.blogImage}` || DefaultRelatedBlogImage}
                                                            alt={pb.title || "Related Blog Image"}
                                                        />
                                                    </div>
                                                    <div className="text_wrapper w-[74%]">
                                                        <h4 className="text-black text-[17px] font-semibold leading-5 mb-2">
                                                            {pb.title ? (pb.title.length > 30 ? pb.title.substring(0, 30) + '...' : pb.title) : 'Untitled Blog'}
                                                        </h4>
                                                        <p className="text-gray text-[14px] line-clamp-3">
                                                            {pb.description ? (pb.description.length > 80 ? pb.description.substring(0, 80) + '...' : pb.description) : 'No description available.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No related blogs found in the same category.</p>
                                        )}
                                    </div>
                                </div>
                                <div className="populat_tags">
                                    <h2 className="text-black text-[25px] font-semibold mb-3 blog_title leading-12 mt-6 border-b-1 border-gray-300 pb-1">Popular Tags</h2>
                                    <div className="popular_tag_wrapper flex flex-wrap gap-3">
                                        {/* These are hardcoded. To make them dynamic, you'd need to fetch tags from your backend. */}
                                        <a href="#" className="tags text-black text-[14px] py-2 px-4 bg-cream-400 font-urbanist font-bold italic">#Cosmetics</a>
                                        <a href="#" className="tags text-black text-[14px] py-2 px-4 bg-cream-400 font-urbanist font-bold italic">#Foundation</a>
                                        <a href="#" className="tags text-black text-[14px] py-2 px-4 bg-cream-400 font-urbanist font-bold italic">#Hair Cosmetics</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default SingleBlog;