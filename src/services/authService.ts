import { OAuthProvider } from '@backend/enums';
import axiosClient from '@libs/axios';

const signIn = async (
  provider: OAuthProvider,
  credencials: ProviderCredencials
) => {
  const response = await axiosClient.post('/auth/sign-in', {
    provider,
    credencials,
  });
  const userToken = <string>response.data.jwtToken;
  return userToken;
};

const authService = {
  signIn,
};

export default authService;
