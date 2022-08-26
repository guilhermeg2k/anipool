import Page from '@components/core/Page';
import useUserStore from '@store/userStore';
import authService from '@services/authService';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axiosClient from '@libs/axios';
import userService from '@services/userService';
import SpinnerGon from '@components/core/SpinnerGon';
import { toastError } from '@libs/toastify';
import LoadingPage from '@components/core/LoadingPage';

const getAccessTokenFromUrl = (url: string) => {
  /* Anilist OAuth appends access token in a fragment (#), the url will looks like:
      http://localhost:3000/auth#access_token={token}&token_type=Bearer&expires_in={expires_in}
  */
  const urlFragment = url.split('#')[1];
  if (urlFragment) {
    const fragmentParameters = urlFragment.split('&')[0];
    if (fragmentParameters) {
      const accessTokenValue = fragmentParameters.split('=')[1];
      return accessTokenValue;
    }
  }
  return null;
};

const Auth: NextPage = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const authenticateUser = async (accessToken: string) => {
    try {
      const userToken = await authService.signWithAnilistAccessToken(
        accessToken
      );
      Cookies.set('userToken', userToken);
      const user = await userService.getCurrentUser();
      setUser(user);
      router.push('/pool/create');
    } catch (error) {
      toastError('Failed to authenticate user');
    }
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromUrl(router.asPath);
    if (accessToken) {
      authenticateUser(accessToken);
    }
  }, []);

  return <LoadingPage text="Authenticating..." />;
};

export default Auth;
