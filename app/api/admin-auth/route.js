import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { db } from '@/utils/db'; // Correct relative path to your database connection
import { Admin } from '@/utils/schema'; // Assuming you have a Users model
import { desc, eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function POST(request) {

  try {
    // Parse the incoming JSON body
    const { email, password } = await request.json();

    // Fetch the admin user from the Users model
    const admin = await db
      .select()
      .from(Admin)
      .where(eq(Admin.email,email))
      .limit(1);

    if (admin.length > 0) {
      const adminUser = admin[0];

      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, adminUser.password);

      if (isPasswordValid) {
        const token = jwt.sign({ email: adminUser.email, role: 'admin' }, JWT_SECRET, {
          expiresIn: '1h',
        });

        // Return a successful response with the token
        return NextResponse.json({ token }, { status: 200 });
      }
    }

    // Return 401 for invalid credentials
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
