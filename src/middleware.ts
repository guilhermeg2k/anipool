import { NextRequest, NextResponse } from 'next/server';
import { JWT_SECRET } from '@backend/constants';
import { jwtVerify } from 'jose';

const getTokenPayload = async (
  token: string,
  secret: string
): Promise<{ id: string }> => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return { id: payload.id as string };
};

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return res;
  }

  const userToken = req.cookies.get('userToken');

  if (userToken) {
    try {
      const { id } = await getTokenPayload(userToken, JWT_SECRET);
      res.cookies.set('id', id);
      return res;
    } catch (error) {
      return NextResponse.redirect(new URL('/401', req.url));
    }
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
};

export const config = {
  matcher: ['/api/:path*', '/pool/create/:path*'],
};
