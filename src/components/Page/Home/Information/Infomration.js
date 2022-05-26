import React from 'react';
import clock from '../../../../assets/icons/clock.svg';
import location from '../../../../assets/icons/marker.svg';
import phone from '../../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const Infomration = () => {
    return (
        <div className="container mt-20 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <InfoCard bg={"bg-grad bg-gradient-to-r from-secondary to-primary"} img={clock} title={"Opening Hour"} paragraph={"Loren imsum is simply dummy text of the pri"} />
            <InfoCard bg={""} img={location} title={"Visit our location"} paragraph={"Brooklyn, NY 10036, United States"} />
            <InfoCard bg={"bg-grad bg-gradient-to-r from-secondary to-primary"} img={phone} title={"Contact us now"} paragraph={"+000 123 456789"} />
        </div>

    );
};

export default Infomration;