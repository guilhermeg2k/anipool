import Cookies from 'js-cookie';

export const AUTH_CHANNEL = new BroadcastChannel('auth-channel');

export enum AuthChannelMessageType {
  UserHasAuthenticated = 'USER-HAS-AUTHENTICATED',
}

export const sendUserHasAuthenticated = () => {
  AUTH_CHANNEL.postMessage({
    type: AuthChannelMessageType.UserHasAuthenticated,
  });
};

export const authenticateUser = (userToken: string) => {
  Cookies.set('userToken', userToken);
  sendUserHasAuthenticated();
  window.close();
};
