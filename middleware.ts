import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin and /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin' && pathname !== '/admin/login') {
    const adminSession = request.cookies.get('admin_session');

    if (!adminSession || adminSession.value !== 'true') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
