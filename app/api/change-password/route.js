import { db } from '@/utils/db'; // Database connection
import { Admin } from '@/utils/schema'; // Assuming you have a Users model
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST(request) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

  const { email, currentPassword, newPassword } = await request.json();

  try {
    // Fetch the admin user
    const result = await db
      .select()
      .from(Admin)
      .where(eq(Admin.email, email))
      .limit(1);
    const admin = result[0]; // Extract the first result from the array

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Ensure the password field exists
    if (!admin.password) {
      return NextResponse.json({ error: 'Admin password is not set in the database' }, { status: 400 });
    }

    // Check current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid current password' }, { status: 401 });

    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await db
      .update(Admin)
      .set({ password: hashedPassword })
      .where(eq(Admin.email, email));

      return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });

  }
}
