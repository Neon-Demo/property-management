import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that don't require authentication
const publicPaths = ['/login', '/api/auth', '/dashboard', '/projects', '/forms', '/reports'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public path
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path) || pathname === '/'
  );
  
  // Check if the request is for an API route (except auth routes)
  const isApiPath = pathname.startsWith('/api') && !pathname.startsWith('/api/auth');
  
  // Check if the request is for a static file
  const isStaticFile = /\.(png|jpg|jpeg|gif|svg|ico|css|js)$/i.test(pathname);
  
  // Skip middleware for public paths and static files
  if (isPublicPath || isStaticFile) {
    return NextResponse.next();
  }
  
  // Get the session token
  const token = await getToken({ req: request });
  
  // Redirect to login if no token and the path is not public
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  // Handle admin routes
  if (pathname.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Continue with the request if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)'],
};