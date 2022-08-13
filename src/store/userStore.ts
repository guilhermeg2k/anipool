import { User } from '@backend/types';
import create from 'zustand';

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: <User>{
    id: '',
    oauthProvider: '',
    oauthId: '',
    nickname: '',
    avatarUrl: '',
  },

  setUser: (user: User) =>
    set(() => ({
      user,
    })),
}));

export default useUserStore;
