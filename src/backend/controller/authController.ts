import authService from '@backend/service/auth/authService';
import anilistProvider from '@backend/service/auth/providers/anilistProvider';
import discordProvider from '@backend/service/auth/providers/discordProvider';
import twitterProvider from '@backend/service/auth/providers/twitterProvider';
import twitterService from '@services/twitterService';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import {
  SignInWithAnilistBody,
  SignInWithDiscordBody,
  SignInWithTwitterBody,
  validateSignInWithAnilistBody,
  validateSignInWithDiscordBody,
  validateSignInWithTwitterBody,
} from './validators/authControllerValidators';

const signInWithAnilist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateSignInWithAnilistBody(req.body);
    const credencials = req.body as SignInWithAnilistBody;

    const jwtToken = await authService.signIn<Anilist.Credencials>(
      anilistProvider,
      credencials
    );

    return res.status(200).send({
      jwtToken,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const signInWithDiscord = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateSignInWithDiscordBody(req.body);
    const credencials = req.body as SignInWithDiscordBody;

    const jwtToken = await authService.signIn<Discord.Credencials>(
      discordProvider,
      credencials
    );

    return res.status(200).send({
      jwtToken,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const signInWithTwitter = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateSignInWithTwitterBody(req.body);

    const credencials = req.body as SignInWithTwitterBody;
    const jwtToken = await authService.signIn<Twitter.Credencials>(
      twitterProvider,
      credencials
    );

    return res.status(200).send({
      jwtToken,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

const getTwitterAuthUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const twitterAuthUrl = await twitterService.getAuthUrl();
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
  signInWithDiscord,
  signInWithAnilist,
  signInWithTwitter,
  getTwitterAuthUrl,
};

export default authController;
