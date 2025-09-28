import React from 'react';
import Banner from '../Banner/Banner';
import OurMission from '../OurMission/OurMission';
import Countdown from '../Achievement/Countdown';
import AvailableSessions from '../AvailableSessions/AvailableSessions';

const Home = () => {
    return (
        <div>
            <Banner />
            <AvailableSessions />
            <OurMission />
            <Countdown />
        </div>
    );
};

export default Home;