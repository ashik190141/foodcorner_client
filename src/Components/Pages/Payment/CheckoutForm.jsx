import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders/AuthProviders";
import "./CheckoutForm.css";
import UploadingSpinner from "../../Shared/LoadSpinner/UploadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCoin from "../../../Hooks/useCoin";

const CheckoutForm = ({ price }) => {
  console.log(price);
  const [show, setShow] = useState(false);
  const [cardError, setCardError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [, refetch] = useCoin();

  useEffect(() => {
    if (price > 0) {
      fetch("https://foodcorner-omega.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // console.log(data.clientSecret);
          setClientSecret(data.clientSecret);
        });
    }
  }, [price]);

  // console.log(processing);

  const handleSubmit = async (event) => {
    setShow(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log("payment intent", paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        date: new Date(),
        price: price,
      };
      fetch("https://foodcorner-omega.vercel.app/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setShow(false);
          if (data.result) {
            Swal.fire({
              title: data?.message,
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                refetch();
                navigate("/all-recipe");
              }
            });
          }
        });
    }
  };
  return (
    <div className="flex items-center justify-center">
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "black",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {!show ? (
          <button
            className="btn btn-success btn-sm mt-4 text-xl"
            disabled={!stripe || !clientSecret || processing}
            type="submit"
          >
            Pay
          </button>
        ) : (
          <UploadingSpinner></UploadingSpinner>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
