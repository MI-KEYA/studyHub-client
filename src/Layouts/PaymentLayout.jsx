import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Outlet } from 'react-router';

const PaymentLayout = () => {
    return (
        <div>
            <div>
                <Navbar />
                <Outlet />

            </div>
        </div>
    );
};

export default PaymentLayout;