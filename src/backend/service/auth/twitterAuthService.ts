import { OAuthProvider } from '@backend/enums';
import { generateUserJWTToken } from '@backend/utils/authUtils';
import axiosClient from '@libs/axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import userService from '../userService';

const TWITTER_CALLBACK_URL =
  process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/auth/twitter';
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '';
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '';

const twitterOAuth = new OAuth({
  consumer: {
    key: TWITTER_CONSUMER_KEY,
    secret: TWITTER_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (base_string: string, key: string) => {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

const getAuthUrl = async () => {
  const request = {
    url: `https://api.twitter.com/oauth/request_token`,
    method: 'POST',
    data: {
      oauth_callback: TWITTER_CALLBACK_URL,
    },
  };

  const { Authorization } = twitterOAuth.toHeader(
    twitterOAuth.authorize(request)
  );

  const oauthRequestTokens = await axiosClient({
    ...request,
    headers: { Authorization },
  });

  const oauthToken = oauthRequestTokens.data.split('&')[0].split('=')[1];
  const twitterAuthUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;
  return twitterAuthUrl;
};

const getUserToken = async (oauthToken: string, oauthVerifier: string) => {
  const userOAuthToken = await axiosClient.post(
    `https://api.twitter.com/oauth/access_token?oauth_verifier=${oauthVerifier}&oauth_token=${oauthToken}`
  );

  const tokenAndSecret = userOAuthToken.data.split('&');
  const key = tokenAndSecret[0].split('=')[1];
  const secret = tokenAndSecret[1].split('=')[1];

  return {
    key,
    secret,
  };
};

const getUser = async (userToken: { key: string; secret: string }) => {
  const userDataRequest = {
    url: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=false&include_entities=false&skip_status=true',
    method: 'GET',
  };

  const { Authorization } = twitterOAuth.toHeader(
    twitterOAuth.authorize(userDataRequest, userToken)
  );

  const userData = await axiosClient({
    ...userDataRequest,
    headers: { Authorization },
  });

  const { id_str, profile_image_url_https, screen_name } = userData.data;

  return <Twitter.User>{
    id: id_str,
    username: screen_name,
    profileImageURL: profile_image_url_https,
  };
};

const signIn = async (oauthToken: string, oauthVerifier: string) => {
  const userTokens = await getUserToken(oauthToken, oauthVerifier);
  const twitterUser = await getUser(userTokens);

  const user = await userService.getByOAuthProviderAndOauthId(
    OAuthProvider.Twitter,
    twitterUser.id
  );

  if (user) {
    const jwtToken = await generateUserJWTToken(user);
    return jwtToken;
  }

  const createdUser = await userService.create({
    oauthProvider: OAuthProvider.Twitter,
    oauthId: twitterUser.id,
    nickname: twitterUser.username,
    avatarUrl: twitterUser.profileImageURL,
  });

  const jwtToken = await generateUserJWTToken(createdUser);
  return jwtToken;
};

const twitterAuthService = {
  getAuthUrl,
  signIn,
};

export default twitterAuthService;
