import { OAuthProvider } from '@backend/enums';
import anilistService from '@services/anilistService';

const name = OAuthProvider.Anilist;

const getUser = async (credencials: Anilist.Credencials) => {
  const user: Anilist.User = await anilistService.getUser(credencials);

  return <ProviderUser>{
    id: user.id.toString(),
    username: user.name,
    avatarUrl: user.avatar.large,
  };
};

const anilistProvider = {
  name,
  getUser,
};

export default anilistProvider;
