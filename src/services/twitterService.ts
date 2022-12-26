import axiosClient from '@libs/axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

const TWITTER_CALLBACK_URL =
  process.env.TWITTER_CALLBACK_URL ||
  'http://localhost:3000/auth/sign-in/by/twitter';

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

const getUserToken = async ({
  OAuthToken,
  OAuthVerifier,
}: Twitter.Credencials) => {
  const userOAuthToken = await axiosClient.post(
    `https://api.twitter.com/oauth/access_token?oauth_verifier=${OAuthVerifier}&oauth_token=${OAuthToken}`
  );

  const keyAndSecret = userOAuthToken.data.split('&');
  const key = keyAndSecret[0].split('=')[1];
  const secret = keyAndSecret[1].split('=')[1];

  return {
    key,
    secret,
  };
};

const getUser = async ({ OAuthToken, OAuthVerifier }: Twitter.Credencials) => {
  const userToken = await getUserToken({ OAuthToken, OAuthVerifier });
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

  return {
    id_str,
    screen_name,
    profile_image_url_https: profile_image_url_https.replace('_normal', ''),
  };
};

const twitterService = {
  getAuthUrl,
  getUser,
};

export default twitterService;
