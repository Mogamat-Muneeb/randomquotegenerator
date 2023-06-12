import React from "react";

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
  return (
    <div className="flex flex-col w-full max-w-[500px] mx-auto">
      <h1 className="font-bold text-[20px] leading-[30px]">"{quote}"</h1>
      <p className="font-normal text-[14px] flex items-center text-gray-400">-{author}</p>
    </div>
  );
};

export default Quote;
