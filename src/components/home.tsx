import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const categories = [
    "happiness",
    "friendship",
    "knowledge",
    "success",
    "beauty",
    "inspirational",
    "love",
    "courage",
    "life",
    "money"
  ];
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <h1 className="font-extrabold md:text-[72px] text-[32px] md:leading-none  leading-[30px] py-10 px-12 md:px-0">
        Random Quote Generator
      </h1>

      <div className="flex flex-wrap gap-4 max-w-[1000px] w-full mx-auto justify-center items-center">
        {categories.map((category, index) => (
          <Link to={`${category}`} key={index} className="bg-white hover:text-[22px] transition-all duration-300 ease-in-out hover:text-blue-500 text-rose-500 flex items-center justify-center text-[20px] font-bold w-[150px] h-[150px] rounded-md shadow-md">
            <h1>{capitalizeFirstLetter(category)}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
