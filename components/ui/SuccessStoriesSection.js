"use client";

import React from "react";

export default function SuccessStoriesSection() {
  const testimonials = [
    {
      quote:
        "Virtual Mock AI turned my interview game around! The precisely tailored mock interviews and in-depth feedback truly boosted my confidence!",
      name: "Jessica Rodriguez",
      role: "Principal Software Engineer",
      image: "user.svg", // Replace with the correct image path
    },
    {
      quote:
        "Navigating finance interviews can be challenging, but Virtual Mock AI made it seamless. The detailed feedback transformed my approach.",
      name: "Aisha Patel",
      role: "Financial Analyst",
      image: "user.svg", // Replace with the correct image path
    },
    {
      quote:
        "Effective communication is a project manager's cornerstone. Virtual Mock AI honed my skills, and I aced the interview at my dream company.",
      name: "Jordan Lewis",
      role: "Project Manager",
      image: "user.svg", // Replace with the correct image path
    },
  ];

  return (
    <div className="success-stories-section bg-black text-white py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold mb-12">Success Stories</h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial bg-gray-900 border border-purple-500 rounded-lg p-6 shadow-lg hover:shadow-xl transition"
            >
              <p className="text-gray-300 italic mb-4">“{testimonial.quote}”</p>
              <div className="flex items-center justify-center mt-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-500 mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-purple-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
