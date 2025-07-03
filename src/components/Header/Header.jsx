import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import Navbar from './Navbar';
import './Header.css';

function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === '/';
  const isCheckoutPage = location.pathname === '/checkout';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll(); // Run on load

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `
    site_header 
    ${isHomePage ? 'fixed' : 'relative'} 
    ${isCheckoutPage ? 'no_top_bar' : ''} 
    ${isScrolled ? 'fixed_header' : ''}
  `.trim();

  return (
    <header id="site_header" className={headerClasses}>
      <HeaderTop />
      <Navbar />
    </header>
  );
}

export default Header;
