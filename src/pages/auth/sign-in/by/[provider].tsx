import { OAuthProvider } from '@backend/enums';
import LoadingPage from '@components/core/LoadingPage';
import { toastError } from '@libs/toastify';
import authService from '@services/authService';
import myAnimelistService from '@services/myAnimeListService';
import {
  authenticateUser,
  getAnilistCredencials,
  getDiscordCredencials,
  getMALCredencials,
} from '@utils/authUtils';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { z } from 'zod';

interface Provider {
  openAuthUrl: () => void;
  getCredentials: (router: NextRouter) => ProviderCredencials | null;
}

const providers: {
  [key in OAuthProvider]: Provider;
} = {
  [OAuthProvider.Anilist]: {
    openAuthUrl: () => {
      const authUrl = process.env.NEXT_PUBLIC_ANILIST_AUTH_URL || '';
      window.open(authUrl, '_self');
    },
    getCredentials: getAnilistCredencials,
  },

  [OAuthProvider.Discord]: {
    openAuthUrl: () => {
      const authUrl = process.env.NEXT_PUBLIC_DISCORD_AUTH_URL || '';
      window.open(authUrl, '_self');
    },
    getCredentials: getDiscordCredencials,
  },

  [OAuthProvider.MyAnimeList]: {
    openAuthUrl: async () => {
      const authUrl = await myAnimelistService.getAuthUrl();
      window.open(authUrl, '_self');
    },
    getCredentials: getMALCredencials,
  },
};

const authRouterQuerySchema = z.object({
  provider: z.preprocess(
    (provider) =>
      typeof provider == 'string' ? provider.toUpperCase() : provider,
    z.nativeEnum(OAuthProvider)
  ),
});

const Auth: NextPage = () => {
  const router = useRouter();

  const signIn = async (
    provider: OAuthProvider,
    credencials: ProviderCredencials
  ) => {
    try {
      const userToken = await authService.signIn(provider, credencials);
      authenticateUser(userToken);
    } catch (error) {
      toastError('Failed to authenticate user');
    }
  };

  const signInByProvider = async () => {
    if (!router.isReady) return;

    try {
      const { provider } = authRouterQuerySchema.parse(router.query);
      const credentials = providers[provider].getCredentials(router);

      if (credentials) {
        await signIn(provider, credentials);
        router.push('/');
      } else {
        await providers[provider].openAuthUrl();
      }
    } catch (error) {
      router.push('/');
    }
  };

  useEffect(() => {
    signInByProvider();
  }, [router]);

  return <LoadingPage text="Authenticating..." title="Authenticating" />;
};

export default Auth;
