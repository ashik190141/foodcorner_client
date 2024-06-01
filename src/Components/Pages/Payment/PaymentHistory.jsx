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
    <div className="max-w-7xl mx-auto p-4">
      {!show ? (
        <div>
          {paymentHistory.length !== 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl md:text-3xl font-semibold my-4 text-center mt-10 mb-10">
                Payment History
              </h3>
              <div className="overflow-x-auto w-full">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-sm md:text-xl px-2 py-2">#</th>
                      <th className="text-sm md:text-xl px-2 py-2 text-center">
                        Date
                      </th>
                      <th className="text-sm md:text-xl px-2 py-2 text-center">
                        Transaction ID
                      </th>
                      <th className="text-sm md:text-xl px-2 py-2 text-center">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((user, index) => (
                      <tr key={user._id}>
                        <th className="text-sm md:text-xl px-2 py-2">
                          {index + 1}
                        </th>
                        <td className="text-sm md:text-xl px-2 py-2">
                          {useDateFormatter(user?.date)}
                        </td>
                        <td className="text-sm md:text-xl px-2 py-2">
                          {user.transactionId}
                        </td>
                        <td className="text-sm md:text-xl px-2 py-2 text-center">
                          $ {user.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-5 text-xl text-center">
              You Have No Payment History
            </div>
          )}
        </div>
      ) : (
        <UploadingSpinner />
      )}
    </div>
  );
};

export default PaymentHistory;
