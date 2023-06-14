import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "./Quote";
import { IoIosRefresh } from "react-icons/io";
import { BsFillShareFill } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

import { Modal } from "./components/modal";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "./components/Icons";
interface QuoteData {
  quote: string;
  author: string;
}

const App: React.FC = () => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  console.log("🚀 ~ file: App.tsx:110 ~ quoteData:", quoteData);
  const shareUrl = "https://example.com"; // Replace with your own URL
  const [showModal, setShowModal] = useState(false);

  const shareBtn = () => {
    setShowModal(!showModal);
  };

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

  const handleCopyClick = async () => {
    const textToCopy = `${quoteData?.quote} - ${quoteData?.author}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast("Quote and author copied to clipboard!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // !Fallback option: create a temporary textarea to copy the text
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = textToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);
      alert("Quote and author copied to clipboard!");
    }
  };
  return (
    <div className="max-w-[1220px] mx-auto w-full flex flex-col justify-center items-center h-full  px-4 md:px-0">
      <h1 className="font-extrabold md:text-[72px] text-[32px] md:leading-none  leading-[30px] py-10">
        Random Quote Generator
      </h1>
      {quoteData ? (
        <Quote quote={quoteData.quote} author={quoteData.author} />
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex items-center justify-center gap-3 py-10">
        <button
          onClick={handleNewQuote}
          className="p-5 bg-white rounded-md shadow-md"
        >
          <IoIosRefresh className="font-[800] text-[20px]" />
        </button>
        <button
          onClick={handleCopyClick}
          className="p-5 bg-white rounded-md shadow-md"
        >
          <MdOutlineContentCopy />
        </button>
        <button
          onClick={shareBtn}
          className="p-5 bg-white rounded-md shadow-md"
        >
          <BsFillShareFill />
        </button>
      </div>
      {showModal && (
        <Modal title="name" toggleClick={shareBtn}>
          <div className="flex flex-col  items-center justify-center py-5 px-2 h-[100px] w-[250px] gap-3 rounded-md bg-white">
            <div className="flex w-full justify-end items-end">
              <button onClick={shareBtn}>
                <RxCross2 className="text-[20px] " />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TwitterShareButton
                url={shareUrl}
                title={quoteData?.quote}
                className=" flex justify-center items-center "
              >
                <TwitterIcon />
              </TwitterShareButton>

              <FacebookShareButton
                url={shareUrl}
                quote={quoteData?.quote}
                className=" flex justify-center items-center "
              >
                <FacebookIcon />
              </FacebookShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title={quoteData?.quote}
                className=" flex justify-center items-center "
              >
                <WhatsappIcon />
              </WhatsappShareButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
