import { OAuthProvider } from '@backend/enums';
import userRepository from '@backend/repository/userRepository';
import { AnilistUser, User } from '@backend/types';

const get = async (id: string) => {
  const user = await userRepository.get(id);
  return user;
};

const getByOAuthProviderAndOauthId = async (
  oauthProvider: string,
  oauthId: string
) => {
  const user = await userRepository.getByOauthProviderAndOauthId(
    oauthProvider,
    oauthId
  );
  return user;
};

const createByAnilistUser = async (anilistUser: AnilistUser) => {
  const user = <User>{
    oauthProvider: OAuthProvider.Anilist,
    oauthId: anilistUser.id.toString(),
    nickname: anilistUser.name,
    avatarUrl: anilistUser.avatar.large,
  };

  const createdUserId = await userRepository.createAndReturnId(user);
  const createdUser = await userService.get(createdUserId);
  return createdUser;
};

const userService = {
  get,
  getByOAuthProviderAndOauthId,
  createByAnilistUser,
};

export default userService;
