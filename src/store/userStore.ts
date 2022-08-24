import create from 'zustand';

type UserState = User & {
  setUser: (user: User) => void;
};

export const EMPTY_USER = {
  id: '',
  nickname: '',
  avatarUrl: '',
  oauthId: '',
  oauthProvider: '',
};

const useUserStore = create<UserState>((set) => ({
  ...EMPTY_USER,
  setUser: (user: User) =>
    set(() => ({
      ...user,
    })),
}));

export default useUserStore;
