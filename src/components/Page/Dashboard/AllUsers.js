import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AllUsers = () => {

    const { data: users, isLoading, refetch } = useQuery(['users'], () => fetch(`${process.env.REACT_APP_serverLocation}/users`)
        .then(res => res.json())
    )
    if (isLoading) {
        return <Loading />
    }

    const makeAdmin = (event) => {

        fetch(`${process.env.REACT_APP_serverLocation}/users/admin/${event.target.id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin!')
                }


                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an admin`);
                }
            })
    }

    const handleDelete = (event) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your User has been deleted.',
                    'success'
                )
                fetch(`${process.env.REACT_APP_serverLocation}/admin/${event.target.id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            toast.success(`User Deleted!`);
                            refetch()
                        }
                    })
            }
        })
    }

    return (
        <div>
            <h2 className='text-2xl ms-3'>All Users</h2>

            <div className="overflow-x-auto mt-4  px-3">
                <table className="table w-full smallFont">
                    <thead>
                        <tr className='bg-gray-200 uppercase'>
                            <th className='xs'></th>
                            <th className='xs'>Name</th>
                            <th className='sx'>Email</th>
                            <th>Job</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user.email} className='hover'>
                                <th className='xs'>{index + 1}</th>
                                <td className='xs'>{user.name}</td>
                                <td >{user.email}</td>
                                {
                                    user.role !== 'admin' ?
                                        <><td><button onClick={makeAdmin} id={user.email} className="btn btn-sm bg-gray-800 text-white border-0 hover:bg-primary">Make Admin</button></td>
                                            <td><button onClick={handleDelete} id={user._id} className="btn btn-sm bg-gray-800 text-white border-0 hover:bg-primary">Remove User</button></td>
                                        </>
                                        :
                                        <td>
                                        </td>
                                }



                            </tr>

                            )
                        }

                    </tbody>
                    {users.length > 0 ?
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

export default AllUsers;