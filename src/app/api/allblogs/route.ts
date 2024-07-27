import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog";
import connect from "@/config/database";

connect();

export async function GET(request: NextRequest) {
  try {
    const blogs = await Blog.find({});
    console.log(blogs)
    return NextResponse.json(blogs)
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({
      success:false,
      message: 'An error occurred while fetching blogs',
      error: error.message
    })
  }
}