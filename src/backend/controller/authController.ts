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
    if (oathProvider === OAuthProvider.Anilist) {
      return signInWithAnilist(accessToken, res);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return res.status(400).send('');
    }
    return res.status(500).send('');
  }
};

const authController = {
  signIn,
};

export default authController;
