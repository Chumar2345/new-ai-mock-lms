"use client";
import { db } from "@/utils/db";
import { MockInterview, Users } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  const [UserList, setUserList] = useState(null); // Start with null instead of an empty object

  useEffect(() => {
    if (user) {
      GetInterviewList();
      GetUser();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    
    setInterviewList(result);
  };

  const GetUser = async () => {
    const getUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Users.id));

    setUserList(getUser[0] || null); // Safely handle when there's no user data
  };

  return (
    <div className="bg-black text-white p-5 rounded-lg shadow-lg">
      {UserList && UserList.mockLimit == 0 && ( // Check if UserList is available before accessing mockLimit
        <h2 className="text-gray-400 mb-5">
          Free limit reached,{" "}
          <a href="dashboard/upgrade" className="text-purple-400 hover:text-purple-500 underline">
            upgrade to continue.
          </a>
        </h2>
      )}
      <h2 className="font-medium text-2xl text-purple-400 mb-3">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {InterviewList && InterviewList.map((interview, index) => (
          <InterviewItemCard interview={interview} key={index} />
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
