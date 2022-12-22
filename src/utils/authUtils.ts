import { JWT_SECRET } from '@backend/constants';
import { jwtVerify } from 'jose';

export const getTokenPayload = async (
  token: string
): Promise<{ id: string }> => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET)
  );
  return { id: payload.id as string };
};
