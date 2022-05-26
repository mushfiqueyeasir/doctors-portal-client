import React from 'react';
import chair from '../../../../assets/images/chair.png'

const Banner = () => {
    return (
        <div className="container mt-20">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6 order-2 order-lg-1 px-5">
                    <h1 className="text-6xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary  uppercase text-white font-bold bg-grad bg-gradient-to-r from-secondary to-primary">Get Started</button>
                </div>
                <div className=" col-12 col-lg-6 mb-5 mb-lg-0 order-1 order-lg-1 px-5">
                    <img src={chair} className="img-fluid" />
                </div>

            </div>
        </div>
    );
};

export default Banner;