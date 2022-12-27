import axiosClient from '@libs/axios';

const makeDiscordAvatarURL = (id: string, avatar: string) => {
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`;
};

const getUser = async ({ accessToken }: Discord.Credencials) => {
  const user = await axiosClient.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { id, username, avatar } = user.data;

  return <Discord.User>{
    id,
    username,
    avatarUrl: makeDiscordAvatarURL(id, avatar),
  };
};

const discordService = {
  getUser,
};

export default discordService;
