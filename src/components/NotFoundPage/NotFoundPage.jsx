import React from 'react';
import InnerBanner from '../InnerBanner/InnerBanner'; // Assuming you want a banner
import Footer from '../Footer/Footer'; // Assuming you want a footer

function NotFoundPage() {
  return (
    <>
      <div className="main_content_wrapper">
        <InnerBanner title="404 - Page Not Found" /> {/* Customize banner title */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="bg-brown-600 text-white py-3 px-6  hover:bg-brown-600 transition duration-300">
              Go to Homepage
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;