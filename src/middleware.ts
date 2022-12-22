import { getTokenPayload } from '@utils/authUtils';
import { NextRequest, NextResponse } from 'next/server';

const isAuthRoute = (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith('/poll/result')) {
    return false;
  }

  if (req.nextUrl.pathname.startsWith('/poll/vote')) {
    return false;
  }

  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return false;
  }

  if (req.nextUrl.pathname.startsWith('/api/poll/get')) {
    return false;
  }

  if (req.nextUrl.pathname.startsWith('/api/poll/result')) {
    return false;
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
