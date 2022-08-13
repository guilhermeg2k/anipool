import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import userService from '@backend/service/userService';

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.cookies;
    if (id) {
      const user = await userService.get(id);
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send('');
  }
};

const userController = {
  getCurrentUser,
};

export default userController;
