"use client";

import React from "react";
import Image from "next/image";

export default function VoiceInteractionSection() {
  return (
    <div className="voice-interaction-section bg-black text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Text Content */}
        <div className="text-content">
          <h2 className="text-3xl font-bold mb-4">Authentic Voice-to-Voice Interview Simulations</h2>
          <p className="text-gray-300 leading-relaxed">
          Step into realistic interview scenarios with real-time voice interactions. Our advanced AI replicates the experience of speaking to a live interviewer, asking tailored questions in a conversational format. Practice responding verbally to build confidence, enhance communication skills, and prepare for the dynamics of real interview calls with precision and ease.
          </p>
        </div>

        {/* Right Side: Mock Interaction Example */}
        <div className="mock-interaction bg-gray-900 border border-purple-500 rounded-lg p-4 shadow-lg">
          <div className="mock-header flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Flutter Architect @ <span className="text-purple-500">Google</span></h3>
            <p className="text-sm text-purple-400">(Technical)</p>
          </div>
          <div className="mock-progress flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <div
                key={index}
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  index === 2 ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="mock-question bg-black border border-purple-500 rounded-lg p-4 mb-4">
            <p className="text-gray-300">
              Can you discuss a particularly challenging issue you solved related to state management in Flutter?
            </p>
          </div>
          <div className="mock-footer flex justify-between items-center">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">STOP</button>
            <div className="text-gray-400">
              <p className="text-sm">02:22</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-gray-700 text-white px-4 py-2 rounded-full">CC</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">↻</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
