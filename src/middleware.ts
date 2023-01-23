import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  function middleware(request: NextRequest) {
    const url = request.nextUrl;
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = url.pathname;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    const hostname = request.headers.get('host') || 'demo.vercel.app';

    // Only for demo purposes - remove this if you want to use your root domain as the landing page
    if (hostname === 'vercel.pub' || hostname === 'platforms.vercel.app') {
      return NextResponse.redirect('https://demo.vercel.pub');
    }

    /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
    const currentHost =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.vercel.app', '')
        : hostname.replace('.localhost:3005', '');

    // rewrites for app pages
    if (currentHost == 'app') {
      url.pathname = `/_app${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    // rewrite everything else to `/_sites/[site] dynamic route
    return NextResponse.rewrite(
      new URL(`/_tenant/${currentHost}${path}`, request.url),
    );

    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // const { token } = request.nextauth;

    // if (
    //   request.nextUrl.pathname.startsWith('/sign_in') ||
    //   request.nextUrl.pathname.startsWith('/sign_up')
    // ) {
    //   if (token) {
    //     return NextResponse.redirect(new URL('/', request.url));
    //   }
    // } else if (request.nextUrl.pathname.startsWith('/verify_account')) {
    //   if (!token) {
    //     return NextResponse.redirect(new URL('/sign_in', request.url));
    //   }

    //   if (token && token.user.accessStatus !== 'PENDING') {
    //     return NextResponse.redirect(new URL('/', request.url));
    //   }
    // } else if (token && token.user.accessStatus === 'PENDING') {
    //   return NextResponse.redirect(new URL('/verify_account', request.url));
    // }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
