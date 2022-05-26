import React from 'react';
import chair from '../../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const AppointmentBanner = ({ date, setDate }) => {

    const today = new Date();

    return (

        <div className="container py-28 ">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6 order-2 order-lg-1 px-5 flex items-center justify-center lg:justify-end">

                    <div className='shadow-sm'>
                        <DayPicker
                            mode="single"
                            required
                            selected={date}
                            onSelect={setDate}
                            disabled={{ before: today }}
                        />

                    </div>

                </div>
                <div className=" col-12 col-lg-5 mb-5 mb-lg-0 order-1 order-lg-1 px-5">
                    <img src={chair} className="image-full" />
                </div>
            </div>

        </div>
    );
};

export default AppointmentBanner;