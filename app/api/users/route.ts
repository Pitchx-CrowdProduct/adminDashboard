// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection('users').find({}).toArray();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Error fetching users', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const { username, email, status } = await request.json();
    
    const newUser = {
      username,
      email,
      status,
      reviewFiles: [],
      investorFiles: [],
      paymentPlanId: null,
      uploadDate: new Date()
    };
    
    const result = await db.collection('users').insertOne(newUser);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Error adding user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


export async function PATCH(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const { email, status } = await request.json();

    if (!email || !status) {
      return NextResponse.json({ message: 'Missing email or status' }, { status: 400 });
    }

    const updatedUser = await db.collection('users').findOneAndUpdate(
      { email }, 
      { $set: { status } }, 
      { returnDocument: 'after' }
    );
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json({ message: 'Error updating user status' }, { status: 500 });
  }
}