import { gql } from 'graphql-request';
import graphqlClient from '@libs/graphql';

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

  return Viewer as Anilist.User;
};

const listMediaBySearchAndType = async (
  searchText: string,
  type: MediaTypes
) => {
  const query = gql`
    {
      Page(page: 1, perPage: 10) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(search: $searchText, type: $type) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          episodes
          format
        }
      }
    }
  `;

  const queryResult = await graphqlClient.request(query, { searchText, type });
  if (queryResult.Page && queryResult.Page.media) {
    const queryPage = queryResult.Page as Anilist.Page;
    return queryPage.media;
  }
  return null;
};

const anilistService = {
  getUserByAccessToken,
  listMediaBySearchAndType,
};

export default anilistService;
