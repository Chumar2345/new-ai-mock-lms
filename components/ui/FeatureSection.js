"use client";

import React from "react";

export default function FeatureSection() {
  const features = [
    {
      icon: "🧠", // Replace with actual icons/images if needed
      title: "AI-Powered Mock Interviews",
      description:
        "Harness the power of AI to experience realistic mock interviews tailored to different roles and industries. Prepare confidently with dynamic simulations designed to reflect authentic interview scenarios.",
    },
    {
      icon: "📞", // Replace with actual icons/images if needed
      title: "Engaging Voice-Based Interviews",
      description:
        "Have real-time conversations with our AI for an authentic interview experience. Simulate face-to-face interactions that capture the complexities and nuances of real-world interviews.",
    },
    {
      icon: "✍️", // Replace with actual icons/images if needed
      title: "Tailored Feedback for Growth",
      description:
        "Get in-depth feedback on your responses, communication style, and accuracy. Our AI identifies your strengths and highlights areas for improvement, offering actionable insights to elevate your interview performance.",
    },
    {
      icon: "📍", // Replace with actual icons/images if needed
      title: "Flexible Interview Practice",
      description:
        "Fit interview preparation into your routine effortlessly. Access our platform anytime, from any device, and refine your skills at a pace that works best for you.",
    },
    {
      icon: "🏛️", // Replace with actual icons/images if needed
      title: "Customized for Every Industry and Role",
      description:
        "No matter your field—finance, tech, healthcare, or beyond—our AI adapts to create tailored interview experiences specific to your target industry, job title, and seniority level.",
    },
    {
      icon: "🔊", // Replace with actual icons/images if needed
      title: "Review and Refine Your Responses",
      description:
        "Listen to recordings of your answers to pinpoint areas for improvement. Enhance your communication skills by adding structure, clarity, and fluency to your responses.",
    },
  ];

  return (
    <div className="feature-section bg-black text-white py-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-item text-center p-6 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            {/* Icon */}
            <div className="icon text-5xl mb-4">{feature.icon}</div>
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
