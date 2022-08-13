import axiosClient from '@libs/axios';

const signWithAnilistAccessToken = async (accessToken: string) => {
  const response = await axiosClient.post('/auth/sign-in', {
    oathProvider: 'ANILIST',
    accessToken,
  });
  const userToken = <string>response.data.jwtToken;
  return userToken;
};

const authService = {
  signWithAnilistAccessToken,
};

export default authService;
