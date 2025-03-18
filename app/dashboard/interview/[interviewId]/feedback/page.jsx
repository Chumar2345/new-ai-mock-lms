"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { sql, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    const totalRate = await db
      .select({
        newTotalRating: sql`SUM(CAST(${UserAnswer.rating} AS NUMERIC))`,
      })
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId));

    const maxScorePerAnswer = 10; // Assume ratings are out of 10.
    setTotalScore(maxScorePerAnswer);

    const overallRating =
      (totalRate[0].newTotalRating / (result.length * maxScorePerAnswer)) * 10;
    setFeedbackList(result);
    setTotalRating(overallRating);
  };

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold text-purple-400">Congratulations!</h2>
      <h2 className="font-bold text-2xl text-white">
        Here is your interview feedback
      </h2>
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-lg text-purple-300">
          No interview Feedback
        </h2>
      ) : (
        <>
          <h2 className="text-purple-300 text-lg my-2">
            Your overall interview rating:{" "}
            <strong>
              {totalRating}/{totalScore}
            </strong>
          </h2>
          <h2 className="text-sm text-gray-400">
            Find below interview questions with correct answers, your answer,
            and feedback for improvements for your next interview
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 flex justify-between bg-gray-800 rounded-lg my-2 text-left gap-7 w-full text-white">
                  {item.question} <ChevronsUpDown className="h-4 text-purple-400" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-purple-400 p-2 border rounded-lg bg-gray-900">
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-gray-800 text-sm text-gray-300">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-900 text-sm text-green-400">
                      <strong>Correct Answer Looks Like: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-900 text-sm text-blue-400">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button
        className="mt-5 bg-purple-500 text-white hover:bg-purple-700 transition-all"
        onClick={() => router.replace("/dashboard")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
