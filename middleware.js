// middleware.js (in your root directory)
import { NextResponse } from 'next/server';

// Add any public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password'];

export function middleware(request) {
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};