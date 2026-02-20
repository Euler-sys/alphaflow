import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"; // Adjust path as needed
// import fdc from "../assets/fdic-digital-sign.blacktext.svg";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left: Logo + FDC Image */}
        <div className="flex flex-col space-x-4">
          <Link to="/">
            <img src={logo} alt="Logo" className=" w-[100px]" />
          </Link>
        </div>

        {/* Middle: Navigation Links (Only 3 links) */}
        <nav className="hidden md:flex space-x-6">
          {[
            "Personal",
            "Loans",
            "Business",
            "Wealth & Insurance",
            "Services",
          ].map((item) => (
            <Link
              key={item}
              to={`/`}
              className="text-gray-700 hover:text-blue-800 font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right: Button & Hamburger Menu */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="border-4 text-[10px] border-blue-800 px-4 py-2 rounded-full">
              LOG-IN
            </button>
          </Link>
          <button
            className="text-gray-700 md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* <img src={fdc} alt="FDC Logo" width={300}  className="p-2"/> */}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md py-4">
          <nav className="flex flex-col items-center space-y-4">
            {[
              "Home",
              "Personal",
              "Business",
              "Loans & Mortgages",
              "Security Center",
              "Financial Literacy",
              "News",
              "About Us",
              "Contact Us",
              "Careers",
            ].map((item) => (
              <Link
                key={item}
                to={`/`}
                className="text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
