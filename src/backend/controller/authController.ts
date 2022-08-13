import { OAuthProvider } from '@backend/enums';
import authService from '@backend/service/authService';
import { NextApiRequest, NextApiResponse } from 'next';

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { oathProvider, accessToken } = req.body;

  if (!oathProvider || !accessToken) {
    return res.status(400).send('');
  }

  try {
    switch (oathProvider) {
      case OAuthProvider.Anilist:
        const jwtToken = await authService.signInByAnilistAccessToken(
          accessToken
        );
        return res.status(200).send({
          jwtToken,
        });

      default:
        return res.status(400).send('');
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send('');
  }
};

const authController = {
  signIn,
};

export default authController;
