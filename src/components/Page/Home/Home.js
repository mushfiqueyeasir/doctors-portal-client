import React from 'react';
import Header from '../../Shared/Header/Header';
import Services from '../Services/Services';
import AppointmentsView from './AppointmentsView';
import Banner from './Banner/Banner';
import Infomration from './Information/Infomration';


const Home = () => {
    return (
        <div className=''>
            <div className='bg-homeBG'>

                <Banner></Banner>
                <Infomration />
            </div>
            <Services />
            <AppointmentsView />

        </div>
    );
};

export default Home;