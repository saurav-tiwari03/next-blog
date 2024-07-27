import connect from '@/config/database';
import Blog from '@/models/blog';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json(); 
    const {title,description,tags} = reqData
    const blog = await Blog.create({title, description, tags})
    return NextResponse.json(
      {
        success: true,
        message: 'Blog created successfully',
        data:blog
      }
    );
  } catch (error) {
    console.log(error);
  }
}
