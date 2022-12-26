import LoadingPage from '@components/core/LoadingPage';
import { toastError } from '@libs/toastify';
import authService from '@services/authService';
import { sendUserHasAuthenticated } from '@utils/channelUtils';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TwitterAuth: NextPage = () => {
  const router = useRouter();
  const { oauth_token, oauth_verifier } = router.query;

  const authenticateUser = async (
    OAuthToken: string,
    OAuthVerifier: string
  ) => {
    try {
      const userToken = await authService.signWithTwitter(
        OAuthToken,
        OAuthVerifier
      );
      Cookies.set('userToken', userToken);
      sendUserHasAuthenticated();
      window.close();
    } catch (error) {
      toastError('Failed to authenticate user');
    }
  };

  const openTwitterAuthPage = async () => {
    const twitterAuthUrl = await authService.getTwitterAuthUrl();
    window.open(twitterAuthUrl, '_self');
  };

  useEffect(() => {
    if (oauth_token && oauth_verifier) {
      authenticateUser(String(oauth_token), String(oauth_verifier));
    } else {
      openTwitterAuthPage();
    }
  }, []);

  return <LoadingPage text="Authenticating..." title="Authenticating" />;
};

export default TwitterAuth;
