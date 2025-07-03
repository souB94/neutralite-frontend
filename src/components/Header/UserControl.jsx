import Minicart from './Minicart';
import SearchForm from './SearchForm';
import UserAccountControl from './UserAccount';
import { useState } from 'react';

function UserControl({ user, onLogout }) {

  const [quantity, setQuantity] = useState(0);
  

  return (
    <div className='navbar_control flex items-center gap-6'>
        <div className='text-[18px] search_box text-gray-600 hover:text-gray-800 transition-colors duration-300 h-[18px] relative'>
            <SearchForm />
        </div>
        
        <div className='text-[18px] minicart_icon text-gray-600 hover:text-gray-800 transition-colors duration-300 h-[18px] relative'>
            <Minicart />
        </div>
        <div className='text-[18px] text-gray-600 hover:text-gray-800 transition-colors relative duration-300 h-[18px]'>
            <UserAccountControl />
        </div>
    </div>
  );
}

export default UserControl;