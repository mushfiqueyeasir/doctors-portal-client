import React from 'react';

const Contact = () => {
    <style>

    </style>
    return (
        <section className=' bg-appointmentBG items-center py-10'>
            <div className="container ">
                <div className='text-center'>
                    <h1 className="text-xl font-bold text-neutral">Contact Us</h1>
                    <h1 className="text-3xl font-bold text-white">Stay connected with us</h1>
                </div>
                <form className='flex flex-col gap-3 items-center mt-5'>
                    <input type="email" placeholder="Email Address" className="input input-bordered  w-full max-w-xs" />
                    <input type="text" placeholder="Subject" className="input input-bordered  w-full max-w-xs " />

                    <input type="text" placeholder="Your  Message" className="input input-bordered  w-full max-w-xs h-24 text-top" />.

                    <button className="btn btn-primary  uppercase text-white font-bold bg-grad bg-gradient-to-r from-secondary to-primary px-4 border-0">Submit</button>

                </form>

            </div>


        </section>
    );
};

export default Contact;