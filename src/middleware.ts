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

const authMiddleware = async (req: NextRequest, res: NextResponse) => {
  const userToken = req.cookies.get('userToken');
  if (userToken) {
    try {
      await getTokenPayload(userToken);
      return res;
    } catch (error) {
      return NextResponse.redirect(new URL('/401', req.url));
    }
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
};

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  if (isAuthRoute(req)) {
    return await authMiddleware(req, res);
  }
  return res;
};

export const config = {
  matcher: ['/poll/:path*', '/api/:path*'],
};
