import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { success } from 'daisyui/src/colors';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ appointment }) => {
    const stripe = useStripe();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionID, setTransactoionID] = useState('');
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const { _id, price, patient, ptatientName } = appointment;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_serverLocation}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })

    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        setError(error?.message || '');
        setSuccess('');
        setProcessing(true);

        //confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: ptatientName,
                        email: patient
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError?.message);
            setSuccess('');
            setProcessing(false)
        }
        else {
            setError('');
            console.log(paymentIntent);
            setTransactoionID(paymentIntent.id);
            setSuccess('Congrats! Your Payment is completed.');

            // store payment on database
            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id
            }

            fetch(`${process.env.REACT_APP_serverLocation}/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(payment)

            }).then(res => res.json())
                .then(data => {
                    setProcessing(false)
                    console.log(data);
                })
        }
    }




    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-success mt-3' type="submit" disabled={!stripe || !clientSecret || success}>
                Pay
            </button>
            {
                error && <p className='text-red-500 mt-2 font-semibold'>{error}</p>
            }
            {
                success && <div className='text-green-500 mt-2 font-semibold'>
                    <p>{success}</p>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionID}</span></p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;