// src/screens/DashboardScreen.js
import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext'; // To display user info
import { NavLink, Outlet } from 'react-router-dom';
import "./Dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext); // Access user from contextmap

  return (
    <section className='dashboard py-10'>
      <div className='container max-w-[1320px] mx-auto px-4'>
        <div className='dashboard_content_wrapper'>
          <div className='dashboard_content_left w-[30%]'>
            <aside>
              <h1 className='text-xl font-bold px-5 py-3 bg-cream-200 text-brown-600 border-1 border-amber-200 mb-3'>User Dashboard</h1>
              <div className='dashboard_user_info p-5 bg-cream-100 border-1 border-amber-200'>
                  {user ? (
                    <>
                      <p className='flex align-center justify-start mb-2'><span className='icon_wrapper mr-2 text-brown-600 flex items-center'><i className="fi fi-ss-user flex align-center"></i></span><span className='text_wrapper text-md'>{user.name}</span></p>
                      <p className='flex align-center justify-start mb-2'><span className='icon_wrapper mr-2 text-brown-600 flex items-center'><i className="fi fi-sc-envelope flex align-center"></i></span><span className='text_wrapper text-md'>{user.email}</span></p>
                      <p className='flex align-center justify-start'><span className='icon_wrapper mr-2 text-brown-600 flex items-center'><i className="fi fi-ss-admin-alt flex align-center"></i></span><span className='text_wrapper text-md'>{user.isAdmin ? 'Yes' : 'No'}</span> </p>
                      {/* You can display more user-specific info here */}
                    </>
                  ) : (
                    <p>Please log in to view your dashboard.</p>
                  )}
              </div>
              <h2 className='text-xl font-bold px-5 py-3 bg-cream-200 text-brown-600 border-1 border-amber-200 mb-3 mt-3'>Dashboard Menu</h2> 
              <div className='dashboard_menu_info bg-cream-100 border-1 border-amber-200'>
                  {user ? (
                    
                      <nav className='menu_wrapper'>
                          <NavLink className={({isActive}) => isActive ? "menu_link flex items-center py-3 px-5 active_menu" : "menu_link flex items-center py-3 px-5"} to="/dashboard">
                            <span className='icon_wrapper text-brown-600 text-xl mr-2'><i className="fi fi-rr-dashboard-panel flex"></i></span>
                            <span className='text_wrapper text-gray-950'>Dashboard</span>
                          </NavLink>
                          <NavLink className={({isActive}) => isActive ? "menu_link flex items-center py-3 px-5 active_menu" : "menu_link flex items-center py-3 px-5"} to="/dashboard/orders">
                            <span className='icon_wrapper text-brown-600 text-xl mr-2'><i className="fi fi-rr-apps-sort flex"></i></span>
                            <span className='text_wrapper text-gray-950'>Orders</span>
                          </NavLink>
                          <NavLink className={({isActive}) => isActive ? "menu_link flex items-center py-3 px-5 active_menu" : "menu_link flex items-center py-3 px-5"} to="/dashboard/profile">
                            <span className='icon_wrapper text-brown-600 text-xl mr-2'><i className="fi fi-rr-clipboard-user flex"></i></span>
                            <span className='text_wrapper text-gray-950'>Profile</span>
                          </NavLink>
                          <NavLink className="menu_link flex items-center py-3 px-5" to="/">
                            <span className='icon_wrapper text-brown-600 text-xl mr-2'><i className="fi fi-rc-exit flex"></i></span>
                            <span className='text_wrapper text-gray-950'>Logout</span>
                          </NavLink>
                      </nav>
                  ) : (
                    <p>Please log in to view your dashboard.</p>
                  )}
              </div>
            </aside>
          </div>
          <div className='dashboard_content_right w-[70%]'>
             <div className='dashboard_main_content_wrapprer bg-cream-100 border-1 border-amber-200 p-8'>
                <Outlet />  
             </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default Dashboard;