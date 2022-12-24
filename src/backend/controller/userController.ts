import userService from '@backend/service/userService';
import { getTokenPayload } from '@utils/authUtils';
import { NextApiRequest, NextApiResponse } from 'next';

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userToken } = req.cookies;
    const { id } = await getTokenPayload(String(userToken));
    const user = await userService.get(id);
    if (!user) {
      return res.status(400).send('');
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send('');
  }
};

const userController = {
  getCurrentUser,
};

export default userController;
