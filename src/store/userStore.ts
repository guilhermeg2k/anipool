import { User } from '@backend/types';
import create from 'zustand';

type UserState = User & {
  setUser: (user: User) => void;
};

const useUserStore = create<UserState>((set) => ({
  id: '',
  nickname: '',
  avatarUrl: '',
  oauthId: '',
  oauthProvider: '',

  setUser: (user: User) =>
    set(() => ({
      ...user,
    })),
}));

export default useUserStore;
