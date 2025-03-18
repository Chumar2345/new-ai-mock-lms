"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">
        Start Your Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video or Audio Recording Section */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interViewData}
        />
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-6 mt-10">
        {activeQuestionIndex > 0 && (
          <Button
            className="bg-gray-700 text-white hover:bg-gray-800 transition duration-300"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 transition duration-300"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interViewData?.mockId}/feedback`}>
            <Button className="bg-green-600 text-white hover:bg-green-700 transition duration-300">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
