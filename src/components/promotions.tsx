// promotions.tsx
import img1 from "../assets/pos.jpg";
import img2 from "../assets/pos2.jpg";
import img3 from "../assets/pos3.jpg";

const promotions = [
  {
    title: "Cell Phone Protection",
    description:
      "With Apex Financier Bank (Italy)’s Central Plus Checking, receive up to $800 if your phone is stolen or damaged.",
    buttonText: "LEARN MORE",
    imageUrl: img1,
  },
  {
    title: "Enroll in My Credit Today",
    description:
      "Check your credit score anytime, anywhere with Apex Financier Bank (Italy)’s FREE mobile and online banking tool.",
    buttonText: "LEARN MORE",
    imageUrl: img2,
  },
  {
    title: "MoneyEdu Financial Wellness",
    description:
      "Take control of your student loans — enroll in Apex Financier Bank (Italy)’s FREE Managing Student Loans course!",
    buttonText: "TAKE THE COURSE",
    imageUrl: img3,
  },
];

const Promotions = () => {
  return (
    <section className="bg-white py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {promotions.map((promo, idx) => (
          <div
            key={idx}
            className="border rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={promo.imageUrl}
              alt={promo.title}
              className="w-full h-64 object-cover"
            />
            <div className="bg-blue-50 p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                {promo.title}
              </h3>
              <p className="text-blue-800 mb-4">{promo.description}</p>
              <button className="text-blue-800 font-semibold flex items-center gap-1 hover:underline">
                {promo.buttonText} <span>&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
