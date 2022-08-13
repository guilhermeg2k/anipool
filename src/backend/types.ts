export interface AnilistUser {
  id: number;
  name: string;
  avatar: {
    large: string;
    medium: string;
  };
}

export interface User {
  id?: string;
  oauthProvider: string;
  oauthId: string;
  nickname: string;
  avatarUrl: string;
}
