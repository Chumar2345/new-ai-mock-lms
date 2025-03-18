'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@clerk/nextjs'; // Import useUser from Clerk
import { Plan } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc } from 'drizzle-orm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const UpgradePage = () => {
  const { user, isLoaded, isSignedIn } = useUser(); // Use Clerk's useUser hook
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([]);
  const [billingCycle, setBillingCycle] = useState('Monthly'); // Add billing cycle toggle

  useEffect(() => {
    GetPlan();
  }, []);

  // Fetch Plans from the database
  const GetPlan = async () => {
    const getPlans = await db
      .select()
      .from(Plan)
      .orderBy(desc(Plan.id)); // Fetch plans in descending order by ID
      const sortedPlans = getPlans.sort((a, b) => {
        if (a.price === '0' || a.name.toLowerCase() === 'free') return -1;
        if (b.price === '0' || b.name.toLowerCase() === 'free') return 1;
        return 0;
      });
      setItems(sortedPlans); // Set the fetched items
  };

  // If the user is signed in, set the email
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setEmail(user?.primaryEmailAddress?.emailAddress); // Get the email from the Clerk user object
    }
  }, [isLoaded, isSignedIn, user]);

  const handleCheckout = async (planId) => {
    if (!email) {
      console.error('No user is logged in yet.');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({ planId, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { id } = await response.json();
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: id });
      if (result.error) {
        console.error('Stripe Checkout error:', result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  // if (!isLoaded) {
  //   return <div className="text-white bg-black min-h-screen flex items-center justify-center">Loading...</div>; // Show loading state while Clerk user data is loading
  // }

  if (!isSignedIn) {
    return <div className="text-white bg-black min-h-screen flex items-center justify-center">Please sign in to access the plans.</div>; // If user is not signed in
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-center text-purple-500 mb-6 mt-6">Upgrade Your Plan</h1>
      <p className="text-center text-gray-400 mb-12">
        Choose a plan that suits your needs and unlock additional features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {items.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg p-6 shadow-lg text-center ${
              plan.name === 'Pro Plan'
                ? 'border-green-500 shadow-green-500/50 bg-gradient-to-b from-black to-gray-900'
                : 'border-gray-700 bg-gradient-to-b from-gray-900 to-black'
            } hover:shadow-purple-500/50 transition-shadow duration-300`}
          >
            {plan.name === 'Pro Plan' && (
              <div className="text-sm bg-green-600 text-white py-1 px-3 rounded-full mb-4 inline-block">
                MOST POPULAR
              </div>
            )}
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">{plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}</h2>
            <p className="text-3xl font-bold text-purple-400 mb-6">
              ${plan.price} {billingCycle === 'Monthly' ? '/month' : '/week'}
            </p>
            {(plan.price === '0' || plan.name === 'free') ? (
              <ul className="mb-6 space-y-3 text-left">
                <li className="text-gray-300">✓ For curious folks</li>
                <li className="text-gray-300">✓ {plan.limit} interview per month</li>
                <li className="text-gray-300">✓ 5 questions per interview</li>
                <li className="text-gray-300">✓ 1.5 limit per answer</li>
                <li className="text-red-500">✗ No Answer audio playback</li>
                <li className="text-red-500">✗ No Interview Type selection</li>
                <li className="text-red-500">✗ No Interview Top-ups</li>
                <li className="text-gray-300">✓ Enter/paste job descriptions for tailored questions</li>
                <li className="text-gray-300">✓ Overall performance feedback and score</li>
                <li className="text-gray-300">✓ Advanced Individual Skills Assessment per interview</li>
                <li className="text-gray-300">✓ In-depth AI-generated feedback on every answer</li>
                <li className="text-gray-300">✓ AI-generated Best Answer Recommendation for every question</li>
                <li className="text-gray-300">✓ No Credit Card required</li>
              </ul>
            ) : (
              <ul className="mb-6 space-y-3 text-left">
                <li className="text-gray-300">✓ For serious job seekers</li>
                <li className="text-gray-300">✓ {plan.limit} interviews per month</li>
                <li className="text-gray-300">✓ 5 questions per interview</li>
                <li className="text-gray-300">✓ 2.5 minutes limit per answer</li>
                <li className="text-gray-300">✓ Answer audio playback</li>
                <li className="text-gray-300">✓ Interview Type selection</li>
                <li className="text-gray-300">✓ Interview Top-ups available</li>
                <li className="text-gray-300">✓ Enter/paste job descriptions for tailored questions</li>
                <li className="text-gray-300">✓ Overall performance feedback and score</li>
                <li className="text-gray-300">✓ Advanced Individual Skills Assessment per interview</li>
                <li className="text-gray-300">✓ In-depth AI-generated feedback on every answer</li>
                <li className="text-gray-300">✓ AI-generated Best Answer Recommendation for every question</li>
                <li className="text-gray-300">✓ Cancel at any time</li>
              </ul>
            )}
            {(plan.price === '0' || plan.name === 'free') ? (
              <button
                className="bg-gray-500 text-gray-300 py-2 px-6 rounded-full cursor-not-allowed"
                disabled
              >
                Free Plan
              </button>
            ) : (
              <button
                className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
                onClick={() => handleCheckout(plan.id)}
              >
                Buy {plan.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePage;
