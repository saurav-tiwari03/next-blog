import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  console.log('middleware executed');
  const cookieData = cookies();
  const token = cookieData.get('auth-token');
  const tokenData = jwt.decode(token?.value!);
  console.log('Role : ' + tokenData?.role);

  if (tokenData?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard/create', request.url));
  } else {
    // Redirect to /home with a query parameter
    const url = new URL('/home', request.url);
    url.searchParams.set('notAdmin', 'true');
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
