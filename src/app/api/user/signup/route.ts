import connect from '@/config/database';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json(); 
    const { name, email, role, password } = reqData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, role, password: hashedPassword });

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || '', { expiresIn: '1d' });

    const response = NextResponse.json({
      success: true,
      message: 'User created successfully',
      token: token,
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day in seconds
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Your GET logic here
  } catch (error) {
    // Error handling here
  }
}
