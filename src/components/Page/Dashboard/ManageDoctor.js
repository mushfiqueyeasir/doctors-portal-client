import { toast } from 'react-toastify';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading'
import Swal from 'sweetalert2';

const ManageDoctor = () => {
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch(`${process.env.REACT_APP_serverLocation}/doctor`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }
    const handleDelete = (event) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your Doctor has been deleted.',
                    'success'
                )
                fetch(`${process.env.REACT_APP_serverLocation}/doctor/${event.target.id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast.success(`Doctor Deleted!`);
                            refetch()
                        }
                    })
            }
        })
    }


    return (
        <div className=''>

            <h2 className='text-2xl ms-3'>All Doctor</h2>

            <div className="overflow-x-auto mt-4  px-3">
                <table className="table w-full smallFont">
                    <thead>
                        <tr className='bg-gray-200 uppercase'>
                            <th className='xs'></th>
                            <th className='sx'>Avatar</th>
                            <th className=''>Name</th>
                            <th className='xs'>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <tr key={doctor._id} className='hover'>
                                <th className='xs'>{index + 1}</th>
                                <td className='sx'>
                                    <div className="avatar">
                                        <div className="w-20 rounded">
                                            <img src={doctor.img} alt={doctor.name} />
                                        </div>
                                    </div>
                                </td>
                                <td className=''>{doctor.name}</td>
                                <td className='xs'>{doctor.specialty}</td>


                                <td>

                                    <button onClick={handleDelete} id={doctor.email} className="btn  btn-xs btn-error">Delete</button>
                                </td>
                            </tr>

                            )
                        }

                    </tbody>
                    {doctors.length > 0 ?
                        <thead>
                            <tr className='bg-gray-200 mt-10'>
                                <th className=' h-8'></th>
                                <th className=''></th>
                                <th className='xs'></th>
                                <th className='xs'></th>
                                <th className=''></th>
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

export default ManageDoctor;