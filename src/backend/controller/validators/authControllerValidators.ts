import { z } from 'zod';

const signInWithAnilistBodySchema = z.object({
  accessToken: z.string(),
});

export type SignInWithAnilistBody = z.infer<typeof signInWithAnilistBodySchema>;

export const validateSignInWithAnilistBody = (body: unknown) => {
  signInWithAnilistBodySchema.parse(body);
};

const signInWithTwitterBodySchema = z.object({
  OAuthToken: z.string(),
  OAuthVerifier: z.string(),
});

export type SignInWithTwitterBody = z.infer<typeof signInWithTwitterBodySchema>;

export const validateSignInWithTwitterBody = (body: unknown) => {
  signInWithTwitterBodySchema.parse(body);
};
