import axiosClient from '@libs/axios';
import { generatePKCEPlainChallenge } from '@utils/authUtils';

const MAL_CLIENT_ID = process.env.NEXT_PUBLIC_MAL_CLIENT_ID || '';
const MAL_REDIRECT_URL = process.env.NEXT_PUBLIC_MAL_REDIRECT_URL || '';
const MAL_CLIENT_SECRET = process.env.MAL_CLIENT_SECRET || '';

const getAuthUrl = async () => {
  const challenge = await generatePKCEPlainChallenge();

  const authUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${MAL_CLIENT_ID}&redirect_uri=${MAL_REDIRECT_URL}&state=${challenge}&code_challenge=${challenge}&code_challenge_method=plain`;

  return authUrl;
};

const getUserToken = async ({
  code,
  codeVerifier,
}: MyAnimeList.Credencials) => {
  const params = new URLSearchParams();
  params.append('client_id', MAL_CLIENT_ID);
  params.append('client_secret', MAL_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('code_verifier', codeVerifier);
  params.append('redirect_uri', MAL_REDIRECT_URL);

  const user = await axiosClient.post(
    'https://myanimelist.net/v1/oauth2/token',
    params
  );

  const { access_token } = user.data;

  return access_token as string;
};

const getUser = async (accessToken: string) => {
  const user = await axiosClient.get(
    'https://api.myanimelist.net/v2/users/@me',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { id, name, picture } = user.data;

  return {
    id,
    name,
    picture,
  } as MyAnimeList.User;
};

const myAnimelistService = {
  getAuthUrl,
  getUserToken,
  getUser,
};

export default myAnimelistService;
