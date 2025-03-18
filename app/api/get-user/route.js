import { NextResponse } from 'next/server';
import { Users } from '@/utils/schema';
import { db } from '@/utils/db';

export async function GET(request) {
  try {
    // Fetch all users from the database
    const users = await db.select().from(Users);
    // Handle empty table gracefully
    if (!users || users.length === 0) {
      return NextResponse.json({ users: [], message: 'No users found' }, { status: 200 });
    }

    // Return fetched users
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users data:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
