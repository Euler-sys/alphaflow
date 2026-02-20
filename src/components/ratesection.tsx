import womanImage from "../assets/Homepage-Rate-Cards.webp"; // Replace with actual path

const rates = [
  {
    title: "VISA",
    rateType: "VARIABLE APR",
    rateValue: "11.99%",
    subLabel: "AS LOW AS",
    footer: "LEARN MORE",
    icon: "💳", // Replace with actual icon or component
  },
  {
    title: "AUTO",
    rateType: "APR",
    rateValue: "5.69%",
    subLabel: "AS LOW AS",
    footer: "LEARN MORE",
    icon: "🚗",
  },
  {
    title: "PERSONAL PROMO CDS",
    rateType: "APY",
    rateValue: "4.30%",
    subLabel: "AS HIGH AS",
    footer: "LEARN MORE",
    icon: "💼",
  },
  {
    title: "HIGH YIELD ONLINE SAVINGS",
    rateType: "APY",
    rateValue: "3.55%",
    subLabel: "AS HIGH AS",
    footer: "LEARN MORE",
    icon: "💰",
  },
];

export default function RatesSection() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Left image */}
        <div className="flex-1">
          <img
            src={womanImage}
            alt="Woman using credit card"
            className="rounded-xl object-cover w-full"
          />
        </div>

        {/* Right grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rates.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border shadow-sm hover:shadow-md transition duration-300 ${
                idx === 0
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-800"
              } hover:border-blue-600 hover:text-blue-800 cursor-pointer`}
            >
              <div className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span>{item.icon}</span> <span>{item.title}</span>
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-300">
                {item.subLabel}
              </div>
              <div className="text-4xl font-bold my-2">{item.rateValue}</div>
              <div className="text-sm uppercase mb-4">{item.rateType}</div>
              <button className="text-sm font-bold hover:underline flex items-center gap-1">
                {item.footer} <span>&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-sm text-center text-gray-600 mt-10">
        <div className="flex justify-center items-center gap-2 text-blue-800 font-semibold">
          <span>🕒</span> RATES UPDATED DAILY
        </div>
        <p className="mt-1 text-gray-500 text-xs">
          APR = Annual Percentage Rate &nbsp;&nbsp;&nbsp; APY = Annual
          Percentage Yield
        </p>
      </div>
    </section>
  );
}
