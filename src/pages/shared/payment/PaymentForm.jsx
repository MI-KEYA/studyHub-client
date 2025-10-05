import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const PaymentForm = () => {

    const { user } = useContext(AuthContext);
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()

    const { sessionId } = useParams()
    console.log(sessionId);

    const [error, setError] = useState('')

    const { isPending, data: sessionInfo = {} } = useQuery({
        queryKey: ['sessions', sessionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${sessionId}`);
            return res.data;
        }
    })
    if (isPending) {
        return "loading.."
    }
    console.log(sessionInfo);
    const amount = sessionInfo.regFee;
    const amountInCents = amount * 100;
    console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
        }
        else {
            setError('');
            console.log("Payment method", paymentMethod);
        }

        // step-2: create payment intent
        const res = await axiosSecure.post("/create-payment-intent", {
            amountInCents,
            sessionId
        })
        const clientSecret = res.data.clientSecret;

        // step-3: confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });
        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log("payment succeeded!");
                console.log(result);
            }
        }

        console.log("res from intent", res);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 my-16 bg-white p-6 rounded-xl
            shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2 border rounded' />
                <button
                    type='submit'
                    disabled={!stripe}
                    className='btn btn-primary w-full'>
                    pay ${amount}
                </button>
                {
                    error && <p className='text-sm text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;