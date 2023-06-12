import React from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
  console.log("🚀 ~ file: Quote.tsx:9 ~ quote:", quote);
  console.log("🚀 ~ file: Quote.tsx:9 ~ author:", author);
  const shareUrl = "https://example.com"; // Replace with your own URL

  const handleCopyClick = async () => {
    const textToCopy = `${quote} - ${author}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert("Quote and author copied to clipboard!");
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
    <div className="flex flex-col">
      <h1>{quote}</h1>
      <p>-{author}</p>
      <TwitterShareButton url={shareUrl} title={quote}>
        Share on Twitter
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl} quote={quote}>
        Share on Facebook
      </FacebookShareButton>
      <WhatsappShareButton url={shareUrl} title={quote}>
        Share on WhatsApp
      </WhatsappShareButton>
      <button onClick={handleCopyClick}>Copy</button>
    </div>
  );
};

export default Quote;
