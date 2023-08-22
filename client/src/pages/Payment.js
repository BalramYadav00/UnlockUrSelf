import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux'

export default function Checkout({amount, bookNow}) {
    const dispatch = useDispatch();
    function tokenHandler(token){
        bookNow();
    }
  return (
    <button>
        <StripeCheckout
        amount={amount * 100}
        shippingAddress
        stripeKey='pk_test_51IzEyMSFiKOnC1Si1v3RlaJ1SD41j7IpC1oBOknaZganRreFqzMvWQdpYKGdgzZV33Cs4XIsALmAwXWfvYMyzZ3c00WwjERuvu'
        token={tokenHandler}
        currency='inr'
        >
            <button variant='danger'>Pay now</button>
        </StripeCheckout>
    </button>
  )
}