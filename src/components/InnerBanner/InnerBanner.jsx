import { useLocation } from 'react-router-dom';
import './InnerBanner.css'

// InnerBanner should be a presentational component, receiving dynamic data via props.
// It should not perform data fetching itself.
function InnerBanner({ dynamicTitle }) { // dynamicTitle is good for specific dynamic content

    const location = useLocation();

    // Define base route map with consistent capitalization for breadcrumbs
    const routeMap = {
        '/about': { title: 'About Us', breadcrumb: 'About' },
        '/shop': { title: 'Shop', breadcrumb: 'Shop' },
        // '/product-details' is a base, actual product name will come via dynamicTitle
        // We'll handle dynamic paths like /product-details/:id or /blogs/:id separately
        '/blog': { title: 'Blog', breadcrumb: 'Blog' },
        '/cart': { title: 'Your Shopping Cart', breadcrumb: 'Cart' },
        '/wishlist': { title: 'Wishlist', breadcrumb: 'Wishlist' },
        '/contact': { title: 'Contact', breadcrumb: 'Contact' },
        '/faq': { title: 'FAQ', breadcrumb: 'FAQ' },
        '/signup': { title: 'Create Account', breadcrumb: 'Create Account' },
        '/signin': { title: 'Login', breadcrumb: 'Login' },
        '/reset-password': { title: 'Reset Password', breadcrumb: 'Reset Password' },
        // We no longer need '/blogs/:id' in routeMap because we'll check with startsWith
        // Same for product-details, as we handle it with startsWith
    };

    let pageData = { title: 'Page Not Found', breadcrumb: '404' }; // Default to 404

    // Try to find a direct match first
    if (routeMap[location.pathname]) {
        pageData = routeMap[location.pathname];
    }

    // Handle dynamic paths like /product-details/:id
    if (location.pathname.startsWith('/product-details/')) { // Note the trailing slash
        if (dynamicTitle) {
            pageData = { title: dynamicTitle, breadcrumb: dynamicTitle };
        } else {
            pageData = { title: 'Product Details', breadcrumb: 'Product Details' };
        }
    }
    // Handle dynamic paths like /blogs/:id
    else if (location.pathname.startsWith('/blogs/')) { // Note the trailing slash
        if (dynamicTitle) {
            // If dynamicTitle is passed (e.g., the actual blog title)
            pageData = { title: dynamicTitle, breadcrumb: dynamicTitle };
        } else {
            // Fallback if dynamicTitle is not yet available (e.g., during loading of SingleBlog)
            pageData = { title: 'Blog Details', breadcrumb: 'Blog Details' };
        }
    }
    // Handle dynamic paths like /blogs/:id
    else if (location.pathname.startsWith('/reset-password/')) { // Note the trailing slash
        if (dynamicTitle) {
            // If dynamicTitle is passed (e.g., the actual blog title)
            pageData = { title: dynamicTitle, breadcrumb: dynamicTitle };
        } else {
            // Fallback if dynamicTitle is not yet available (e.g., during loading of SingleBlog)
            pageData = { title: 'Reset Password', breadcrumb: 'Reset Password' };
        }
    }
    // Handle the generic /404 path if explicitly navigated to it
    else if (location.pathname === '/404') {
         pageData = { title: 'Page Not Found', breadcrumb: '404' };
    }


    return (
        <section className="inner_banner flex items-center">
            <div className='container max-w-[1320px] mx-auto px-4'>
                <div className='section_content_wrapper flex flex-col items-center justify-center'>
                    <h1 className='inner_banner_title text-[45px] font-bold text-white mb-3'>{pageData.title}</h1>
                    <div className='breadcrumb'>
                        <ul className='breadcrumb_menu flex items-center text-white gap-3'>
                            <li><a href="/" className='home'>Home</a></li>
                            <li className='leading-2'><span className='icon_wrapper'><i className="fi fi-ss-angle-small-right"></i></span></li>
                            {/* Render breadcrumb based on current path logic */}
                            {location.pathname.startsWith('/product-details/') && dynamicTitle ? (
                                <>
                                    <li><a href="/shop" className='shop'>Shop</a></li> {/* Add Shop link before product name */}
                                    <li className='leading-2'><span className='icon_wrapper'><i className="fi fi-ss-angle-small-right"></i></span></li>
                                    <li><span className='current'>{pageData.breadcrumb}</span></li>
                                </>
                            ) : location.pathname.startsWith('/blogs/') && dynamicTitle ? (
                                <>
                                    <li><a href="/blog" className='blog'>Blog</a></li> {/* Link to the main blog list page */}
                                    <li className='leading-2'><span className='icon_wrapper'><i className="fi fi-ss-angle-small-right"></i></span></li>
                                    <li><span className='current'>{pageData.breadcrumb}</span></li>
                                </>
                            ) : (
                                <li><a href={location.pathname} className='current'>{pageData.breadcrumb}</a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InnerBanner;