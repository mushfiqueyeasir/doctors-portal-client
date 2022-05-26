import React from 'react';
import './Error.css';

import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='container mx-auto flex flex-col justify-center items-center h-[80vh]'>
            <h1 className='text-center error mb-4'>404</h1>
            <img src="" alt="" className='' />
            <Link to='/' className='doItButton py-2 px-5  mt-5'>Go Home</Link>

        </div>
    );
};

export default Error;