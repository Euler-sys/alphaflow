// import React from "react";
import img1 from "../assets/her3.jpg";
import img2 from "../assets/her2.jpg";
import img3 from "../assets/her4.jpg";
import img4 from "../assets/her5.jpg";
import img5 from "../assets/her6.jpg";

const articles = [
  {
    title: "Telethon 2024",
    description: "8.800.000 volte GRAZIE",
    image: img1,
  },
  {
    title: "Progetto IncluCity",
    description: "Quando l'inclusione diventa reale. Per un futuro da costruire insieme.",
    image: img2,
  },
  {
    title: "BNL BNP PARIBAS sponsor di RENDEZ-VOUS",
    description: "Festival del Nuovo Cinema Francese",
    image: img3,
  },
  {
    title: "Apex Financier Bank",
    description: "Located in Italy — Dona ora",
    image: img4,
  },
  {
    title: "Servizio Clienti Sordi BNL Direct",
    description: "Scopri il servizio di consulenza in LIS",
    image: img5,
  },
];

const BlogSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
      {/* Featured Article */}
      <div className="md:col-span-2 relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={articles[0].image}
          alt={articles[0].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-6 w-full">
          <h2 className="text-2xl font-bold">{articles[0].title}</h2>
          <p className="mt-2">{articles[0].description}</p>
        </div>
      </div>
      {/* Smaller Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-1">
        {articles.slice(1).map((article, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm mt-1">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
