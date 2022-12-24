import { z } from 'zod';

export const signInBodySchema = z
  .object({
    oathProvider: z.enum(['ANILIST']),
    accessToken: z.string(),
  })
  .required();

export type SignInBody = z.infer<typeof signInBodySchema>;

export const validateSignInBody = (body: unknown) => {
  signInBodySchema.parse(body);
};
