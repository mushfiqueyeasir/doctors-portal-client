import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../../../firebase.init';
import avater from '../../../assets/images/avater.webp';
import { signOut } from 'firebase/auth';

const Header = () => {
    const user = useAuthState(auth);
    const handleSignout = () => {
        localStorage.removeItem('accessToken');
        signOut(auth);
    }

    const menuItems = <>
        <li><NavLink to='/home'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/appointment'>Appointment</NavLink></li>
        <li><NavLink to='/reviews'>Reviews</NavLink></li>
        <li><NavLink to='/contact'>Contact Us</NavLink></li>

        {
            user[0] ?
                <>
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                    <li><button onClick={handleSignout} >Sign out</button></li>
                    <img src={user[0].photoURL ? user[0].photoURL : avater} className='rounded-circle w-[45px] h-[45px]' alt="" />

                </>
                :
                <>
                    <li><NavLink to='/login'>Login</NavLink></li>
                </>

        }
    </>
    return (
        <div className='bg-white sticky top-0 '>
            <div className="navbar container lg:container-fluid ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

                            {menuItems}

                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Doctors Portal</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 items-center ">
                        {menuItems}
                    </ul>
                </div>
                {
                    <div className="navbar-end">
                        <label htmlFor="dashboardsidebar" className="btn bg-white border-0  drawer-button lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                }


            </div>
        </div>

    );
};

export default Header;