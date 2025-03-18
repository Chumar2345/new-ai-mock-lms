"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"; // Import your collapsible components
import { ChevronsDown } from "lucide-react"; // Icon for dropdown

const FAQSection = () => {
  const faqs = [
    { question: "What is Virtual Mock AI?", answer: "Virtual Mock AI is an advanced AI-powered platform that offers personalized voice-to-voice mock interviews for various industries and roles. It helps job seekers practice and improve their interview skills to boost their confidence and increase their chances of landing their dream job." },
    { question: "Can I practice interviews for any job in any industry?", answer: "Yes, Virtual Mock AI allows you to practice interviews for any job in any industry. The platform is designed to be versatile and adaptable, making it suitable for a wide range of roles and sectors." },
    { question: "Can I practice for any interview round with Virtual Mock AI?", answer: "You can practice various types of interview rounds, including HR, Behavioral, Technical, and Leadership interviews. The platform is designed to cater to different industries and roles, offering a comprehensive preparation experience." },
    { question: "How many mock interviews can I take?", answer: "With our free plan, you can access up to 5 job interviews and enjoy unlimited retakes for those interviews. By upgrading to our Pro plan, you'll unlock unlimited access to job interviews, giving you the flexibility to practice as much as you want." },
    { question: "What kind of feedback do I receive after an interview?", answer: "After each mock interview, Virtual Mock AI provides detailed feedback, including scores and recommendations for improvement. This feedback helps you understand your strengths and areas for improvement, allowing you to better prepare for future interviews." },
    { question: "How does Virtual Mock AI ensure the relevance of interview questions?", answer: "The AI adapts the interview questions based on the job description you provide. This ensures that the questions are tailored to the specific role you are preparing for, making the practice sessions more relevant and effective." },
    { question: "Does Virtual Mock AI store my voice?", answer: "Yes, our virtual mock ai application will record your voice during the session. It will analyze your responses and provide detailed feedback based on your tone, clarity, and how well your answers align with the questions. This helps you refine your communication skills and improve the relevance and effectiveness of your answers." },
    { question: "Can I cancel my subscription at any time?", answer: "Yes, you can cancel your subscription at any time. Once you cancel, you will continue to have access to your paid plan until the end of your current billing cycle." },
    { question: "How can I contact customer support?", answer: "If you have any questions or need assistance, you can contact our customer support team through the contact form on our website or by emailing info@virtualmock.com. We are here to help!" },
  ];

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Collapsible key={index} className="border-b border-purple-500">
            <CollapsibleTrigger className="flex justify-between items-center p-4 bg-gray-900 hover:bg-gray-800 rounded-md cursor-pointer">
              <span className="text-lg font-medium">{faq.question}</span>
              <ChevronsDown className="text-purple-400" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 text-gray-300 bg-gray-800 rounded-md">
              {faq.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
