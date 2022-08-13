declare module Anilist {
  interface User {
    id: number;
    name: string;
    avatar: {
      large: string;
      medium: string;
    };
  }

  interface Page {
    pageInfo: PageInfo;
    media: Array<AnilistAnime>;
  }
}

enum MediaTypes {
  Anime = 'ANIME',
  Manga = 'MANGA',
  Character = 'CHARACTER',
}

interface User {
  id?: string;
  oauthProvider: string;
  oauthId: string;
  nickname: string;
  avatarUrl: string;
}

interface PoolOption {
  id: number;
  type: string;
  text: string;
}
