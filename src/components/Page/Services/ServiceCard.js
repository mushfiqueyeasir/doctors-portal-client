import React from 'react';

const ServiceCard = ({ img, title, paragraph }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl mt-3 mt-lg-0 border-0">
            <figure className="px-10 pt-10">
                < img src={img} alt="Shoes" className="rounded-xl" />
            </figure >
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p className='font-normal'>{paragraph}</p>
            </div>
        </div >
    );
};

export default ServiceCard;