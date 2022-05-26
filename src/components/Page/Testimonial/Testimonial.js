import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import TestimonialCard from './TestimonialCard';


const Testimonial = () => {
    const reviews = [
        {
            _id: 1,
            name: 'Winson Hearry',
            location: 'California',
            quote: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people1
        },
        {
            _id: 2,
            name: 'Winson Hearry',
            location: 'California',
            quote: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people2
        },
        {
            _id: 3,
            name: 'Winson Hearry',
            location: 'California',
            quote: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people3
        }
    ]
    return (
        <div className='container mb-20 '>
            <div className='flex justify-between'>
                <div >
                    <h2 className='text-2xl text-neutral font-bold'>Testimonial</h2>
                    <h1 className='text-4xl'>What Our Patients Says</h1>
                </div>
                <div>
                    <img src={quote} className='w-24   lg:w-48' alt="" />
                </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>

                {

                    reviews.map(review => <TestimonialCard key={review._id} review={review} />)
                }
            </div>


        </div>
    );
};

export default Testimonial;