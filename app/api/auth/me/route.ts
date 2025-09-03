// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
if (!JWT_SECRET) throw new Error('JWT_SECRET not defined');

export async function GET() {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!payload?.id) return NextResponse.json({ user: null }, { status: 200 });

    await dbConnect();
    const user = await User.findById(payload.id).select('-password');
    if (!user) return NextResponse.json({ user: null }, { status: 200 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error('ME ERROR', err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
