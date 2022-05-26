import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

import auth from '../../../firebase.init';
import './style.css'


const MyAppointment = () => {
    const [user, loading] = useAuthState(auth)
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
        if (user) {
            fetch(`${process.env.REACT_APP_serverLocation}/booking?patient=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                    }
                    return res.json()
                })
                .then(data => setAppointments(data));
        }
    }, [user])




    return (

        <div className='container mx-auto mt-5'>

            <h2 className='text-2xl ms-3'>My Appointment</h2>

            <div className="overflow-x-auto mt-4">
                <table className="table w-full smallFont">
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='xs'></th>
                            <th className='xs'>Name</th>
                            <th className='sx'>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) => <tr key={index} className='hover'>
                                <th className='xs'>{index + 1}</th>
                                <td className='xs'>{a.patientName}</td>
                                <td >{a.date}</td>
                                <td>{a.slot}</td>
                                <td>{a.treatment}</td>
                                <td>
                                    {(a.price && !a.paid) && <Link to={`/dashboard/payment/${a._id}`}><button className='btn btn-xs btn-warning'>Pay</button></Link>}
                                    {(a.price && a.paid) && <div>
                                        <p> <span className='text-success'>Paid</span></p>
                                        <p>Transaction Id: <span className='text-success'>{a.transactionId}</span></p>
                                    </div>}
                                </td>
                            </tr>

                            )
                        }

                    </tbody>
                    {appointments.length > 0 ?
                        <thead>
                            <tr className='bg-gray-200 mt-10'>
                                <th className=' h-8'></th>
                                <th className=''></th>
                                <th className='xs'></th>
                                <th className='xs'></th>
                                <th className=''></th>
                                <th></th>
                            </tr>
                        </thead>
                        :
                        <></>

                    }

                </table>
            </div>
        </div>
    );
};

export default MyAppointment;