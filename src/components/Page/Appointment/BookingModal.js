import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import auth from '../../../firebase.init';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
    const { _id, name, slots, price } = treatment;
    const [user, loading, error] = useAuthState(auth);
    const formatedDate = format(date, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formatedDate,
            slot,
            price,
            patient: user.email,
            patientName: user.displayName,
            patientPhone: event.target.phone.value
        }
        console.log(booking)
        fetch(`${process.env.REACT_APP_serverLocation}/booking`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Your appointment is set  ,${formatedDate} at ${slot}`,
                        showConfirmButton: false,
                        timer: 5000
                    })
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `You already have an appointment ,${data.booking?.date} at ${data.booking?.slot}`,
                        showConfirmButton: false,
                        timer: 5000
                    })
                }
                refetch();
                setTreatment(null)

            })
    }

    return (
        <div>
            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle" style={{ 'backgroundColor': 'rgba(0, 0, 0, 0.4)' }}>
                <div className="modal-box">

                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{name}</h3>
                        <label htmlFor="booking-modal" className="btn btn-sm btn-circle btn-accent text-white absolute right-2 top-2 border-0">✕</label>

                    </div>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-3'>
                        <input name="date" disabled value={format(date, 'PP') || ''} type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs bg-gray-200 border-gray-300 focus:outline-none" />

                        <select name="slot" className="select select-bordered bg-gray-200 w-full max-w-xs border-gray-300 focus:outline-none">
                            {
                                slots.map(slot => <option key={slot} value={slot}>{slot}</option>)
                            }
                        </select>

                        <input name="name" disabled value={user?.displayName || ''} type="text" placeholder="Full Name" className="input input-bordered input-accent w-full max-w-xs border-gray-300 focus:outline-none" required />

                        <input name="email" disabled value={user?.email || ''} type="email" placeholder="Email" className="input input-bordered input-accent w-full max-w-xs border-gray-300 focus:outline-none " required />

                        <input name="phone" type="number" placeholder="Phone Number" className="input input-bordered input-accent w-full max-w-xs border-gray-300 focus:outline-none " required />


                        <input type="Submit" defaultValue="Submit" className="btn btn-accent text-white w-full max-w-xs" />

                    </form>
                </div>
            </div>

        </div>
    );
};

export default BookingModal;