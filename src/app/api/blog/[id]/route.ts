import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog";
import connect from "@/config/database";

connect();

export async function GET(request:NextRequest, { params }:any) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({success: false,message: 'Blog ID is required'},{ status: 400 });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blog not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error:any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching the blog',
        error: error.message
      },
      { status: 500 }
    );
  }
}
