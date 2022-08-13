import { OAuthProvider } from '@backend/enums';
import authService from '@backend/service/authService';
import { NextApiRequest, NextApiResponse } from 'next';

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { oathProvider, accessToken } = req.body;

  if (!oathProvider || !accessToken) {
    res.status(400).send('');
    return;
  }

  try {
    switch (oathProvider) {
      case OAuthProvider.Anilist:
        const jwtToken = await authService.signInByAnilistAccessToken(
          accessToken
        );
        res.status(200).send({
          jwtToken,
        });
        return;

      default:
        res.status(400).send('');
        return;
    }
  } catch (error) {
    res.status(401).send('');
    console.log(error);
  }
};

const authController = {
  signIn,
};

export default authController;
