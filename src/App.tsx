import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "animate.css";
import LoginForm from "./pages/login";
import Confirmation from "./pages/confirmation";
import Dashboard from "./pages/dashboard";
import PaymentPage from "./components/payment";
import DepositsPage from "./components/deposit";
import LoanPage from "./components/loan";
import TransactionHistory from "./pages/history";
import MyCards from "./pages/myCards";
import SettingsPage from "./pages/settings";
import SendMoney from "./pages/sendmoney";
import ProtectedRoute from "./components/protect";
import PaymentDetails from "./pages/paymentDetails";
import PaymentSuccess from "./pages/paymentsuccess";
import Admin from "./backend/admin";
import SignUp from "./backend/signup";
import ZellePage from "./pages/zelle";
import PaymentOptions from "./pages/error";
// import { Inbox } from "lucide-react";
import InboxPage from "./components/inbox";
import VerifyPage from "./components/verify";

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<VerifyPage />} />
         
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pin" element={<Confirmation />} />
          <Route path="/overview" element={
            <ProtectedRoute><PaymentPage />
              </ProtectedRoute>} />
          <Route path="/deposit" element={
            <ProtectedRoute><DepositsPage />
              </ProtectedRoute>} />
          <Route path="/loan" element={
            <ProtectedRoute><LoanPage />
              </ProtectedRoute>} />
          <Route path="/history" element={
            <ProtectedRoute><TransactionHistory />
              </ProtectedRoute>} />
          <Route path="/zelle" element={
            <ProtectedRoute><ZellePage />
              </ProtectedRoute>} />
          <Route path="/error" element={
            <ProtectedRoute><PaymentOptions />
              </ProtectedRoute>} />
          <Route
            path="/cards"
            element={
              <ProtectedRoute>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="/payment/:id" element={
            <ProtectedRoute><PaymentDetails />
              </ProtectedRoute>} />

          <Route
            path="/send"
            element={
              <ProtectedRoute>
                <SendMoney />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <InboxPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
