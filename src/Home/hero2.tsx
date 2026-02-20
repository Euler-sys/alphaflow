import cardImg from "../assets/heroooo.jpg"; // Replace with actual image

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden w-full">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 px-6 lg:px-16 py-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-800 mb-6 mt-[100px] leading-tight">
            NOW UP TO 4X <br /> REWARDS — <br /> EVERYDAY!
          </h1>
         <p className="text-gray-700 mb-6 text-base lg:text-lg">
  The Apex Financier Bank Visa Credit Card, based in Italy, just got even better! Earn <strong>4X points</strong> on entertainment, travel, and wholesale clubs; <strong>3X points</strong> on dining, gas, and groceries; and <strong>2X points</strong> on everything else. Enjoy perks like Amazon Prime subscription reimbursement* and redeem rewards for cash back or statement credit.
</p>

          <button className="bg-blue-800 text-white px-6 py-3 font-semibold rounded hover:bg-blue-700 transition">
            LEARN MORE
          </button>
        </div>

        {/* Right Side: Image (flush to edge) */}
        <div className="w-full lg:w-1/2">
          <img
            src={cardImg}
            alt="Woman holding phone and card"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
