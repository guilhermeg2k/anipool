import axiosClient from '@libs/axios';

const signWithAnilist = async (credencials: Anilist.Credencials) => {
  const response = await axiosClient.post(
    '/auth/sign-in-with-anilist',
    credencials
  );
  const userToken = <string>response.data.jwtToken;
  return userToken;
};

const signWithTwitter = async (credencials: Twitter.Credencials) => {
  const response = await axiosClient.post(
    '/auth/sign-in-with-twitter',
    credencials
  );
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
  signWithAnilistAccessToken: signWithAnilist,
};

export default authService;
