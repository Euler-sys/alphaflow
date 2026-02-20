import { useState } from "react";
import {
  ShieldAlert,
  Info,
  CheckCircle,
  Clock,
  MessageCircle,
  Bell,
  TrendingUp,
} from "lucide-react";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";

type Message = {
  id: number;
  icon: JSX.Element;
  subject: string;
  preview: string;
  full: string;
  date: string;
  unread: boolean;
};
const messages: Message[] = [
  {
    id: 2,
    icon: <Clock className="text-yellow-600" size={24} />,
    subject: "Transaction Processing – Pending Confirmation",
    preview: "Your recent transfer is currently being processed.",
    full: `Transaction Status Update

Dear Customer,

Your recent transaction request is currently under processing and pending final confirmation.

Status: Pending  
Reason: Internal verification in progress

No action is required from you at this time. Once processing is complete, you will receive a confirmation notification.

Thank you for banking with us.`,
    date: "January 19, 2026",
    unread: true,
  },
  {
    id: 1,
    icon: <CheckCircle className="text-green-600" size={24} />,
    subject: "Account Credit Successful",
    preview: "Funds have been successfully credited to your account.",
    full: `Credit Confirmation

Dear Customer,

We are pleased to inform you that funds have been successfully credited to your account.

Transaction status: Completed  
Availability: Immediate

You may now use your available balance for transfers, payments, or withdrawals.

Thank you for choosing our banking services.`,
    date: "January 18, 2026",
    unread: true,
  },
  {
    id: 3,
    icon: <Info className="text-blue-600" size={24} />,
    subject: "Scheduled System Maintenance",
    preview: "Temporary service interruption may occur.",
    full: `Maintenance Notification

Dear Customer,

To ensure improved service performance, our banking platform will undergo scheduled maintenance.

Maintenance Date: January 7, 2026  
Time: 02:00 AM – 04:00 AM (UTC)

During this period, some services may be temporarily unavailable.

We appreciate your understanding.`,
    date: "December 6, 2025",
    unread: false,
  },
  {
    id: 4,
    icon: <ShieldAlert className="text-blue-600" size={24} />,
    subject: "Security Advisory",
    preview: "Please review recent security recommendations.",
    full: `Security Advisory

Dear Customer,

For your protection, we advise you to regularly review your account security settings.

Recommended actions:
• Update your password periodically  
• Enable two-step verification  
• Monitor login alerts  

If you notice any unusual activity, contact support immediately.

Your security is our priority.`,
    date: "January 6, 2026",
    unread: false,
  },
  {
    id: 5,
    icon: <TrendingUp className="text-green-700" size={24} />,
    subject: "Monthly Financial Summary Available",
    preview: "Your account activity summary is ready.",
    full: `Account Summary Notification

Dear Customer,

Your monthly account activity summary is now available.

This summary includes:
• Deposits and withdrawals  
• Transfers and payments  
• Account balance overview  

Log in to your dashboard to review the full report.

Thank you for managing your finances with us.`,
    date: "January 6, 2026",
    unread: false,
  },
  {
    id: 6,
    icon: <Bell className="text-purple-600" size={24} />,
    subject: "New Online Banking Feature",
    preview: "Improved tools for managing your account.",
    full: `Feature Update

Dear Customer,

We’ve introduced new enhancements to your online banking experience.

New features include:
• Faster transfers  
• Improved transaction tracking  
• Downloadable statements  

Visit your dashboard to explore these updates.`,
    date: "December 6, 2025",
    unread: false,
  },
  {
    id: 7,
    icon: <MessageCircle className="text-gray-600" size={24} />,
    subject: "Customer Support Follow-Up",
    preview: "We’re checking in regarding your recent interaction.",
    full: `Support Follow-Up

Dear Customer,

We are following up to ensure your recent support interaction was resolved satisfactorily.

If you require further assistance, please do not hesitate to contact us through your banking portal.

We appreciate your continued trust.`,
    date: "January 6, 2026",
    unread: false,
  },
];

const InboxPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-800 text-center">
          Metamask
        </h1>

        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition flex items-start gap-4 bg-white ${
                msg.unread
                  ? "border-l-4 border-blue-600 bg-blue-50/30"
                  : "border-gray-200"
              }`}
            >
              <div className="mt-1">{msg.icon}</div>
              <div className="flex-1">
                <h3
                  className={`text-base font-semibold ${msg.unread ? "text-blue-700" : "text-gray-800"}`}
                >
                  {msg.subject}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{msg.preview}</p>
              </div>
              <div className="text-sm text-gray-500 text-right">
                <p>{msg.date}</p>
                {msg.unread && (
                  <span className="text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full ml-1">
                    Unread
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-blue-500 text-lg"
            >
              &times;
            </button>
            <div className="mb-3">{selectedMessage.icon}</div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              {selectedMessage.subject}
            </h2>
            <p className="text-gray-700 text-sm whitespace-pre-line">
              {selectedMessage.full}
            </p>
            <p className="text-xs text-gray-400 mt-4">{selectedMessage.date}</p>
          </div>
        </div>
      )}

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default InboxPage;
