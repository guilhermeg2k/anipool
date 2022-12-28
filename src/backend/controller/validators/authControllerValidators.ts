import { OAuthProvider } from '@backend/enums';
import { z } from 'zod';

export const signInBodySchema = z.object({
  provider: z.nativeEnum(OAuthProvider),
  credencials: z.unknown(),
});

export const signInByAnilistBodySchema = z.object({
  provider: z.literal(OAuthProvider.Anilist),
  credencials: z.object({
    accessToken: z.string(),
  }),
});

export const signInByTwitterBodySchema = z.object({
  provider: z.literal(OAuthProvider.Twitter),
  credencials: z.object({
    OAuthToken: z.string(),
    OAuthVerifier: z.string(),
  }),
});

export const signByDiscordBodySchema = z.object({
  provider: z.literal(OAuthProvider.Discord),
  credencials: z.object({
    accessToken: z.string(),
  }),
});

export const signByMyAnimeListBodySchema = z.object({
  provider: z.literal(OAuthProvider.MyAnimeList),
  credencials: z.object({
    code: z.string(),
    codeVerifier: z.string(),
  }),
});
