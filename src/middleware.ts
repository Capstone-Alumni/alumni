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
  async function middleware(request: NextRequestWithAuth) {
    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    const hostname = request.headers.get('host') || 'demo.vercel.app';

    const currentHost =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.vercel.app', '')
        : hostname.replace('.localhost:3005', '');

    const response = NextResponse.next();
    const currentTenant = response.cookies.get('tenant-subdomain')?.value;
    if (currentTenant !== currentHost) {
      response.cookies.set('tenant-subdomain', currentHost);
    }
    return response;
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
