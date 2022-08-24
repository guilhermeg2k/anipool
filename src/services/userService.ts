import axiosClient from '@libs/axios';

const getCurrentUser = async () => {
  const response = await axiosClient.get<User>('/user/me');
  const user = response.data;
  return user;
};

const userService = {
  getCurrentUser,
};

export default userService;
