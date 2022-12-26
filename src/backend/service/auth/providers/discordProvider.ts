import { OAuthProvider } from '@backend/enums';
import discordService from '@services/discordService';

const name = OAuthProvider.Discord;

const getUser = async (credencials: Discord.Credencials) => {
  const user = await discordService.getUser(credencials);

  return <ProviderUser>{
    id: user.id,
    username: user.username,
    avatarUrl: user.avatarUrl,
  };
};

const discordProvider = {
  name,
  getUser,
};

export default discordProvider;
