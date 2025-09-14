import React from 'react';
import logo from '../../../assets/logo.png'

const StudyHubLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="logo" className='w-[120px] h-[60px]' />
            <p className='text-white font-bold -ml-9 lg:-ml-10 mb-3 poppins'>StudyHub</p>
        </div>
    );
};

export default StudyHubLogo;