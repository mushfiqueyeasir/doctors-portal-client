import React from 'react';
import ServiceCard from '../Services/ServiceCard';
import fluride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import teeth from '../../../assets/images/whitening.png';
import ServiceArticle from './ServiceArticle';

const Services = () => {
    return (
        <div className='container my-20 text-center font-bold'>
            <h2 className='uppercase text-center text-2xl text-neutral'>Our Services</h2>
            <h1 className='text-4xl'>Service We Provide</h1>

            <div className='grid justify-items-center grid-cols-1 lg:grid-cols-3 mt-20 '>
                <ServiceCard img={fluride} title={"Fluoride Treatment"} paragraph={"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"} />
                <ServiceCard img={cavity} title={"Cavity Filling"} paragraph={"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"} />
                <ServiceCard img={teeth} title={"Teeth Whitening"} paragraph={"Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the"} />
            </div>

            <ServiceArticle />

        </div>
    );
};

export default Services;