import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(request: NextRequest) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { token } = request.nextauth;

    if (
      request.nextUrl.pathname.startsWith('/sign_in') ||
      request.nextUrl.pathname.startsWith('/sign_up')
    ) {
      if (token) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } else if (request.nextUrl.pathname.startsWith('/verify_account')) {
      if (!token) {
        return NextResponse.redirect(new URL('/sign_in', request.url));
      }

      if (token && token.user.accessStatus !== 'PENDING') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } else if (token && token.user.accessStatus === 'PENDING') {
      return NextResponse.redirect(new URL('/verify_account', request.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
