import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./stickyNav";
import { FiSettings } from "react-icons/fi";
import BottomNav2 from "./bottomnav2";
import lol from "../assets/logo.png";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    profilePicture: string;
    amount: number;
  } | null>(null);
  const navigate = useNavigate();
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const Modal = ({
    title,
    content,
    onClose,
  }: {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{content}</div>
        <button
          onClick={onClose}
          className="mt-4 text-sm border-2 border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white"
        >
          X
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 md:px-8 lg:px-16">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl overflow-hidden">
          <header className="bg-[#000] text-white  py-6 md:py-8">
            <h1 className="text-2xl md:text-3xl font-semibold p-2">
              <FiSettings className="text-2xl" />
            </h1>
          </header>

          <div className="flex justify-center relative -mt-12">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">
              <img
                src={user?.profilePicture || "/src/assets/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div>
              <h2 className="text-sm font-bold text-gray-700 mb-4">
                Profile Settings
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    key: "profile",
                    name: fullName || "User",
                    sub: "Profile Settings",
                    action: "Edit",
                  },
                  {
                    key: "limits",
                    name: "Account Limits",
                    sub: "View account limits",
                    action: "View",
                  },
                  {
                    key: "statements",
                    name: "Statements & Reports",
                    sub: "Download monthly statements.",
                  },
                  {
                    key: "referrals",
                    name: "Referrals",
                    sub: "Earn money when your friends join.",
                  },
                  {
                    key: "support",
                    name: "24/7 Help Center",
                    sub: "Have an issue? Speak to our team.",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => setActiveModal(item.key)}
                  >
                    <div className="flex items-center space-x-3">
                      <FiSettings className="text-2xl" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                    </div>
                    {item.action && (
                      <button className="text-purple-500 text-sm font-semibold">
                        {item.action}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {activeModal && (
              <Modal
                title={(() => {
                  switch (activeModal) {
                    case "profile":
                      return "Edit Profile";
                    case "limits":
                      return "Account Limits";
                    case "statements":
                      return "Statements & Reports";
                    case "referrals":
                      return "Referrals";
                    case "support":
                      return "Help Center";
                    default:
                      return "";
                  }
                })()}
                content={(() => {
                  switch (activeModal) {
                    case "profile":
                      return (
                        <div>
                          <p>Edit your profile info here.</p>
                          <img
                            src={user?.profilePicture}
                            alt=""
                            className="w-[100px] rounded-full h-[100px] border-4 border-purple-500 m-auto mt-5"
                          />
                          First Name:
                          <input
                            type="text"
                            value={user?.firstName}
                            className="border-2 mt-2 px-2"
                            readOnly
                          />{" "}
                          <br />
                          Last Name:
                          <input
                            type="text"
                            value={user?.lastName}
                            className="border-2 mt-2 px-2"
                            readOnly
                          />
                        </div>
                      );
                    case "limits":
                      return (
                        <>
                          {/* <p>These are your account limits.</p> */}
                          <p className="text-xl font-bold"> $1,000,000.00</p>
                          <button className="bg-black text-white px-4 py-2 mt-3 hover:bg-transparent hover:border-2 hover:border-black hover:text-black">
                            Upgrade Limit
                          </button>
                        </>
                      );
                    case "statements":
                      return <p>Download your monthly statements.</p>;
                    case "referrals":
                      return <p>Invite your friends and earn rewards.</p>;
                    case "support":
                      return <p>Contact support anytime.</p>;
                    default:
                      return null;
                  }
                })()}
                onClose={() => setActiveModal(null)}
              />
            )}

            <div>
              <h2 className="text-sm font-bold text-gray-700 mb-4">
                Password & Security
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                  <span className="text-sm font-medium text-gray-800">
                    Update Password
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <span className="text-sm font-medium text-gray-800">
                    Log out
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
              </ul>
            </div>
          </div>

          <footer className="text-center text-gray-500 text-xs py-4 bg-gray-50">
            Version 9.8.0
          </footer>
        </div>
      </div>
      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default SettingsPage;
