import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading/Loading';
import auth from '../../firebase.init'
import { Navigate, useLocation } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';
import Swal from 'sweetalert2';

const RequireAuth = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();
    const [token, setToken] = useState('');

    if (loading) {
        return <Loading />
    }
    if (!user?.emailVerified && user?.providerData[0]?.providerId === 'password') {
        return <div className='container mx-auto flex  justify-center items-center h-[80vh]'>
            <div className="card  bg-base-100 shadow-xl justify-center ">
                <div className="card-body">
                    <h2 className="card-title">Your Email is  not  Verified!!</h2>
                    <p>Please Verify you Email address</p>
                    <div className="card-actions justify-center items-center mt-5 flex-col ">
                        <span>didn't get verification email?</span>

                        <button onClick={async () => {
                            await sendEmailVerification();
                            Swal.fire({
                                icon: 'info',
                                title: 'Verification Email Sent'
                            })
                        }} className='btn btn-sm ms-3'>Send Verification again</button>
                    </div>
                </div>
            </div>
        </div>

    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    } else {
        const email = user.email;
        const currnentUser = { name: user.displayName, email: email };


        fetch(`${process.env.REACT_APP_serverLocation}/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currnentUser)
        })
            .then(res => res.json())
            .then(data => {
                const token = data.token;
                localStorage.setItem('accessToken', token);
                setToken(token);
            })

        if (token) {
            return children;
        }

    }


};

export default RequireAuth;