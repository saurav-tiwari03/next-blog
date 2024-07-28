import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

type User = {
  id: string;
  role: 'admin' | 'user';
  email: string;
  name: string;
}

export function auth(req:NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  console.log(token);
  if(!token) {
    return NextResponse.redirect('/login');
  }

  try {
    const user = jwt.verify(token,process.env.JWT_SECRET!) as User;
    console.log(user);
    if(user.role !== 'admin') {
      return NextResponse.redirect('/unauthorized');
    }
    return NextResponse.next();
  } catch (error:any) {
    console.error(error);
    return NextResponse.redirect('/login');
  }
}