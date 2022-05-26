import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L20hcIOViA0uwrQXgdGPpkThTwK5uDjndGSPhEUTN0YKT67S6FcwLebC35qcDJSIadeL5FzwJ9W8uWSHOWXM46T00s98exUpJ');



const Payment = () => {
    const { id } = useParams();
    const url = `${process.env.REACT_APP_serverLocation}/booking/${id}`;
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex flex-col justify-center  items-center gap-4 h-[90vh]  px-3'>

            <div className="card md:w-[50vw] lg:w-[30vw]  w-[90vw] bg-base-100 shadow-xl border-0">
                <div className="card-body">
                    <p className="text-success">Hello, {appointment.patientName}</p>
                    <h2 className="card-title">Pay For {appointment.treatment}</h2>
                    <p>Your  Appointment: <span className='text-orange-500'>{appointment.date}</span> at {appointment.slot}</p>
                    <p>Please Pay: <span>${appointment.price}</span></p>

                </div>
            </div>

            <div className="card md:w-[50vw] lg:w-[30vw] w-[90vw]  bg-base-100 shadow-xl border-0">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>


                </div>
            </div>


        </div>



    );
};

export default Payment;