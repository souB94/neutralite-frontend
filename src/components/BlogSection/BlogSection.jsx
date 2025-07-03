import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BlogSection.css'

function BlogSection(){

    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    

    useEffect(() => {
            fetch(`${backendUrl}/api/blogs`)
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP error! status: ${res.status}, Response: ${text}`);
                }
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                console.log("Fetched Blogs:", data);
            })
            .catch(err => console.error('Fetch error:', err));
        },[]);

    const visibleBlogs = isHomePage ? blogs.slice(0, 3) : blogs;



    return(
        <section className="blog_section py-10 bg-cream-100">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapper">
                    <div className="section_header text-center">
                        <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">TOP BLOGS</h5>
                        <h2 className="text-[45px] font-urbanist font-bold text-black leading-14 tracking-normal">Stay On For Updates</h2>
                    </div>
                    <div className="blog_row mt-5 flex flex-wrap items-start justify-center ">
                        {visibleBlogs.map((blog) => (
                            <div key={blog._id} className="blog_item w-full md:w-[50%] lg:w-[33%] xl:w-[33%] px-3 mb-6">
                                <div className='inner_content_wrapper'>
                                    <div className='blog_image_wrapper relative mb-5'>
                                        <img className='w-full' src={`${backendUrl}/uploads/${blog.blogImage}`} alt="Blog Image" />
                                        <div className='blog_date absolute top-5 right-5 text-center flex flex-col items-center justify-center w-[50px] h-[50px] bg-white'>
                                            <span className='day block text-lg font-medium leading-4 mb-2'>{blog.day}</span>
                                            <span className='month text-xs leading-3'>{blog.month}</span>
                                        </div>
                                    </div>
                                    <div className='blog_text_wrapper'>
                                        <h4 className='text-black text-[22px] leading-7 font-semibold mb-3'>{blog.title}</h4>
                                        <p className='text-gray text-[15px] font-roboto mb-3'>{blog.description}</p>
                                        <a href={`/blogs/${blog._id}`} className='blog_link font-urbanist font-semibold uppercase tracking-widest text-black relative'>{blog.link}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogSection;