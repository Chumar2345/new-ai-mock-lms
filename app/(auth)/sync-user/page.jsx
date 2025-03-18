"use client"; // Mark this component as a Client Component

import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; // Use this instead of `next/router` in App Router
import { Users , Plan} from "@/utils/schema";
import { db } from "@/utils/db";
import { LoaderCircle } from "lucide-react";
import { desc, eq } from "drizzle-orm";

export default function RedirectHandler() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();


  useEffect(() => {
   
    if (isSignedIn && user) {
      // Save user data to your backend
      const getPlan = async () => {
        try {
          const plan = await db.select().from(Plan).where(eq(Plan.name, 'free')).limit(1); // Use limit(1) instead of first()
          return plan.length > 0 ? plan[0] : null;

        } catch (error) {
          console.error('Failed to save user data:', error);
        }
      };
      router.push('/dashboard');
      const saveUserData = async () => {
        try {
          const planDetails = await getPlan();
          
          await db.insert(Users).values({
            email: user?.primaryEmailAddress?.emailAddress, // Use the email from session metadata
            plan: 'plan_free', // Save the plan
            mockUsed: 0, // Start with 0 mocks used
            mockLimit: planDetails.limit, // Set mock limit based on the plan
            createdAt: new Date().toISOString(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // Set end date 1 month later
            paymentStatus: "Null",
          }).onConflictDoNothing(); // Avoid duplicate entries

          // Redirect to the desired page
          // router.push('/dashboard'); // Change to your target route
        } catch (error) {
          console.error('Failed to save user data:', error);
        }
      };

      saveUserData();
    }
  }, [isSignedIn, user, router]);
  
  return null;
}
