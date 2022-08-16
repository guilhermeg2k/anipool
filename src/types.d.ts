declare module Anilist {
  interface User {
    id: number;
    name: string;
    avatar: {
      large: string;
      medium: string;
    };
  }

  interface Media {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    coverImage: {
      extraLarge: string;
    };
    episodes?: number;
    status: string;
    format: string;
  }

  interface Character {
    id: number;
    name: {
      full: string;
      native: string;
    };
  }
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
