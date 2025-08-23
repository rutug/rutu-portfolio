// middleware.js (in your root directory)
import { NextResponse } from 'next/server';

// Add any public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get the token from the cookies
  const token = request.cookies.get('token');

  // Allow access to public routes even without token
  if (publicRoutes.includes(pathname)) {
    // If user is already logged in and tries to access login page,
    // redirect them to home page
    if (token && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // For all other routes, check if user is authenticated
  if (!token) {
    // Redirect to login page if no token is present
    const loginUrl = new URL('/login', request.url);
    // Store the original path to redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

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