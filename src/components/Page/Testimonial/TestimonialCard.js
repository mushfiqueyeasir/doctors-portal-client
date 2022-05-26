import React from 'react';

const TestimonialCard = ({ review }) => {
    return (
        <div className="card  lg:w-lg border-0 shadow-xl">
            <div className="card-body ">
                <p>{review.quote}</p>


                <div className="card-actions mt-3 flex items-center">
                    <div className='rounded-full ring ring-secondary ring-offset-base-100 mr-5'>
                        <img src={review.img} alt="" />
                    </div>
                    <div>
                        <h1 className='font-bold'>{review.name}</h1>
                        <h2>{review.location}</h2>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;