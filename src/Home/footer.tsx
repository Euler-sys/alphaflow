import fc from "../assets/fdic.png";
import cd from "../assets/ehl.png";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
   <footer className="bg-blue-800 text-white py-10">
  <div className="container mx-auto flex flex-wrap gap-3 justify-evenly">
    {/* Company Info */}
    <div>
      <p className="text-sm leading-relaxed w-[400px]">
        At Apex Financier Bank, located in Italy, we believe in building a brighter financial future together. We offer personalized financial solutions, unwavering support, and transformational—not just transactional—banking. Our mission is to help every member of our community grow and thrive. Experience a banking partner who truly cares about your journey and success.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold uppercase">Quicklinks</h3>
      <ul className="mt-2 space-y-2 text-gray-200 text-sm">
        <li>Personal Banking</li>
        <li>Business Banking</li>
        <li>Loans & Mortgages</li>
        <li>Security Center</li>
        <li>News</li>
        <li>Financial Literacy</li>
        <li>About</li>
        <li>Contact Us</li>
        <li>Careers</li>
      </ul>
    </div>

    {/* Social Media & Logos */}
    <div className="flex flex-col md:items-end">
      <h3 className="text-lg font-semibold uppercase">Social Media</h3>
      <div className="mt-2 flex space-x-4">
        <a
          href="#"
          className="bg-white p-2 rounded-full text-blue-800 hover:opacity-75"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="#"
          className="bg-white p-2 rounded-full text-blue-800 hover:opacity-75"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>
    </div>

    {/* Logos */}
    <div className="mt-6 flex space-x-4">
      <img src={fc} alt="FDIC Member" className="h-8" />
      <img src={cd} alt="Equal Housing Lender" className="h-8" />
    </div>
  </div>

  {/* Disclaimer */}
  <div className="mt-10 px-6 text-gray-300 text-xs text-center max-w-5xl mx-auto leading-relaxed">
    Important Information: Apex Financier Bank, based in Italy, will never ask for personal information such as account numbers or passwords via email. Be cautious of emails requesting you to download programs—Apex Financier Bank will never make such a request. Do not respond to messages asking you to update personal information online or by phone. Always use official contact information listed on our website. Online Banking links, ATM locators, and FDIC links lead to external websites. Apex Financier Bank is not responsible for the content or privacy policies of external sites. The FDIC has issued alerts regarding fraudulent emails impersonating financial institutions. These scams often reference mergers, acquisitions, or closures to appear legitimate and steal your information.
  </div>

  {/* Legal Links & Copyright */}
  <div className="mt-6 text-center m-auto text-sm">
    <div className="text-white font-semibold">
      <a href="#" className="hover:underline">
        USA Patriot Act
      </a>{" "}
      |
      <a href="#" className="hover:underline">
        Terms of Use
      </a>{" "}
      |
      <a href="#" className="hover:underline">
        Privacy Policy
      </a>{" "}
      |
      <a href="#" className="hover:underline">
        Digital Privacy Statement
      </a>
    </div>
    <div className="mt-2 text-gray-300 text-xs text-center">
      Copyright © 2025 Apex Financier Bank. All Rights Reserved.
      <br />
      Website Design and Development by{" "}
      <span className="font-semibold">VIEO Design</span>
    </div>
  </div>
</footer>
  );
};

export default Footer;
