import { toast } from 'react-toastify';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { data: services, isLoading, } = useQuery('services', () => fetch(`${process.env.REACT_APP_serverLocation}/service`).then(res => res.json()))

    const imageStoraeKey = `6ccef2ad6c2e7383ec6802b48a311821`


    const onSubmit = async data => {

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStoraeKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: result.data.url
                    }
                    //sending database

                    fetch(`${process.env.REACT_APP_serverLocation}/doctor`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success(`Doctor added successfully`);
                                reset();
                            } else {
                                toast.error('Failed to add the doctor')
                            }
                        })
                }
            })


    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex justify-center items-center h-[90vh] border-0'>
            <div className="card w-96 bg-base-100 shadow-xl border-0">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Add Doctor</h2>


                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Name Field */}
                        <div className=" w-full max-w-xs mt-3">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type='text' {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is Required'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'minimum 6 characters'
                                }
                            })} className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className='lable-text-alt text-red-500'>{errors.name.message}</span>}
                                {errors.name?.type === 'minLength' && <span className='lable-text-alt text-red-500'>{errors.name.message}</span>}
                            </label>
                        </div>


                        {/* Email Field */}
                        <div className=" w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type='email' {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                    message: 'Provide valid Email'
                                }
                            })} className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className='lable-text-alt text-red-500'>{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className='lable-text-alt text-red-500'>{errors.email.message}</span>}
                            </label>
                        </div>


                        {/* Service  Field */}
                        <div className=" w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Specialty</span>
                            </label>
                            <select {...register('specialty')} className="select w-full max-w-xs input input-bordered w-full max-w-xs">

                                {
                                    services.map(service => <option key={service._id} value={service.name}>{service.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Photo Field */}

                        <div className=" w-full max-w-xs mt-3">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type='file' {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Image is Required'
                                },

                            })} className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className='lable-text-alt text-red-500'>{errors.image.message}</span>}

                            </label>
                        </div>


                        <input type="submit" className='btn btn-accent text-white w-full mx-w-xs uppercase mt-3' value="ADD" />


                    </form>

                </div>
            </div>

        </div>
    );
};

export default AddDoctor;