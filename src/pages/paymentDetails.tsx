import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BottomNav from "./stickyNav";

const BillPaymentPage = () => {
  const paymentDetails = {
    1: {
      name: "Money transfer",
      description: "Send money securely to anyone.",
    },
    2: {
      name: "Mobile payment",
      description: "Recharge or pay bills using your mobile.",
    },
    3: { name: "IBAN payment", description: "Transfer funds via IBAN safely." },
    4: {
      name: "Utility bills",
      description: "Pay your electricity, water, and internet bills.",
    },
    5: {
      name: "Transport",
      description: "Purchase tickets and pay for transport services.",
    },
    6: {
      name: "Insurance",
      description: "Manage and pay your insurance premiums.",
    },
    7: {
      name: "Penalties",
      description: "Settle traffic and other penalties quickly.",
    },
    8: { name: "Charity", description: "Donate to charitable organizations." },
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const { paymentType } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bill, setBill] = useState({
    billerName: "",
    accountNumber: "",
    amount: "",
    paymentMethod: "Credit Card",
    dueDate: "",
    payerEmail: "",
    notes: "",
  });

  const parsedId = Number(id);
  if ([1, 2, 3, 4, 5, 6, 7, 8].includes(parsedId)) {
    const payment = paymentDetails[parsedId as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8];
    console.log(payment);
  } else {
    console.error("Invalid payment ID");
  }

  const payment = paymentDetails[parsedId as keyof typeof paymentDetails];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
    console.log(paymentType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setError(true); // Simulating a failed bill payment
    }, 3000);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6">
        {/* Header */}
        <header className="w-full flex items-center justify-between py-4 border-b lg:max-w-md">
          <button
            className="text-xl text-gray-600"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
          {/* <h1 className="text-lg font-semibold">Bill Payment</h1> */}
          <h1 className="text-lg font-semibold capitalize">{payment.name}</h1>
          <div className="w-8"></div>
        </header>

        {/* Bill Payment Form */}
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-gray-700 text-lg font-medium mb-4">
            Payment Details
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Biller Name */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="text-sm text-gray-600">Biller Name</label>
              <input
                type="text"
                name="billerName"
                placeholder="Enter biller name (e.g., Electricity, Internet)"
                value={bill.billerName}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                required
              />
            </div>

            {/* Account/Reference Number */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="text-sm text-gray-600">
                Account/Reference Number
              </label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter your account number"
                value={bill.accountNumber}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                required
              />
            </div>

            {/* Billing Amount */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="text-sm text-gray-600">Amount to Pay</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter bill amount"
                value={bill.amount}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="text-sm text-gray-600">Payment Method</label>
              <select
                name="paymentMethod"
                value={bill.paymentMethod}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
              >
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>Mobile Payment</option>
              </select>
            </div>

            {/* Due Date (Optional) */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="text-sm text-gray-600">
                Due Date (Optional)
              </label>
              <input
                type="date"
                name="dueDate"
                value={bill.dueDate}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            {/* Payer Email */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="text-sm text-gray-600">Payer Email</label>
              <input
                type="email"
                name="payerEmail"
                placeholder="Enter your email (for receipt)"
                value={bill.payerEmail}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                required
              />
            </div>

            {/* Notes (Optional) */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="text-sm text-gray-600">
                Additional Notes (Optional)
              </label>
              <input
                type="text"
                name="notes"
                placeholder="Enter any additional information"
                value={bill.notes}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 text-lg font-medium hover:bg-black transition"
            >
              Pay Bill
            </button>
          </form>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-xl font-medium animate-pulse">
              Processing...
            </div>
          </div>
        )}

        {/* Error Modal */}
        {error && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-semibold text-blue-600">
                Payment Failed
              </h2>
              <p className="text-gray-600 mt-2">
                Your payment could not be processed. Please try again or contact
                support.
              </p>
              <button
                onClick={() => setError(false)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default BillPaymentPage;
