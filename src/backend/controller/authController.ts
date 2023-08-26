import { OAuthProvider } from '@backend/enums';
import authService from '@backend/service/auth/authService';
import anilistProvider from '@backend/service/auth/providers/anilistProvider';
import discordProvider from '@backend/service/auth/providers/discordProvider';
import myAnimelistProvider from '@backend/service/auth/providers/myAnimeListProvider';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import {
  signByDiscordBodySchema,
  signByMyAnimeListBodySchema,
  signInBodySchema,
  signInByAnilistBodySchema,
} from './validators/authControllerValidators';

const providerControllers = {
  [OAuthProvider.Anilist]: {
    signIn: (credencials: ProviderCredencials) =>
      authService.signIn(anilistProvider, credencials as Anilist.Credencials),
    validator: signInByAnilistBodySchema,
  },

  [OAuthProvider.Discord]: {
    signIn: (credencials: ProviderCredencials) =>
      authService.signIn(discordProvider, credencials as Discord.Credencials),
    validator: signByDiscordBodySchema,
  },

  [OAuthProvider.MyAnimeList]: {
    signIn: (credencials: ProviderCredencials) =>
      authService.signIn(
        myAnimelistProvider,
        credencials as MyAnimeList.Credencials
      ),
    validator: signByMyAnimeListBodySchema,
  },
};

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { provider } = signInBodySchema.parse(req.body);

    const { credencials } = providerControllers[provider].validator.parse(
      req.body
    );

    const jwtToken = await providerControllers[provider].signIn(credencials);

    return res.status(200).send({
      jwtToken,
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
};

export default authController;
