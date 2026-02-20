import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav2 from "./bottomnav2";

const PaymentOptions: React.FC = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-blue-300 text-left text-sm">
        <h2 className="text-blue-800 font-bold text-lg mb-2">
          🚫 Transfer Access Restricted – Tier-2 Compliance Required
        </h2>

        <p className="text-gray-700 mb-4">
          Outbound transfers from this account are currently unavailable.
        </p>

        <p className="text-gray-700 mb-4">
          Per <strong>U.S. Reserve Compliance Policy</strong> and digital asset
          routing standards, your account must fulfill all Tier-2 clearance
          requirements prior to engaging in any financial transactions.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-blue-800 mb-1">Mandatory Action:</p>
          <p>
            A <strong>Tier-2 Reserve Unlock Payment</strong> of{" "}
            <span className="font-semibold text-blue-700">$107,544.00 USD</span>{" "}
            is required to activate transfer functionality on this account.
          </p>
          <p className="mt-2">
            This payment is part of standard onboarding for accounts subject to
            reserve-tier routing under national financial compliance procedures.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-gray-800 mb-1">
            📄 Compliance Verification Summary:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              Transfer Status:{" "}
              <span className="text-blue-600 font-semibold">
                Disabled – Clearance Incomplete
              </span>
            </li>
            <li>
              Compliance Tier: <strong>Tier-2</strong>
            </li>
            <li>
              Reserve Status:{" "}
              <span className="text-yellow-700 font-semibold">
                Pending Activation
              </span>
            </li>
            <li>
              Reference Code:{" "}
              <code className="text-gray-800 bg-gray-100 px-1 rounded">
                USR-LK207-B
              </code>
            </li>
          </ul>
        </div>

        <p className="text-gray-700 mb-4">
          Transfers cannot be initiated until this requirement is fulfilled in
          full. No exceptions are permitted under current compliance protocol.
        </p>

        <p className="text-xs text-gray-500 mb-6">
          🔐 Regulation: This requirement is enforced in accordance with the{" "}
          <strong>U.S. Reserve Secure Transactions Act</strong> (Title 48,
          Section 203-B) and is monitored under digital federal routing
          safeguards.
        </p>

        <div className="flex flex-col sm:flex-row gap-4"></div>
      </div>

      <div className=" bg-gray-100 mb-[100px] p-6 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-bold text-center text-blue-800 mb-4">
            Pay now
          </h1>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          >
            <option value="">-- Choose Payment Method --</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="wire">Wire Transfer</option>
          </select>

          {method === "bitcoin" && (
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-300 text-sm">
              <p>Send your Bitcoin payment to the wallet address below:</p>
              <p className="font-mono mt-2 text-blue-700">
                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
              </p>
            </div>
          )}

          {method === "wire" && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-300 text-sm">
              <p>Use the following information to send a wire transfer:</p>
              <ul className="list-disc pl-5 mt-2 text-gray-700">
                <li>Bank Name: Apex Financier Bank.</li>
                <li>Routing Number: 123456789</li>
                <li>Account Number: 987654321</li>
                <li>SWIFT Code: CKTBUS33</li>
              </ul>
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 sm:w-auto px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Close Window
          </button>
        </div>
      </div>

      <BottomNav2 />
    </>
  );
};

export default PaymentOptions;
