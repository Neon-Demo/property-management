import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * This is a simplified middleware that handles authentication
 * in a more permissive way to avoid blocking during development
 */
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (no authentication required)
  const publicPaths = ['/login', '/api/auth/google', '/api/auth/microsoft'];
  
  // Consider many paths as public to avoid blocking during development
  const isPublicPath = 
    publicPaths.includes(path) || 
    path.startsWith('/_next') || 
    path.includes('.') ||
    path === '/favicon.ico' ||
    path === '/' ||  // Consider home page as public for now
    path === '/forms' ||  // Consider forms page as public for now
    path === '/jobs' ||   // Consider jobs page as public for now
    path === '/reports';  // Consider reports page as public for now

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // If explicitly trying to visit a non-public path without a token
  if (!isPublicPath && !token) {
    // Create a new URL to redirect to the login page
    const url = new URL('/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }

  // If the user is logged in and trying to access the login page, redirect to home
  if (token && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // For all other cases, just continue with the request
  // This makes development easier by being permissive
  return NextResponse.next();
}

// Configure middleware to run on specific paths only
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}