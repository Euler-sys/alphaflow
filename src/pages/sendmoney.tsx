import { useEffect, useState } from "react";
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard } from "react-icons/fa";
import log from "../assets/logo.png";
import { getUsers, updateUser } from "../backend/api";

const SendMoney = () => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [userImage, setUserImage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [receiver, setReceiver] = useState({
    name: "",
    bank: "",
    accountNumber: "",
    routingNumber: "",
    amount: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<"form" | 1 | 2 | 3 | "success">("form");
  const [code, setCode] = useState("");
  const [accessDetails, setAccessDetails] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);

      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserImage(parsedUser.profilePicture || "default-avatar.jpg");
        setUserName(parsedUser.firstName || "User");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver({ ...receiver, [e.target.name]: e.target.value });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setReceiver({ ...receiver, amount: raw });
  };

  // Hardcoded verification answers
  const CORRECT_CODE = "123456";
  const CORRECT_ACCESS = "ACCESS123";
  const TAX_PERCENT = 0.1;

  const taxFee = user ? Number(user.amount) * TAX_PERCENT : 0;

  // Progress through the 3-step verification
  const handleNextStage = () => {
    if (stage === 1) {
      if (code !== CORRECT_CODE) {
        const remaining = attempts - 1;
        setAttempts(remaining);
        if (remaining <= 0) {
          alert("Account on hold due to 3 failed attempts.");
          setStage("form");
          setAttempts(3);
          return;
        }
        setError(`Incorrect code. ${remaining} attempt(s) left.`);
        return;
      }
      setError("");
      setAttempts(3);
      setStage(2);
    } else if (stage === 2) {
      if (accessDetails !== CORRECT_ACCESS) {
        const remaining = attempts - 1;
        setAttempts(remaining);
        if (remaining <= 0) {
          alert("Account on hold due to 3 failed attempts.");
          setStage("form");
          setAttempts(3);
          return;
        }
        setError(`Incorrect access details. ${remaining} attempt(s) left.`);
        return;
      }
      setError("");
      setAttempts(3);
      setStage(3);
    } else if (stage === 3) {
      setError("");
      handleSubmit(); // Send money after tax confirmation
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(receiver.amount);
    if (
      !receiver.name ||
      !receiver.bank ||
      !receiver.accountNumber ||
      !receiver.routingNumber ||
      !receiver.amount ||
      amountNum <= 0
    ) {
      alert("Please fill all fields correctly.");
      return;
    }
    setStage(1); // start verification
    setAttempts(3);
  };

  const handleSubmit = async () => {
    if (!user) return;

    const transferAmount = Number(receiver.amount);
    if (transferAmount > user.amount) {
      alert("Insufficient balance");
      return;
    }

    setLoading(true);

    const newHistoryEntry = {
      date: new Date().toISOString().split("T")[0],
      amount: transferAmount + taxFee,
      description: `Transfer to ${receiver.name}`,
      type: "debit",
      formattedAmount: `€${(transferAmount + taxFee).toFixed(2)}`,
    };

    const updatedUser = {
      ...user,
      amount: user.amount - transferAmount - taxFee,
      history: [newHistoryEntry, ...(user.history || [])],
    };

    try {
      const index = users.findIndex((u) => u.email === user.email);
      if (index !== -1) {
        await updateUser(index, updatedUser);

        const updatedUsers = [...users];
        updatedUsers[index] = updatedUser;
        setUsers(updatedUsers);
        setUser(updatedUser);
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      }

      setLoading(false);
      setStage("success");
    } catch (err) {
      console.error(err);
      alert("Failed to send money. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-red-800 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        {user && (
          <img
            src={userImage}
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-white"
          />
        )}
        <h1 className="text-lg font-thin">
          {userName ? `${userName}'s Dashboard` : "Dashboard"}
        </h1>
      </div>

      {/* Balance */}
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-gray-700 font-medium">Total Balance</h2>
          <h1 className="text-3xl font-bold mt-2">
            €{user?.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h1>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6">
        <header className="w-full flex items-center justify-between py-4 border-b max-w-md">
          <button onClick={() => navigate(-1)} className="text-xl">
            <FaArrowLeft />
          </button>
          <h1 className="text-lg font-semibold">
            {stage === "form" ? "New Transfer" : "Verification"}
          </h1>
          <div className="w-8" />
        </header>

        {/* Initial Form */}
        {stage === "form" && (
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                <FaCreditCard className="text-red-600" />
                <div>
                  <p className="text-sm font-medium">Debit Card</p>
                  <p className="text-xs text-gray-500">**** **** **** 4900</p>
                </div>
              </div>

              {[
                { name: "name", label: "Receiver Full Name" },
                { name: "bank", label: "Bank Name" },
                { name: "accountNumber", label: "Account Number" },
                { name: "routingNumber", label: "Routing Number" },
                { name: "amount", label: "Transfer Amount" },
                { name: "purpose", label: "Purpose (Optional)" },
              ].map((field) => (
                <div key={field.name} className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={(receiver as any)[field.name]}
                    onChange={
                      field.name === "amount"
                        ? handleAmountChange
                        : handleInputChange
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-lg"
                    required={field.name !== "purpose"}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-red-800 text-white py-3 text-lg hover:bg-black transition"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Verification Steps */}
        {stage !== "form" && stage !== "success" && (
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
            {stage === 1 && (
              <>
                <h2 className="text-lg font-medium mb-4">
                  Enter 6-Digit code sent to your Email
                </h2>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mb-2"
                />
              </>
            )}

            {stage === 2 && (
              <>
                <h2 className="text-lg font-medium mb-4">Access Details</h2>
                <input
                  type="text"
                  value={accessDetails}
                  onChange={(e) => setAccessDetails(e.target.value)}
                  placeholder="Enter your access details"
                  className="w-full px-4 py-2 border rounded-lg mb-2"
                />
              </>
            )}

            {stage === 3 && (
              <>
                <h2 className="text-lg font-medium mb-4">Tax / Fee</h2>
                <p className="mb-2">
                  A tax/fee of <strong>€{taxFee.toFixed(2)}</strong> (10% of
                  your balance) must be paid to proceed.
                </p>
              </>
            )}

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <button
              onClick={handleNextStage}
              className="w-full bg-red-800 text-white py-3 text-lg hover:bg-black transition"
            >
              {stage < 3 ? "Next" : "Pay Tax & Submit"}
            </button>
          </div>
        )}

        {/* Success */}
        {stage === "success" && (
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6 text-center">
            <h2 className="text-green-600 font-semibold mb-2">
              Transaction Complete
            </h2>
            <p>Your transfer has been simulated successfully.</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <img src={log} alt="Loading" className="animate-pulse" />
        </div>
      )}

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default SendMoney;