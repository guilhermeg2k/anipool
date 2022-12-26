import { OAuthProvider } from '@backend/enums';
import { generateUserJWTToken } from '@backend/utils/authUtils';
import userService from '../userService';

interface Provider<Credencials> {
  name: OAuthProvider;
  getUser: (credencials: Credencials) => Promise<ProviderUser>;
}

const signIn = async <Credencials>(
  provider: Provider<Credencials>,
  credencials: Credencials
) => {
  const providerUser = await provider.getUser(credencials);

  const user = await userService.getByOAuthProviderAndOauthId(
    provider.name,
    providerUser.id
  );

  if (user) {
    const jwtToken = await generateUserJWTToken(user);
    return jwtToken;
  }

  const createdUser = await userService.create({
    oauthProvider: provider.name,
    oauthId: providerUser.id,
    nickname: providerUser.username,
    avatarUrl: providerUser.avatarUrl,
  });

  const jwtToken = await generateUserJWTToken(createdUser);
  return jwtToken;
};

const authService = {
  signIn,
};

export default authService;
