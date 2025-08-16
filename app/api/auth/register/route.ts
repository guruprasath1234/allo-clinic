import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET not defined in .env.local');
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    const res = NextResponse.json(
      { user: { name: user.name, email: user.email } },
      { status: 201 }
    );

    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  }catch (err) {
  console.error('REGISTER ERROR:', err); // logs to Next.js server console
  return NextResponse.json(
    { error: err instanceof Error ? err.message : 'Internal server error' },
    { status: 500 }
  );
}
}