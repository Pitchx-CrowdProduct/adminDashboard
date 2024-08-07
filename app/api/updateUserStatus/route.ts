import { NextRequest, NextResponse } from 'next/server';
import users from '../../../models/user'

export async function PATCH(request: NextRequest) {
  try {
    const { email, status } = await request.json();

    if (!email || !status) {
      return NextResponse.json({ message: 'Missing email or status' }, { status: 400 });
    }

    const updatedUser = await users.findOneAndUpdate({ email }, { status }, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json({ message: 'Error updating user status' }, { status: 500 });
  }
}