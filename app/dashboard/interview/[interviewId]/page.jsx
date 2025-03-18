"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className=" bg-black text-white min-h-screen">
      <h2 className="font-bold text-3xl text-purple-400">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {/* Job Details Section */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-5 rounded-lg border border-gray-700 bg-gray-900 gap-5">
            <h2 className="text-lg text-gray-300">
              <strong className="text-purple-400">Job Role/Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg text-gray-300">
              <strong className="text-purple-400">Job Description/Tech Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg text-gray-300">
              <strong className="text-purple-400">Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-400 bg-yellow-900">
            <h2 className="flex gap-2 items-center text-yellow-300">
              <Lightbulb />
              <span>Information</span>
            </h2>
            <h2 className="mt-3 text-yellow-300">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        {/* Webcam Section */}
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
                borderRadius: "10px",
                backgroundColor: "#1a202c",
              }}
            />
          ) : (
            <>
              <div className="h-72 my-7 border rounded-lg w-full p-20 bg-gray-800 flex items-center justify-center">
                <WebcamIcon className="h-12 w-12 text-purple-400" />
              </div>
              <Button
                className="w-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-end items-end mt-10">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="bg-purple-600 text-white hover:bg-purple-700 transition duration-300">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
