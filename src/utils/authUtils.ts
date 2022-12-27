import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';

export const AUTH_CHANNEL = new BroadcastChannel('auth-channel');

export enum AuthChannelMessageType {
  UserHasAuthenticated = 'USER-HAS-AUTHENTICATED',
}

export const sendUserHasAuthenticated = () => {
  AUTH_CHANNEL.postMessage({
    type: AuthChannelMessageType.UserHasAuthenticated,
  });
};

export const authenticateUser = (userToken: string) => {
  Cookies.set('userToken', userToken);
  sendUserHasAuthenticated();
  window.close();
};

export const getAnilistCredencials = (
  router: NextRouter
): Anilist.Credencials | null => {
  /* Anilist OAuth appends access token in a fragment (#), the url will looks like:
      http://localhost:3000/auth#access_token={token}&token_type=Bearer&expires_in={expires_in}
  */
  const url = router.asPath;
  const urlFragment = url.split('#')[1];
  if (urlFragment) {
    const fragmentParameters = urlFragment.split('&')[0];
    if (fragmentParameters) {
      const accessToken = fragmentParameters.split('=')[1];
      return { accessToken };
    }
  }
  return null;
};

export const getDiscordCredencials = (
  router: NextRouter
): Discord.Credencials | null => {
  /* Discord auth appends access token in a fragment (#), the url will looks like:
      http://localhost:3000/auth/sign-in/by/discord#token_type=Bearer&access_token=${TOKEN}&expires_in=604800&scope=identify
  */
  const url = router.asPath;
  const urlFragment = url.split('#')[1];
  if (urlFragment) {
    const fragmentParameters = urlFragment.split('&')[1];
    if (fragmentParameters) {
      const accessToken = fragmentParameters.split('=')[1];
      return { accessToken };
    }
  }
  return null;
};

export const getTwitterCredencials = (
  router: NextRouter
): Twitter.Credencials | null => {
  const { oauth_token, oauth_verifier } = router.query;
  if (oauth_token && oauth_verifier) {
    return {
      OAuthToken: String(oauth_token),
      OAuthVerifier: String(oauth_verifier),
    };
  }
  return null;
};
