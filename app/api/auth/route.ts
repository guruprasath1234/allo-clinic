import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Mock user data (in real app, this would come from database)
const users = [
  {
    id: 1,
    email: 'admin@clinic.com',
    password: 'admin123', // In real app, this would be hashed
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'receptionist@clinic.com',
    password: 'reception123',
    role: 'receptionist',
    name: 'Reception Staff'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json();

    if (action === 'login') {
      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    return NextResponse.json({
      success: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
}