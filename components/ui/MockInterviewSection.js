"use client";

import React from "react";

export default function MockInterviewSection() {
  const mockInterviews = [
    {
      title: "Restaurant Manager",
      company: "Joey",
      type: "Technical",
      time: "4:02 pm, Feb 13",
    },
    {
      title: "Project Manager",
      company: "Google",
      type: "Technical",
      time: "12:05 am, Feb 13",
    },
    {
      title: "React Developer 2",
      company: "Business Sherpa Group",
      type: "Technical",
      time: "10:46 pm, Feb 12",
    },
  ];

  return (
    <div className="mock-interview-section bg-black text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Mock Interview Table */}
        <div className="mock-interview-table bg-gray-900 border border-purple-500 rounded-lg p-4 shadow-lg">
          {mockInterviews.map((interview, index) => (
            <div
              key={index}
              className="interview-item flex justify-between items-center border-b border-gray-700 py-4"
            >
              <div>
                <h3 className="text-lg font-bold">{interview.title}</h3>
                <p className="text-sm text-yellow-400">{interview.company}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-400">{interview.type}</p>
                <p className="text-xs text-gray-400">{interview.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Description */}
        <div className="description">
          <h2 className="text-3xl font-bold mb-4">Effortless Interview Preparation</h2>
          <h3 className="text-xl font-semibold mb-4">
            Customize Mock Interviews for any Job Industry
          </h3>
          <p className="text-gray-300 leading-relaxed">
          Master your interview journey with our cutting-edge Mock Interviewer AI. Tailor mock interviews to any industry by specifying your job title, pasting the job description, and selecting the interview type—Behavioral, Technical, Leadership, or HR. Prepare confidently with highly specific questions aligned to your role, ensuring a focused and effective interview practice session.
          </p>
        </div>
      </div>
    </div>
  );
}
