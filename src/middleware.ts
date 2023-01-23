import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|[\\w-]+\\.\\w+).*)',
  ],
};

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const url = request.nextUrl;
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = url.pathname;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    const hostname = request.headers.get('host') || 'demo.vercel.app';

    const currentHost =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.vercel.app', '')
        : hostname.replace('.localhost:3005', '');

    // rewrite everything else to `/_sites/[site] dynamic route
    return NextResponse.rewrite(
      new URL(`/_tenant/${currentHost}${path}`, request.url),
    );
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
