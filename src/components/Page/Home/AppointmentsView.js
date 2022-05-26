import React from 'react';
import doctor from '../../../assets/images/doctor-small.png'

const AppointmentsView = () => {
    return (
        <section className=' bg-appointmentBG items-center my-20 px-lg-5 px-6 py-xl-0 py-6'>
            <div className="container  flex items-center">
                <div className='flex-1  d-lg-block d-none'>
                    <img src={doctor} className='ps-lg-5 mt-[-200px]' alt="" />
                </div>
                <div className='flex-1 pe-lg-5'>
                    <h1 className="text-xl font-bold text-neutral">Appointment</h1>
                    <h1 className="text-3xl font-bold text-white">Make and Appointment Today</h1>
                    <p className="py-6 font-normal text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <button className="btn btn-primary  uppercase text-white font-bold bg-grad bg-gradient-to-r from-secondary to-primary">Get Started</button>

                </div>

            </div>


        </section>
    );
};

export default AppointmentsView;