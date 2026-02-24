import { useEffect, useState } from "react";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

interface Deposit {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "approved";
  type: string;
  image?: string;
}

const DepositsPage = () => {
  const currentDate = formatDate(new Date());

  const [userAmount, setUserAmount] = useState<number>(0);
  const [userName, setUserName] = useState<string>("User");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [checkAmount, setCheckAmount] = useState<number>(0);
  const [checkImage, setCheckImage] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserAmount(user.amount || 0);
      setUserName(user.firstName || "User");
      setDeposits(user.deposits || []);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCheckImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleMobileDeposit = () => {
    if (!checkAmount || !checkImage) {
      alert("Please upload check image and enter amount");
      return;
    }

    const newDeposit: Deposit = {
      id: "DEP" + Date.now(),
      amount: checkAmount,
      date: formatDate(new Date()),
      status: "pending",
      type: "mobile-check",
      image: checkImage,
    };

    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    const updatedDeposits = [...(user.deposits || []), newDeposit];

    user.deposits = updatedDeposits;

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    setDeposits(updatedDeposits);
    setCheckAmount(0);
    setCheckImage("");
    setShowDepositModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-semibold mb-4">Deposits</h1>

        {/* Account Overview */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Account Overview
          </h2>

          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold">€{userAmount}.00</p>
                <p className="text-sm text-gray-500">
                  Jan 1 2020 - {currentDate}
                </p>
              </div>
              <button className="text-green-500 font-medium">
                Available Balance
              </button>
            </div>
          </div>
        </div>

        {/* Deposit History */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Deposit History
          </h2>

          {deposits.length === 0 && (
            <p className="text-gray-500 text-sm">No deposits yet</p>
          )}

          {deposits.map((deposit) => (
            <div
              key={deposit.id}
              className="bg-white shadow rounded-lg p-4 mb-3"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">€{deposit.amount}.00</p>
                  <p className="text-sm text-gray-500">{deposit.date}</p>
                </div>

                <span
                  className={`text-sm font-medium ${
                    deposit.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {deposit.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Savings Goals */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {userName}'s Saving Goals
          </h2>

          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <p className="text-xl font-semibold">
              €{(userAmount * 0.01).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">1% Daily</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <p className="text-xl font-semibold">
              €{(userAmount * 0.1).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">10% Weekly</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="flex-1 bg-orange-100 text-orange-500 py-2 px-4 rounded-lg font-medium mr-2">
            + Moneybox
          </button>

          <button
            onClick={() => setShowDepositModal(true)}
            className="flex-1 bg-purple-900 text-white py-2 px-4 rounded-lg font-medium"
          >
            + Mobile Deposit
          </button>
        </div>
      </div>

      {/* Mobile Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Mobile Check Deposit
            </h2>

            <input
              type="number"
              placeholder="Enter check amount"
              value={checkAmount}
              onChange={(e) => setCheckAmount(Number(e.target.value))}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-3"
            />

            {checkImage && (
              <img
                src={checkImage}
                alt="Check Preview"
                className="h-32 object-cover mb-3 rounded"
              />
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setShowDepositModal(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleMobileDeposit}
                className="bg-purple-900 text-white px-4 py-2 rounded"
              >
                Submit (Pending)
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default DepositsPage;