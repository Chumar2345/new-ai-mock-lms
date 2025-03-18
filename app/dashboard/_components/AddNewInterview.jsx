"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview, Users } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { desc, eq } from "drizzle-orm";

// Import `alertifyjs` dynamically to avoid SSR issues
let alertify;
if (typeof window !== "undefined") {
  alertify = require("alertifyjs");
  require("alertifyjs/build/css/alertify.min.css");
}

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const [InterviewList, setInterviewList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [interviewCount, setInterviewCount] = useState(0);

  useEffect(() => {
    GetUser();
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    setInterviewList(result.length);
  };

  const GetUser = async () => {
    const getUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Users.id));

    setUserList(getUser[0]);
  };

  const handleAddInterview = () => {
    GetUser();
    const endDate = new Date(UserList.endDate);
    const now = new Date();
    if (endDate >= now) {
      if (UserList.mockLimit !== 0 || UserList.plan === "plan_pro") {
        setOpenDialog(true);
      } else if (alertify) {
        alertify.success(`You have already added ${UserList.mockUsed} interviews. You cannot add more.`);
      }
    } else if (alertify) {
      alertify.success("The end date has passed. You cannot add more interviews.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      const jsonMatch = responseText.match(/\[.*?\]/s);
      if (!jsonMatch) throw new Error("No valid JSON array found in the response");

      const jsonResponsePart = jsonMatch[0];
      const mockResponse = JSON.parse(jsonResponsePart.trim());
      setJsonResponse(mockResponse);

      const jsonString = JSON.stringify(mockResponse);
      const res = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: jsonString,
          jobPosition,
          jobDesc: jobDescription,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      const userRecord = await db
        .select()
        .from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

      if (userRecord.length > 0) {
        await db
          .update(Users)
          .set({
            mockUsed: userRecord[0].mockUsed + 1,
            mockLimit: userRecord[0].mockLimit !== null ? userRecord[0].mockLimit - 1 : null,
          })
          .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
      }

      setLoading(false);
      router.push(`dashboard/interview/${res[0]?.mockId}`);
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="p-10 border rounded-lg bg-black text-white hover:bg-purple-700 hover:text-white hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={handleAddInterview}
      >
        <h1 className="font-bold text-lg text-center">+ Add New</h1>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-black text-white">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-purple-400">
              Tell us more about your job Interviewing
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div className="mt-7 my-3">
                <label className="text-purple-400">Job Role/Job Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  className="bg-gray-800 text-white border-purple-400 focus:ring-purple-500"
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label className="text-purple-400">Job Description/Tech Stack (In short)</label>
                <Textarea
                  placeholder="Ex. React, Angular, NodeJs, MySql etc"
                  required
                  className="bg-gray-800 text-white border-purple-400 focus:ring-purple-500"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label className="text-purple-400">Years of Experience</label>
                <Input
                  placeholder="Ex. 5"
                  type="number"
                  min="1"
                  max="70"
                  required
                  className="bg-gray-800 text-white border-purple-400 focus:ring-purple-500"
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
              <div className="flex gap-5 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-purple-400 hover:bg-gray-700"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-500 text-white hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Generating from AI
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewInterview;
