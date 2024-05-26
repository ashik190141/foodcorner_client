import React, { useEffect } from "react";
import { useState } from "react";
import { useDateFormatter } from "../../../Hooks/useDateFormatter";
import UploadingSpinner from "../../Shared/LoadSpinner/UploadingSpinner";

const PaymentHistory = ({ email }) => {
  console.log(email);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    fetch(`https://foodcorner-omega.vercel.app/payment-history/${email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShow(false);
        setPaymentHistory(data);
      });
  }, [email]);
  return (
    <div className="max-w-7xl mx-auto">
      {!show ? (
        <div>
          {paymentHistory.length != 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold my-4 text-center mt-10 mb-10">
                Payment History
              </h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="text-xl">#</th>
                      <th className="text-xl text-center">Date</th>
                      <th className="text-xl text-center">Transaction ID</th>
                      <th className="text-xl text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((user, index) => (
                      <tr key={user._id}>
                        <th className="text-xl">{index + 1}</th>
                        <td className="text-xl">
                          {useDateFormatter(user?.date)}
                        </td>
                        <td className="text-xl">{user.transactionId}</td>
                        <td className="text-xl text-center">$ {user.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-5 text-xl">You Have No Payment History</div>
          )}
        </div>
      ) : (
        <UploadingSpinner></UploadingSpinner>
      )}
    </div>
  );
};

export default PaymentHistory;
