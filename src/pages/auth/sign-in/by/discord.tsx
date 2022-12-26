import { OAuthProvider } from '@backend/enums';
import LoadingPage from '@components/core/LoadingPage';
import { toastError } from '@libs/toastify';
import authService from '@services/authService';
import { authenticateUser } from '@utils/authUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const authUrl = process.env.NEXT_PUBLIC_DISCORD_AUTH_URL || '';

const getAccessTokenFromUrl = (url: string) => {
  /* Discord auth appends access token in a fragment (#), the url will looks like:
      http://localhost:3000/auth/sign-in/by/discord#token_type=Bearer&access_token=${TOKEN}&expires_in=604800&scope=identify
  */
  const urlFragment = url.split('#')[1];
  if (urlFragment) {
    const fragmentParameters = urlFragment.split('&')[1];
    if (fragmentParameters) {
      const accessTokenValue = fragmentParameters.split('=')[1];
      return accessTokenValue;
    }
  }
  return null;
};

const DiscordAuth: NextPage = () => {
  const router = useRouter();

  const signIn = async (accessToken: string) => {
    try {
      const credencials = { accessToken };
      const userToken = await authService.signIn<Discord.Credencials>(
        OAuthProvider.Discord,
        credencials
      );
      authenticateUser(userToken);
    } catch (error) {
      toastError('Failed to authenticate user');
    }
  };

  const openDiscordAuthPage = async () => {
    window.open(authUrl, '_self');
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromUrl(router.asPath);

    if (accessToken) {
      signIn(String(accessToken));
    } else {
      openDiscordAuthPage();
    }
  }, []);

  return <LoadingPage text="Authenticating..." title="Authenticating" />;
};

export default DiscordAuth;
