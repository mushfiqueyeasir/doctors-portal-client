import React, { useState } from 'react';
import Footer from '../../Shared/Footer';

import Header from '../../Shared/Header/Header';
import AppointmentBanner from './AppointmentBanner/AppointmentBanner';
import AvailableAppointments from './AvailableAppointments';

const Appointment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <div className='bg-homeBG'>

                <AppointmentBanner date={date} setDate={setDate} />
            </div>
            <AvailableAppointments date={date} />
            <Footer />

        </div>
    );
};

export default Appointment;