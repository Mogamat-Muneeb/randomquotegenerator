import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "./Quote";
import { IoIosRefresh } from "react-icons/io";
import { BsFillShareFill } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTwitterSquare } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

import { Modal } from "./components/modal";
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
      // Fallback option: create a temporary textarea to copy the text
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
          <div className="flex flex-col items-center justify-center py-5 px-2 h-[200px] w-[300px] gap-3 rounded-md bg-white">
            <button onClick={shareBtn}>close</button>

            <TwitterShareButton
              url={shareUrl}
              title={quoteData?.quote}
              className="bg-rose-500 w-[150px] h-[40px] rounded-md shadow-md flex justify-center items-center "
            >
            <svg viewBox="0 0 24 24" aria-hidden="true"  width="39" height="39"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
            </TwitterShareButton>

            <FacebookShareButton
              url={shareUrl}
              quote={quoteData?.quote}
              className="bg-rose-500 w-[150px] h-[40px] rounded-md shadow-md flex justify-center items-center "
            >
              <BsFacebook className="bg-green-500 text-[30px]" />
            </FacebookShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={quoteData?.quote}
              className="bg-rose-500 w-[150px] h-[40px] rounded-md shadow-md flex justify-center items-center "
            >
         <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39"><path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path><path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path></svg>
            </WhatsappShareButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
