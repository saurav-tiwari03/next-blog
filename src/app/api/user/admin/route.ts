import { auth } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    auth(req);
    return NextResponse.json({message:"Admin check successful"})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"You are not admin"})
  }
}