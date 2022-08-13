import { JWT_SECRET } from '@backend/constants';
import { OAuthProvider } from '@backend/enums';
import { User } from '@backend/types';
import { SignJWT } from 'jose';
import anilistService from './anilistService';
import userService from './userService';

const generateUserJWTToken = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  return new SignJWT({ id: user.id })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(iat)
    .sign(new TextEncoder().encode(JWT_SECRET));
};

const signInByAnilistAccessToken = async (accessToken: string) => {
  const anilistUser = await anilistService.getUserByAccessToken(accessToken);

  const user = await userService.getByOAuthProviderAndOauthId(
    OAuthProvider.Anilist,
    anilistUser.id.toString()
  );

  if (user) {
    const jwtToken = await generateUserJWTToken(user);
    return jwtToken;
  }

  const createdUser = await userService.createByAnilistUser(anilistUser);
  const jwtToken = await generateUserJWTToken(createdUser);
  return jwtToken;
};

const authService = {
  signInByAnilistAccessToken,
};

export default authService;
