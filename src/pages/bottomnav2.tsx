import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaExchangeAlt,
  FaCreditCard,
  FaCog,
} from "react-icons/fa";

const BottomNav2: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
        <div className="flex justify-around items-center py-2">
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
          >
            <FaHome
              className={`text-xl ${location.pathname === "/dashboard" && "text-blue-600"}`}
            />
            <span>Home</span>
          </Link>
          <Link
            to="/history"
            className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
          >
            <FaHistory
              className={`text-xl ${location.pathname === "/history" && "text-blue-600"}`}
            />
            <span>History</span>
          </Link>
          <Link
            to="/zelle"
            className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
          >
            <FaExchangeAlt
              className={`text-xl ${location.pathname === "/zelle" && "text-blue-600"}`}
            />
            <span>Zelle</span>
          </Link>
          <Link
            to="/cards"
            className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
          >
            <FaCreditCard
              className={`text-xl ${location.pathname === "/cards" && "text-blue-600"}`}
            />
            <span>Cards</span>
          </Link>
          <Link
            to="/settings"
            className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
          >
            <FaCog
              className={`text-xl ${location.pathname === "/settings" && "text-blue-600"}`}
            />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNav2;
