import { OAuthProvider } from '@backend/enums';
import { z } from 'zod';

export const signInBodySchema = z.object({
  oathProvider: z.nativeEnum(OAuthProvider),
  accessToken: z.string(),
});

export type SignInBody = z.infer<typeof signInBodySchema>;

export const validateSignInBody = (body: unknown) => {
  signInBodySchema.parse(body);
};
