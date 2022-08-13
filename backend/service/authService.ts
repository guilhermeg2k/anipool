import { OAuthProvider } from '@backend/enums';
import jwt from 'jsonwebtoken';
import userRepository from '@backend/repository/userRepository';
import anilistService from './anilistService';
import userService from './userService';
import { User } from '@backend/types';

const JWT_SECRET = process.env.JWT_SECRET ?? 'DEFAULT_SECRET';

const generateUserJWTToken = (user: User) => {
  const jwtToken = jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET
  );
  return jwtToken;
};

const signInByAnilistAccessToken = async (accessToken: string) => {
  const anilistUser = await anilistService.getUserByAccessToken(accessToken);

  const user = await userService.getByOAuthProviderAndOauthId(
    OAuthProvider.Anilist,
    anilistUser.id.toString()
  );

  if (user) {
    const jwtToken = generateUserJWTToken(user);
    return jwtToken;
  }

  const createdUser = await userService.createByAnilistUser(anilistUser);
  const jwtToken = generateUserJWTToken(createdUser);
  return jwtToken;
};

const authService = {
  signInByAnilistAccessToken,
};

export default authService;
