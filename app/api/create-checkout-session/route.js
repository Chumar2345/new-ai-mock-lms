import Stripe from 'stripe';
import { Plan } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc, eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { planId, email } = await request.json();

    if (!planId || !email) {
      return new Response(
        JSON.stringify({ error: 'planId and email are required' }),
        { status: 400 }
      );
    }

    // Fetch the plan by ID
    const getPlanById = async (id) => {
      const plan = await db
        .select()
        .from(Plan)
        .where(eq(Plan.id, id))
        .limit(1);
      return plan[0];
    };

    const plan = await getPlanById(planId);

    if (!plan) {
      return new Response(JSON.stringify({ error: 'Plan not found' }), { status: 404 });
    }

    const priceInCents = plan.price * 100; // Convert to cents
    const planName = plan.name;
    const planLimit = plan.limit;

    if (!priceInCents || isNaN(priceInCents) || priceInCents <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid plan price' }),
        { status: 400 }
      );
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        email,
        plan: planName,
        limit: planLimit,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success/`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel/`,
    });

    return new Response(
      JSON.stringify({ id: session.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
