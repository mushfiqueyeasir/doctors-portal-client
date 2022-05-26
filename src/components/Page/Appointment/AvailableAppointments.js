import { format } from 'date-fns';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import ServiceCard from './ServiceCard';
import Loading from '../../Shared/Loading/Loading';

const AvailableAppointments = ({ date }) => {
    const formatedDate = format(date, 'PP');
    const [treatment, setTreatment] = useState(null);
    const { data: services, isLoading, refetch } = useQuery(['available', formatedDate], () => fetch(`${process.env.REACT_APP_serverLocation}/available?date=${formatedDate}`)
        .then(res => res.json())
    )

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='container py-5'>
            <h1 className='text-2xl  text-neutral text-center '>Available Services on {format(date, 'PP')} </h1>


            <div className='grid md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-4 mt-20'>
                {
                    services?.map(service => <ServiceCard key={service._id} service={service} setTreatment={setTreatment} />)
                }
                {treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} date={date} refetch={refetch} />}

            </div>

        </div>
    );
};

export default AvailableAppointments;