"use client";

import { useEffect } from "react";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

export default function Help() {
  useEffect(() => {
    // Add Crisp chat script with the new website ID
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "396f2039-3b27-46c8-8505-88dcb63ce2e9"; // New Crisp Website ID
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.head.removeChild(script);
      delete window.$crisp;
      delete window.CRISP_WEBSITE_ID;
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-4">
          Need Help? 🤖
        </h1>
        <p className="text-white text-center text-lg max-w-2xl">
          Welcome to VirtualMock AI-Interview Help Center! If you have any
          questions about our AI mock interview platform or need assistance, feel
          free to use the chat widget in the bottom-right corner of your screen.
          Our chatbot is here to assist you with all your queries.
        </p>
        <div className="mt-8">
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-md shadow hover:bg-purple-700"
            onClick={() => {
              if (window.$crisp) {
                window.$crisp.push(["do", "chat:open"]);
              }
            }}
          >
            Open Chatbot
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
