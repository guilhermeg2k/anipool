import LoadingPage from '@components/core/LoadingPage';
import { toastError } from '@libs/toastify';
import authService from '@services/authService';
import { authenticateUser } from '@utils/authUtils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TwitterAuth: NextPage = () => {
  const router = useRouter();
  const { oauth_token, oauth_verifier } = router.query;

  const signIn = async (OAuthToken: string, OAuthVerifier: string) => {
    try {
      const userToken = await authService.signWithTwitter({
        OAuthToken,
        OAuthVerifier,
      });
      authenticateUser(userToken);
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
      signIn(String(oauth_token), String(oauth_verifier));
    } else {
      openTwitterAuthPage();
    }
  }, []);

  return <LoadingPage text="Authenticating..." title="Authenticating" />;
};

export default TwitterAuth;
