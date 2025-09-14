import React from 'react';
import { Link, NavLink } from 'react-router';
import StudyHubLogo from '../StudyHubLogo/StudyHubLogo';


const Navbar = () => {
    const links = <>
        <li className='font-bold  text-blue-950 lg:text-white poppins'><NavLink to='/tutors'>Tutors</NavLink></li>
        <li className='font-bold text-blue-950 lg:text-white poppins'><NavLink to='/studysessions'>Study Sessions</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-transparent shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 text-white w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <StudyHubLogo />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-4 ">
                    <Link to='/login' className=' btn-primary'>Login</Link>
                    <Link to='/register' className='btn-primary hidden lg:block'>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;