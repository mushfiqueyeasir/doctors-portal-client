import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm, useFormState } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { updateProfile } from 'firebase/auth';
import Loading from '../../Shared/Loading/Loading';


const Register = () => {


    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const { register, formState: { errors }, handleSubmit } = useForm();


    let signinError;

    if (loading) {
        return <Loading />
    }

    if (error) {
        if (error?.message === 'Firebase: Error (auth/email-already-in-use).')
            signinError = <p className='lable-text-alt text-red-500 text-center'>email alredy exist</p>
    }

    const onSubmit = data => {

        createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: data.name

                })
                if (!error) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Verification Email Sent'
                    })

                }
            })

    };


    return (
        <div className='flex justify-center items-center h-[90vh] border-0'>
            <div className="card w-96 bg-base-100 shadow-xl border-0">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className=" w-full max-w-xs mt-3">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", {
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

                        <div className=" w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", {
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


                        <div className=" w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'minimum 6 characters'
                                }
                            })} className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className='lable-text-alt text-red-500'>{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className='lable-text-alt text-red-500'>{errors.password.message}</span>}
                            </label>
                        </div>

                        {signinError}
                        <input type="submit" className='btn btn-accent text-white w-full mx-w-xs uppercase' value="Sign up" />


                        <label className="text-center">
                            <span className="label-text text-center">Already Have Account?</span>
                            <Link to='/login' className="label-text text-neutral hover:font-bold hover:text-neutral"> Go to Login</Link>
                        </label>

                    </form>

                </div>
            </div>

        </div>
    );
};

export default Register;