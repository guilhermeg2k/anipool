import { OAuthProvider } from '@backend/enums';
import myAnimelistService from '@services/myAnimeListService';

const name = OAuthProvider.MyAnimeList;

const getUser = async (credencials: MyAnimeList.Credencials) => {
  const accessToken = await myAnimelistService.getUserToken(credencials);
  const user = await myAnimelistService.getUser(accessToken);

  return <ProviderUser>{
    id: user.id,
    username: user.name,
    avatarUrl: user.picture,
  };
};

const myAnimelistProvider = {
  name,
  getUser,
};

export default myAnimelistProvider;
