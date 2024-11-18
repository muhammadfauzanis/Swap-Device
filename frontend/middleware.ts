import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get('auth_token');

  // cek jika user telah memiliki token tetapi akses login maka redirect ke home
  if (token) {
    if (['/login', '/register'].includes(pathname)) {
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }
  }

  if (!token) {
    if (pathname === '/user') {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/profile', '/register'],
};
