import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";
// import SupportBot from "../components/support";
import { fetchHistoryForLoggedUser, Transaction } from "../backend/api";

import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TransactionHistory = () => {
  const [userAmount, setUserAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userLastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(10);

  useEffect(() => {
    const loadData = async () => {
      const storedUser = localStorage.getItem("loggedInUser");
      if (!storedUser) return;

      try {
        const user = JSON.parse(storedUser);
        setUserAmount(user.amount || 0);
        setUserName(user.firstName || "");
        setLastName(user.lastName || "");
        console.log(userName);
        console.log(userLastName);

        const history = await fetchHistoryForLoggedUser(user.email);
        setTransactions(history);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load user data or history:", err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // const inflow = allTransactions
  //   .filter((t) => t.type === "Credit")
  //   .reduce((sum, t) => sum + t.amount, 0);

  // const outflow = allTransactions
  //   .filter((t) => t.type === "Debit")
  //   .reduce((sum, t) => sum + t.amount, 0);

  const formatAmount = (amount: string | number) => {
    // Remove any non-numeric characters except period (.) or comma
    let cleaned = String(amount).replace(/[^0-9.,-]/g, "");

    // Replace comma with dot if comma is used as decimal
    // If you have amounts like "7,000.50" (US) -> "7000.50"
    // If your backend uses "7.000,50" (EU style) -> handle commas
    if (cleaned.indexOf(",") > -1 && cleaned.indexOf(".") === -1) {
      cleaned = cleaned.replace(",", ".");
    } else {
      cleaned = cleaned.replace(/,/g, "");
    }

    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white rounded-xl  overflow-hidden mt-8 p-4 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-semibold">
            ADV PLUS BANKING - 1234
          </h2>
          <p className="text-2xl md:text-3xl font-bold mt-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "eur",
            }).format(userAmount)}
          </p>
          <p className="text-sm text-gray-500">Available balance</p>
        </div>

        <div className="mt-4">
          <h3 className="text-gray-600 font-semibold text-sm md:text-base mb-2">
            RECENT TRANSACTIONS
          </h3>
          {loading ? (
            <div className="space-y-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse space-y-2 border-b pb-2 mb-8"
                >
                  <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    <div className="h-3 w-16 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No transactions found.
            </p>
          ) : (
            <div className="space-y-4 mb-8">
              {[...transactions].slice(0, visibleCount).map((tx, index) => (
                <div
                  key={index}
                  className="border-b pb-2 cursor-pointer hover:bg-gray-50 transition mb-8"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <p className="text-xs text-gray-500">{tx.date}</p>
                  <p className="text-sm font-medium text-gray-800">
                    {tx.description}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span
                      className={`font-semibold ${
                        tx.type === "debit" ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      €
                      {formatAmount(tx.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-xs text-gray-400">Successful</span>
                  </div>
                </div>
              ))}

              {visibleCount < transactions.length && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4 md:px-8">
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-2 right-4 text-gray-500 text-xl hover:text-black"
            >
              &times;
            </button>

            <div className="w-full max-w-lg mx-auto bg-white p-4 rounded-xl border shadow-sm">
              <h2 className="text-2xl font-semibold mb-3">
                Transfer Confirmed
              </h2>

              <div className="border rounded-lg p-4 flex items-start gap-3 bg-[#f9fffa]">
                <CheckCircle className="text-green-600" size={24} />
                <p className="text-gray-700">
                  You sent{" "}
                  <span className="font-semibold">
                    {Number(selectedTransaction.amount).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "eur",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    )}
                  </span>{" "}
                  on{" "}
                  <span className="font-semibold">
                    {selectedTransaction.date}
                  </span>
                </p>
              </div>

              <div className="mt-5 space-y-2 text-gray-700 text-sm">
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {selectedTransaction.description}
                </p>
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {selectedTransaction.type}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span>{" "}
                  {Number(selectedTransaction.amount).toLocaleString("en-US", {
                    style: "currency",
                    currency: "eur",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link to={"/history"}>
                  <button
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
                    onClick={() => setSelectedTransaction(null)}
                  >
                    Activity
                  </button>
                </Link>

                <button
                  className="w-full border border-green-600 text-green-600 py-3 rounded-lg font-semibold"
                  onClick={() => setSelectedTransaction(null)}
                >
                  New Transfer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <StickyBottomNav /> */}
      </div>

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default TransactionHistory;
