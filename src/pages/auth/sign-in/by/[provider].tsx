import { OAuthProvider } from '@backend/enums';
import LoadingPage from '@components/core/LoadingPage';
import { toastError } from '@libs/toastify';
import authService from '@services/authService';
import {
  authenticateUser,
  getAnilistCredencials,
  getDiscordCredencials,
  getTwitterCredencials,
} from '@utils/authUtils';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { z } from 'zod';

interface Provider {
  openAuthUrl: () => void;
  getCredencials: (router: NextRouter) => ProviderCredencials | null;
}

const providers: {
  [key in OAuthProvider]: Provider;
} = {
  [OAuthProvider.Anilist]: {
    openAuthUrl: () => {
      const authUrl = process.env.NEXT_PUBLIC_ANILIST_AUTH_URL || '';
      window.open(authUrl, '_self');
    },
    getCredencials: getAnilistCredencials,
  },

  [OAuthProvider.Discord]: {
    openAuthUrl: () => {
      const authUrl = process.env.NEXT_PUBLIC_DISCORD_AUTH_URL || '';
      window.open(authUrl, '_self');
    },
    getCredencials: getDiscordCredencials,
  },

  [OAuthProvider.Twitter]: {
    openAuthUrl: async () => {
      const twitterAuthUrl = await authService.getTwitterAuthUrl();
      window.open(twitterAuthUrl, '_self');
    },
    getCredencials: getTwitterCredencials,
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
      const credencials = providers[provider].getCredencials(router);

      if (credencials) {
        await signIn(provider, credencials);
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
