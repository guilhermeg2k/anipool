import { OAuthProvider } from '@backend/enums';
import { z } from 'zod';

const signInBodySchema = z.object({
  provider: z.nativeEnum(OAuthProvider),
  credencials: z.unknown(),
});

export type SignInBody = z.infer<typeof signInBodySchema>;

export const validateSignInBody = (body: unknown) => {
  signInBodySchema.parse(body);
};

const signInWithAnilistBodySchema = z.object({
  provider: z.literal(OAuthProvider.Anilist),
  credencials: z.object({
    accessToken: z.string(),
  }),
});

export type SignInWithAnilistBody = z.infer<typeof signInWithAnilistBodySchema>;

export const validateSignInWithAnilistBody = (body: unknown) => {
  signInWithAnilistBodySchema.parse(body);
};

const signInWithTwitterBodySchema = z.object({
  provider: z.literal(OAuthProvider.Twitter),
  credencials: z.object({
    OAuthToken: z.string(),
    OAuthVerifier: z.string(),
  }),
});

export type SignInWithTwitterBody = z.infer<typeof signInWithTwitterBodySchema>;

export const validateSignInWithTwitterBody = (body: unknown) => {
  signInWithTwitterBodySchema.parse(body);
};

const signInWithDiscordBodySchema = z.object({
  provider: z.literal(OAuthProvider.Discord),
  credencials: z.object({
    accessToken: z.string(),
  }),
});

export type SignInWithDiscordBody = z.infer<typeof signInWithDiscordBodySchema>;

export const validateSignInWithDiscordBody = (body: unknown) => {
  signInWithDiscordBodySchema.parse(body);
};
