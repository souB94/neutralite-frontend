import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Menu () {
  const underlineRef = useRef(null);
  const location = useLocation();

  const updateUnderline = (target) => {
    if (underlineRef.current && target) {
      underlineRef.current.style.width = `${target.offsetWidth}px`;
      underlineRef.current.style.left = `${target.offsetLeft}px`;
    }
  };

  const resetUnderlineToActive = () => {
    const activeItem = document.querySelector('.navbar_menu ul li a.active');
    if (activeItem) {
      updateUnderline(activeItem);
    }
  };

  const handleHover = (event) => {
    updateUnderline(event.target);
  };

  useEffect(() => {
    const menuItems = document.querySelectorAll('.navbar_menu ul li a');
    const activeItem = document.querySelector('.navbar_menu ul li a.active');

    if (activeItem && underlineRef.current) {
      updateUnderline(activeItem);
    }

    menuItems.forEach(item => {
      item.addEventListener('mouseenter', handleHover);
      item.addEventListener('mouseleave', resetUnderlineToActive);
    });

    return () => {
      menuItems.forEach(item => {
        item.removeEventListener('mouseenter', handleHover);
        item.removeEventListener('mouseleave', resetUnderlineToActive);
      });
    };
  }, [location.pathname]); // Trigger on route change

  return (
    <div className="navbar_menu">
      <ul className="flex items-center gap-6 relative">
        <span className="menu_underline absolute h-[1.5px] bg-black bottom-0" ref={underlineRef}></span>

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-800 font-urbanist text-md font-medium ${isActive ? 'active' : ''}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-800 font-urbanist text-md font-medium ${isActive ? 'active' : ''}`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `text-gray-800 font-urbanist text-md font-medium ${isActive ? 'active' : ''}`
            }
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-gray-800 font-urbanist text-md font-medium ${isActive ? 'active' : ''}`
            }
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-gray-800 font-urbanist text-md font-medium ${isActive ? 'active' : ''}`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
