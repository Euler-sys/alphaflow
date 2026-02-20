import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSadCry } from "react-icons/fa";
import { getUsers } from "../backend/api"; // Import getUsers function from api.ts

import logo from "../assets/logo.png";
import lom from "../assets/zelle.webp";
import lol from "../assets/logo.png";
// import bgimg from "../assets/bg.jpg";

const LoginForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [email, setEmail] = useState("");
  const [emailOrAccount, setEmailOrAccount] = useState("");

  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popupImage, setPopupImage] = useState<string>("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //   e.preventDefault();
  //   setIsLoading(true);
  //   setPopupMessage(null);

  //   try {
  //     const users = await getUsers(); // Fetch users from backend
  //     setIsLoading(false);

  //     const user = users.find(
  //       (user: any) => user.email === email && user.password === password
  //     );

  //     if (user) {
  //       setPopupMessage(`Welcome Back, \n  ${user.firstName}!`);
  //       setPopupType("success");
  //       setPopupImage(`${user.profilePicture}`);
  //       setShowPopup(true);

  //       // Save user data in local storage
  //       localStorage.setItem("loggedInUser", JSON.stringify(user));

  //       setTimeout(() => {
  //         setShowPopup(false);
  //         navigate("/pin");
  //       }, 2000);
  //     } else {
  //       setPopupMessage("Incorrect username or password.");
  //       setPopupType("error");
  //       setPopupImage(logo);
  //       setShowPopup(true);
  //       setTimeout(() => setShowPopup(false), 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //     setIsLoading(false);
  //     setPopupMessage("Login failed. Please try again.");
  //     setPopupType("error");
  //     setPopupImage(logo);
  //     setShowPopup(true);
  //     setTimeout(() => setShowPopup(false), 2000);
  //   }
  // };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPopupMessage(null);

    try {
      const users = await getUsers(); // Fetch users from backend
      setIsLoading(false);

      // Check if input is an email or an account number
      const isEmail = emailOrAccount.includes("@"); // Check if it's an email
      const isAccountNumber = /^\d{12}$/.test(emailOrAccount); // Check if it's a 12-digit number

      const user = users.find(
        (user: any) =>
          (isEmail &&
            user.email.toLowerCase() === emailOrAccount.toLowerCase()) ||
          (isAccountNumber && user.accountNumber === emailOrAccount),
      );

      if (user && user.password === password) {
        setPopupMessage(`Welcome Back, \n  ${user.firstName}! \n `);
        setPopupType("success");
        setPopupImage(`${user.profilePicture}`);
        setShowPopup(true);

        // Save user data in local storage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        setTimeout(() => {
          setShowPopup(false);
          navigate("/pin");
        }, 2000);
      } else {
        setPopupMessage("Incorrect email/account number or password.");
        setPopupType("error");
        setPopupImage(logo);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
      setPopupMessage("Login failed. Please try again.");
      setPopupType("error");
      setPopupImage(logo);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen relative bg-cover bg-center"
      // style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div> */}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen z-10 ">
          <div className="bg-white   p-6 w-80 flex flex-col items-center">
            <img
              src={lol} // replace with your actual image path
              alt="Loading illustration"
              className="w-'200px h-32 object-contain mb-4"
            />

            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-dotted rounded-full animate-spin"></div>
              {/* <p className="text-sm text-gray-600">Loading...</p> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex z-10 w-full  justify-center items-center min-h-screen p-4">
          <div className="  rounded p-8 w-full max-w-md">
            <img src={logo} alt="" width={100} className="m-auto mb-3" />

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="flex items-center  border-b    px-4 py-3">
                  {/* <FaEnvelope className="text-gray-400 mr-3" /> */}
                  <input
                    type="text"
                    value={emailOrAccount}
                    onChange={(e) => setEmailOrAccount(e.target.value)}
                    placeholder="User ID"
                    required
                    className="flex-grow bg-transparent outline-none text-sm placeholder-blue-700 placeholder:text-[18px] placeholder:font-semibold"
                  />
                </label>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-2 font-semibold">
                  {/* <p>Password</p>
                  <p className="text-purple-500 ">Forgot Password?</p> */}
                </div>

                <label className="flex items-center  border-b  px-4 py-3">
                  {/* <FaLock className="text-gray-400 mr-3" /> */}
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="flex-grow bg-transparent outline-none text-sm placeholder-gray-400 placeholder:text-[18px] "
                  />
                  <span
                    className="cursor-pointer text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveUserId"
                  className="w-4 h-4 text-blue-600 mt-4 border-2 border-blue-600 rounded-full focus:ring-blue-500"
                />
                <label className="text-blue-700 text-sm mt-4">
                  Save User ID
                </label>
              </div>

              <div className="m-auto flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-bold py-2 px-6 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  LOG IN
                </button>
              </div>
            </form>
            <div className="m-auto flex gap-3 justify-center">
              <a
                href="#"
                className="text-blue-600 mt-5 text-sm hover:underline mb-8"
              >
                Forgot ID/Password
              </a>

              <Link
                className="text-blue-600 mt-5 text-sm hover:underline mb-8"
                to={"/signup"}
              >
                Create an account{" "}
              </Link>
            </div>

            {/* <div className="flex items-center my-4">
  <div className="flex-grow border-t border-gray-400"></div>
  <span className="px-3 text-gray-600">OR</span>
  <div className="flex-grow border-t border-gray-400"></div>
</div> */}

            {/* <div className="flex gap-3">
            <div className="bg-[#f8f8fb]  text-xl border-2 border-purple-200 px-4 py-2 w-[200px] text-center pointer ">Internet Banking</div>
            <div className="bg-[#f8f8fb]  text-xl border-2  border-purple-200 px-4 py-2 w-[200px] text-center "><Link to="/signup">
              Sign Up
              </Link></div>
           </div> */}

            <img src={lom} alt="" className="mt-9" />
          </div>
        </div>
      )}

      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-md  text-center flex flex-col items-center">
            {popupType === "success" ? (
              <>
                <img
                  src={popupImage}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-lg font-semibold">{popupMessage}</p>
              </>
            ) : (
              <>
                <div className="text-blue-800 text-6xl mb-8 p-4">
                  <FaSadCry />
                </div>
                <p className="text-2xl font-semibold text-black p-6">
                  {popupMessage}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
