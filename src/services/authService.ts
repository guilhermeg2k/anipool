import { OAuthProvider } from '@backend/enums';
import axiosClient from '@libs/axios';

const signWithAnilistAccessToken = async (accessToken: string) => {
  const response = await axiosClient.post('/auth/sign-in', {
    oathProvider: OAuthProvider.Anilist,
    accessToken,
  });
  const userToken = <string>response.data.jwtToken;
  return userToken;
};

const signWithTwitter = async (OAuthToken: string, OAuthVerifier: string) => {
  const response = await axiosClient.post('/auth/sign-in-with-twitter', {
    OAuthToken,
    OAuthVerifier,
  });
  const userToken = <string>response.data.jwtToken;
  return userToken;
};

const getTwitterAuthUrl = async () => {
  const response = await axiosClient.get('/auth/get-twitter-auth-url');
  const twitterAuthUrl = <string>response.data.twitterAuthUrl;
  return twitterAuthUrl;
};

const authService = {
  getTwitterAuthUrl,
  signWithTwitter,
  signWithAnilistAccessToken,
};

export default authService;
