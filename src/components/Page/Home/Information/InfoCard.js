import React from 'react';

const InfoCard = ({ bg, img, title, paragraph }) => {
    const mainBG = "card lg:card-side shadow-xl border-0 bg-accent" + bg;
    return (
        <div className={mainBG}>
            <figure><img src={img} alt="Album" className='p-3' /></figure>
            <div className="card-body text-white">
                <h2 className="card-title ">{title}</h2>
                <p>{paragraph}</p>
            </div>
        </div>
    );
};

export default InfoCard;