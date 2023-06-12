import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "./Quote";

interface QuoteData {
  quote: string;
  author: string;
}

const App: React.FC = () => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  console.log("🚀 ~ file: App.tsx:110 ~ quoteData:", quoteData);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const category = "happiness";
      const apiKey = "wJ5MC4koNhQ4CKKbFDg+Rg==MD2XxpRsx4oOdLoC"; 
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=${category}`,
        {
          headers: { "X-Api-Key": apiKey },
          /* @ts-ignore */
          contentType: "application/json",
        }
      );
      console.log(
        "🚀 ~ file: App.tsx:128 ~ fetchQuote ~ response:",
        response.data
      );
      const { quote, author } = response.data[0];
      setQuoteData({ quote, author });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div className="max-w-[1220px] mx-auto w-full">
      <h1>Random Quote Generator</h1>
      {quoteData ? (
        <Quote quote={quoteData.quote} author={quoteData.author} />
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleNewQuote}>New Quote</button>
    </div>
  );
};

export default App;
