import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import Banner from '../Banner/Banner';
import OurMission from '../OurMission/OurMission';
import Countdown from '../Achievement/Countdown';

const Home = () => {
    return (
        <div>
            <Banner />
            <OurMission />
            <Countdown />
        </div>
    );
};

export default Home;