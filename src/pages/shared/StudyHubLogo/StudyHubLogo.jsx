import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const StudyHubLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end -ml-5'>
                <img src={logo} alt="logo" className='w-[120px] h-[60px]' />
                <p className='text-white font-bold -ml-9 lg:-ml-10 mb-3 poppins'>StudyHub</p>
            </div>
        </Link>
    );
};

export default StudyHubLogo;