import { OAuthProvider } from '@backend/enums';
import twitterAuthService from '@backend/service/auth/twitterAuthService';
import authService from '@backend/service/authService';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import {
  SignInBody,
  validateSignInBody,
} from './validators/authControllerValidators';

const signInWithTwitter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { OAuthToken, OAuthVerifier } = req.body;
    const jwtToken = await twitterAuthService.signIn(OAuthToken, OAuthVerifier);
    return res.status(200).send({
      jwtToken,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const signInWithAnilist = async (accessToken: string, res: NextApiResponse) => {
  const jwtToken = await authService.signInByAnilistAccessToken(accessToken);
  return res.status(200).send({
    jwtToken,
  });
};

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateSignInBody(req.body);
    const { oathProvider, accessToken } = req.body as SignInBody;
    switch (oathProvider) {
      case OAuthProvider.Anilist:
        return signInWithAnilist(accessToken, res);
      default:
        throw new Error('Invalid OAuth provider');
    }
  } catch (error) {
    return handleError(error, res);
  }
};

const getTwitterAuthUrl = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const twitterAuthUrl = await twitterAuthService.getAuthUrl();
    return res.status(200).send({
      twitterAuthUrl,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const handleError = (error: unknown, res: NextApiResponse) => {
  if (error instanceof ZodError) {
    return res.status(400).send('Bad request');
  }
  return res.status(401).send('Unauthorized');
};

const authController = {
  signIn,
  getTwitterAuthUrl,
  signInWithTwitter,
};

export default authController;
