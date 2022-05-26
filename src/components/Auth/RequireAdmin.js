import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading/Loading';
import auth from '../../firebase.init'
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAdmin from '../hook/useAdmin';

const RequireAdmin = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);


    if (loading || adminLoading) {
        return <Loading />
    }

    if (!admin || !admin) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Forbidden Access!'
        })
        signOut(auth);
        localStorage.removeItem('accessToken');
    }
    return children;


};

export default RequireAdmin;