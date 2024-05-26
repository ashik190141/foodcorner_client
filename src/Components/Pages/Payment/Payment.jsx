import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useTitle from '../../../Hooks/useTitle';
import CheckoutForm from './CheckoutForm';

import Modal from "react-modal";
import { AuthContext } from '../../Providers/AuthProviders/AuthProviders';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
import PaymentHistory from './PaymentHistory';

const Payment = () => {
    useTitle("Payment");
    const {user} = useContext(AuthContext);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }

    const location = useLocation();
    const price = location.state;
    return (
      <div className="p-11 mt-20 max-w-7xl mx-auto">
        <div className="flex justify-end">
          <button onClick={openModal}>Payment History</button>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price}></CheckoutForm>
        </Elements>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='flex justify-end'>
            <button className="text-2xl" onClick={closeModal}>
              X
            </button>
          </div>
          <PaymentHistory email={user?.email}></PaymentHistory>
        </Modal>
      </div>
    );
};

export default Payment;