import graphqlClient from '@libs/graphql';
import { gql } from 'graphql-request';
import { MediaTypes } from 'src/enums';

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
  type: MediaTypes,
  page = 1,
  pageSize = 10
) => {
  const query = gql`
    query getMedias(
      $searchText: String!
      $type: MediaType!
      $page: Int!
      $pageSize: Int!
    ) {
      Page(page: $page, perPage: $pageSize) {
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

  const queryResult = await graphqlClient.request(query, {
    searchText,
    type,
    page,
    pageSize,
  });

  const queryPage = queryResult.Page as Anilist.Page;
  return queryPage.media;
};

const anilistService = {
  getUserByAccessToken,
  listMediaBySearchAndType,
};

export default anilistService;
