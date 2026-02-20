import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import person from "../assets/person_1.jpg";

const BottomNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userImage, setUserImage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [AcctNum, setAcctNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUserImage(user.profilePicture || person);
      setUserName(user.firstName || "User");
      // setUserEmail(user.email || "");
      setAcctNumber(user.accountNumber || "");
    }
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-black">Processing...</p>
      </div>
    );
  }

  return (
    <>
      {/* Top-left Hamburger Button */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-blue-800 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <FaBars className="text-xl" />
        </button>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-blue-500"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Full Sidebar Content Wrapper */}
        <div className="h-full flex flex-col justify-between">
          {/* Top Content */}
          <div>
            {/* Logo or Title */}
            <div className="px-6 pt-10 pb-6 border-b border-gray-200">
              <img src="" alt="" />
            </div>

            {/* User Info */}
            <div className="bg-transparent text-[#000] p-4 flex flex-col gap-4 items-center">
              <img
                src={userImage}
                alt="Profile"
                className="h-16 w-16 border-4 border-blue-600 rounded-full"
              />
              <div className="text-center">
                <h1 className="text-sm font-semibold">
                  Hello{" "}
                  <span className="uppercase">{userName.split(" ")[0]}!!</span>,
                </h1>
                <span className="text-lg font-semibold">Welcome Back</span>

                <p className="text-[13px] font-semibold">
                  Account Number: {AcctNum}
                </p>
                <p className="text-[13px] font-semibold">
                  Routine Number: 233293939
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="px-6 py-4 space-y-4">
              <Link
                to="/overview"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <span className="material-icons">dashboard</span>
                <span>Investment</span>
              </Link>
              <Link
                to="/history"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <span className="material-icons">history</span>
                <span>History</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <FaHome className="text-base" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/zelle"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <FaExchangeAlt className="text-base" />
                <span>Transfer | Zelle®</span>
              </Link>
              <Link
                to="/cards"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <span className="material-icons">credit_card</span>
                <span>My Cards</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition"
              >
                <span className="material-icons">settings</span>
                <span>Settings</span>
              </Link>
            </nav>
          </div>

          <div
            className="p-6 cursor-pointer flex items-center gap-3 text-lg text-blue-600 hover:text-blue-800 font-semibold"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-2xl" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
