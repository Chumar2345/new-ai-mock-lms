import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h2 className="font-bold text-3xl text-purple-400 mb-2">Dashboard</h2>
      <h2 className="text-gray-400">
        Create and Start Your AI Mock Interview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      {/* previous interview questions */}
      <InterviewList />
    </div>
  );
};

export default Dashboard;
