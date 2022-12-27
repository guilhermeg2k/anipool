declare module Twitter {
  interface Credencials {
    OAuthToken: string;
    OAuthVerifier: string;
  }

  interface User {
    id_str: string;
    screen_name: string;
    profile_image_url_https: string;
  }
}

declare module Discord {
  interface Credencials {
    accessToken: string;
  }

  interface User {
    id: string;
    username: string;
    avatarUrl: string;
  }
}

declare module Anilist {
  interface User {
    id: number;
    name: string;
    avatar: {
      large: string;
      medium: string;
    };
  }

  interface Credencials {
    accessToken: string;
  }

  interface Media {
    id: number;
    type: string;
    title: {
      romaji?: string;
      english?: string;
      native?: string;
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
    image: {
      large: string;
      medium: string;
    };
  }
}

interface ProviderUser {
  id: string;
  username: string;
  avatarUrl: string;
}

interface User {
  id?: string;
  oauthProvider: string;
  oauthId: string;
  nickname: string;
  avatarUrl: string;
  createdAt?: Date;
}

interface PollOption {
  anilistId: number;
  type: string;
  text?: string;
}

interface Poll {
  id?: string;
  userId?: string;
  title: string;
  endDate: Date;
  multiOptions: boolean;
  options: Array<PollOption>;
  createdAt?: Date;
}

interface PollVote {
  id?: string;
  userId?: string;
  pollId: string;
  anilistId: number;
  type: string;
  createdAt?: Date;
}

type ProviderCredencials =
  | Anilist.Credencials
  | Twitter.Credencials
  | Discord.Credencials;

type PollResult = PollOption & { votes: number };

type PollWithCreator = Poll & {
  creator: {
    nickname: string;
    avatarUrl: string;
  };
};
