export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConnectDb from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const collection = await ConnectDb();

    const existing = await collection.UserSchema.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await collection.UserSchema.insertOne({ name, email, password: hashed });

    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");

  const token = jwt.sign({ id: user.insertedId, email }, JWT_SECRET, { expiresIn: "7d" });

    const res = NextResponse.json(
      { user: { name: name, email: email } },
      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    console.error("REGISTER ERROR:", err.message || err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },  
      { status: 500 }
    );
  }
}