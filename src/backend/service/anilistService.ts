import { gql } from 'graphql-request';
import graphqlClient from '@backend/libs/graphql';
import { AnilistUser } from '../types';

const getUserByAccessToken = async (accessToken: string) => {
  const query = gql`
    {
      Viewer {
        id
        name
        avatar {
          large
          medium
        }
      }
    }
  `;

  const { Viewer } = await graphqlClient.request(
    query,
    {},
    {
      authorization: `Bearer ${accessToken}`,
    }
  );

  return Viewer as AnilistUser;
};

const anilistService = {
  getUserByAccessToken,
};

export default anilistService;
