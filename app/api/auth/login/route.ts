// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ConnectDb from '../../../../lib/mongodb';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
if (!JWT_SECRET) throw new Error('JWT_SECRET not defined in .env.local');

export async function POST(req: Request) {
  try {
       
  const body = await req.json();
    const {  email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const collection = await ConnectDb();

    const user = await collection.UserSchema.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid Email' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    const res = NextResponse.json({ user: { name: user.name, email: user.email } }, { status: 200 });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return res;
  } catch (err) {
    console.error('REGISTER ERROR', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
