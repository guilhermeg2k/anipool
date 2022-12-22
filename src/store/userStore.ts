import create from 'zustand';

type UserState = User & {
  isLogged: () => boolean;
  setUser: (user: User) => void;
};

export const EMPTY_USER = {
  id: '',
  nickname: '',
  avatarUrl: '',
  oauthId: '',
  oauthProvider: '',
};

const useUserStore = create<UserState>((set, get) => ({
  ...EMPTY_USER,
  isLogged: () => {
    return Boolean(get().id);
  },

  setUser: (user: User) =>
    set(() => ({
      ...user,
    })),
}));

export default useUserStore;
