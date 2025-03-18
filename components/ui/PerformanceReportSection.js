import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function PerformanceReportSection() {
  const chartData = {
    labels: ["Technical Knowledge", "Problem Solving", "Communication", "System Design"],
    datasets: [
      {
        label: "Skill Level",
        data: [7, 6, 6, 5],
        backgroundColor: ["#4A3F35", "#283B38", "#122A45", "#24173D"],
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#FFFFFF" } },
      y: { grid: { color: "#333" }, ticks: { color: "#FFFFFF", beginAtZero: true, stepSize: 1 } },
    },
  };

  return (
    <div className="mock-interview-section bg-black text-white py-16">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Chart Section */}
    <div className="mock-interview-table  border border-purple-500 rounded-lg p-4 shadow-lg" style={{ width: "100%", height: "250px" }}>
      <div className="interview-item flex justify-between items-center border-b border-gray-700 py-4" style={{ width: "100%", height: "auto" }}>
        <Bar 
          data={chartData} 
          options={{
            ...chartOptions,
            maintainAspectRatio: false,
            responsive: true, // Ensures chart adjusts to container size
          }} 
        />
      </div>
    </div>


      {/* Text Section */}
      <div className="description">
        <h2 className="text-3xl font-bold mb-4">
          Advanced Interview Skills Evaluation
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Unlock in-depth evaluations of key interview skills specific to your interview and job industry like
          Communication, Problem-Solving, Technical expertise, System Design, etc. Our AI delivers precise skill
          scores to help you excel in every interview.
        </p>
      </div>
    </div>
    </div>
  );
}
