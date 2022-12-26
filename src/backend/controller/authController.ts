import { OAuthProvider } from '@backend/enums';
import authService from '@backend/service/auth/authService';
import anilistProvider from '@backend/service/auth/providers/anilistProvider';
import discordProvider from '@backend/service/auth/providers/discordProvider';
import twitterProvider from '@backend/service/auth/providers/twitterProvider';
import twitterService from '@services/twitterService';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import {
  SignInBody,
  SignInWithAnilistBody,
  SignInWithDiscordBody,
  SignInWithTwitterBody,
  validateSignInBody,
  validateSignInWithAnilistBody,
  validateSignInWithDiscordBody,
  validateSignInWithTwitterBody,
} from './validators/authControllerValidators';

const signInWithAnilist = async (req: NextApiRequest, res: NextApiResponse) => {
  validateSignInWithAnilistBody(req.body);

  const { credencials } = req.body as SignInWithAnilistBody;

  const jwtToken = await authService.signIn<Anilist.Credencials>(
    anilistProvider,
    credencials
  );

  return res.status(200).send({
    jwtToken,
  });
};

const signInWithDiscord = async (req: NextApiRequest, res: NextApiResponse) => {
  validateSignInWithDiscordBody(req.body);

  const { credencials } = req.body as SignInWithDiscordBody;

  const jwtToken = await authService.signIn<Discord.Credencials>(
    discordProvider,
    credencials
  );

  return res.status(200).send({
    jwtToken,
  });
};

const signInWithTwitter = async (req: NextApiRequest, res: NextApiResponse) => {
  validateSignInWithTwitterBody(req.body);

  const { credencials } = req.body as SignInWithTwitterBody;

  const jwtToken = await authService.signIn<Twitter.Credencials>(
    twitterProvider,
    credencials
  );

  return res.status(200).send({
    jwtToken,
  });
};

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateSignInBody(req.body);
    const { provider } = req.body as SignInBody;

    switch (String(provider).toUpperCase()) {
      case OAuthProvider.Anilist:
        return signInWithAnilist(req, res);
      case OAuthProvider.Discord:
        return signInWithDiscord(req, res);
      case OAuthProvider.Twitter:
        return signInWithTwitter(req, res);
    }

    return res.status(400).send('Bad request');
  } catch (error) {
    return handleError(error, res);
  }
};

const getTwitterAuthUrl = async (_: NextApiRequest, res: NextApiResponse) => {
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
  signIn,
  getTwitterAuthUrl,
};

export default authController;
