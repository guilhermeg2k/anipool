import userService from '@backend/service/userService';
import { getTokenPayload } from '@utils/authUtils';
import { NextApiRequest, NextApiResponse } from 'next';

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userToken } = req.cookies;
    const { id } = await getTokenPayload(String(userToken));

    if (id) {
      const user = await userService.get(id);
      return res.status(200).send(user);
    }
    return res.status(204).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const userController = {
  getCurrentUser,
};

export default userController;
