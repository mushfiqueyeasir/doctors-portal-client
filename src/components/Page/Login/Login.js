import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';


const Login = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();



    let signinError;

    if (loading || gloading) {
        return <Loading />
    }

    if (error || gerror) {
        if (error?.message === 'Firebase: Error (auth/user-not-found).')
            signinError = <p className='lable-text-alt text-red-500 text-center'>User not found</p>
    }


    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    return (
        <div className='flex justify-center items-center h-[90vh] border-0'>
            <div className="card w-96 bg-base-100 shadow-xl border-0">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Login</h2>


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className=" w-full max-w-xs mt-3">
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
                            <label className="label">
                                <span className="label-text">Forgot Password?</span>
                            </label>
                        </div>

                        {signinError}
                        <input type="submit" className='btn btn-accent text-white w-full mx-w-xs uppercase' value="Login" />


                        <label className="text-center">
                            <span className="label-text">New to Doctors Portal?</span>
                            <Link to='/register' className="label-text text-neutral hover:font-bold hover:text-neutral"> Create new account</Link>

                        </label>

                    </form>




                    <div className="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} className="btn btn-outline uppercase">Continue with google</button>

                </div>
            </div>

        </div>
    );
};

export default Login;