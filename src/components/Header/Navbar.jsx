import Logo from '../../assets/logo/logo.png';
import Menu from './Menu';
import UserControl from './UserControl';

function Navbar() {
  return (
    <nav className='navbar py-3'>
        <div className="container max-w-[1320px] mx-auto px-4">
            <div className='navbar_content_wrapper flex item-center justify-between'>
                <div className="logo_wrapper max-w-[200px]">
                    <a href="/" className="brand block"><img src={Logo} alt="Neutralite Logo" /></a>
                </div>
                <div className='navbar_menu_wrapper flex items-center ml-auto mr-8'>
                    <Menu />
                </div>
                <div className='navbar_control_wrapper flex items-center'>
                    <UserControl  />
                </div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;