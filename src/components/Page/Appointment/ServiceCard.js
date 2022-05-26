import React from 'react';

const ServiceCard = ({ service, setTreatment }) => {
    const { name, slots, price } = service;


    return (
        <div className="card w-96 bg-base-100 shadow-xl border-0  ">

            <div className="card-body  text-center">
                <h2 className="text-xl font-bold text-neutral">{name}</h2>

                <p>{slots.length > 0
                    ?
                    <>
                        <span>{slots[0]}</span> <br />
                        <span className='uppercase'>{slots.length} spaces available</span>
                    </>
                    : <span className='text-red-500'>No Slot Abailable</span>}
                </p>
                <p>Price: ${price}</p>
                <div className="card-actions justify-center ">
                    <label htmlFor="booking-modal" onClick={() => setTreatment(service)} disabled={slots.length === 0} className={slots.length === 0 ? 'btn btn-accent border-0 text-white' : 'btn bg-grad bg-gradient-to-r from-secondary to-primary text-white shadow-md border-0'}>Book Appointment</label>


                </div>

            </div>


        </div>
    );
};

export default ServiceCard;