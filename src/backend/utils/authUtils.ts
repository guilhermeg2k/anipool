import { JWT_SECRET } from '@backend/constants';
import { jwtVerify, SignJWT } from 'jose';

export const getTokenPayload = async (
  token: string
): Promise<{ id: string }> => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET)
  );
  return { id: payload.id as string };
};

export const generateUserJWTToken = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  return new SignJWT({ id: user.id })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(iat)
    .sign(new TextEncoder().encode(JWT_SECRET));
};
