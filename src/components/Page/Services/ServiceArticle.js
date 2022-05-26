import React from 'react';
import treatment from '../../../assets/images/treatment.png'

const ServiceArticle = () => {
    return (
        <div className="hero min-h-screen text-start">
            <div className="hero-content flex-col lg:flex-row  px-0 px-lg-5">
                <img src={treatment} className="max-w-sm rounded-lg shadow-2xl" />
                <div className='px-0 px-lg-5'>
                    <h1 className="text-5xl font-bold text-accent">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6 font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
                    <button className="btn btn-primary  uppercase text-white font-bold bg-grad bg-gradient-to-r from-secondary to-primary">Get Started</button>
                </div>

            </div>
        </div>
    );
};

export default ServiceArticle;