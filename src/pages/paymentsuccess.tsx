import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <img src="/success-icon.png" alt="Success" className="w-20 mx-auto" />
        <h2 className="text-lg font-semibold mt-4">Transfer is completed</h2>
        <p className="text-gray-600 text-sm mt-2">
          Your money has been successfully transferred.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition mt-4"
        >
          New Transfer
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
