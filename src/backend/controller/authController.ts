import { OAuthProvider } from '@backend/enums';
import authService from '@backend/service/authService';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { SignInBody, validateSignInBody } from '../validators/authValidators';

const signInWithAnilist = async (accessToken: string, res: NextApiResponse) => {
  try {
    const jwtToken = await authService.signInByAnilistAccessToken(accessToken);
    return res.status(200).send({
      jwtToken,
    });
  } catch (error) {
    return res.status(401).send('');
  }
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
    if (error instanceof ZodError) {
      return res.status(400).send('Bad request');
    }
    return res.status(500).send('Internal server error');
  }
};

const authController = {
  signIn,
};

export default authController;
