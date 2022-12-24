import { getTokenPayload } from '@utils/authUtils';
import { NextRequest, NextResponse } from 'next/server';

const NOT_AUTHENTICATED_ROUTES = [
  '/poll/result',
  '/poll/vote',
  '/api/auth',
  '/api/poll/get',
  '/api/poll/result',
];

const isAuthRoute = (req: NextRequest) => {
  for (const notAuthenticatedRoute of NOT_AUTHENTICATED_ROUTES) {
    if (req.nextUrl.pathname.startsWith(notAuthenticatedRoute)) {
      return false;
    }
  }
  return true;
};

const authMiddleware = async (req: NextRequest) => {
  const userToken = req.cookies.get('userToken');

  if (userToken) {
    try {
      await getTokenPayload(userToken);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/401', req.url));
    }
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
};

export const middleware = async (req: NextRequest) => {
  if (isAuthRoute(req)) {
    return await authMiddleware(req);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/poll/:path*', '/api/:path*', '/me/:path*'],
};
