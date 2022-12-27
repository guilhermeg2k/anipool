import { OAuthProvider } from '@backend/enums';
import twitterService from '@services/twitterService';

const name = OAuthProvider.Twitter;

const getUser = async (credencials: Twitter.Credencials) => {
  const user: Twitter.User = await twitterService.getUser(credencials);

  return <ProviderUser>{
    id: user.id_str,
    username: user.screen_name,
    avatarUrl: user.profile_image_url_https,
  };
};

const twitterProvider = {
  name,
  getUser,
};

export default twitterProvider;
