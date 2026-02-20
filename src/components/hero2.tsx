import playstore from "../assets/google.png"; // Replace with actual path
// Replace with actual path

const Hero2 = () => {
  return (
    <section className="min-h-[500px] flex items-center justify-center bg-white relative px-4 text-center">
      {/* Decorative top-right dot */}
      <div className="absolute top-8 right-8 w-6 h-6 bg-blue-200 rotate-45 rounded-md"></div>

      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          The simplest way to bank
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-6">
          With Clover you can manage your money directly in-app and pay with
          your card no matter where you are.
        </p>

        <div className="flex justify-center gap-4">
          <img
            src={playstore}
            alt="Google Play"
            className=" w-[150px] hover:scale-105 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero2;
