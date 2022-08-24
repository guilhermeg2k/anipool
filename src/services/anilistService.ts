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

const getMediaById = async (id: number) => {
  const query = gql`
    query getMedias($id: Int!) {
      Media(id: $id) {
        id
        type
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
      }
    }
  `;

  const queryResult = await graphqlClient.request(query, {
    id,
  });

  return queryResult.Media as Anilist.Media;
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
          type
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

  return queryResult.Page.media as Array<Anilist.Media>;
};

const listCharacterBySearch = async (
  searchText: string,
  page = 1,
  pageSize = 10
) => {
  const query = gql`
    query getMedias($searchText: String!, $page: Int!, $pageSize: Int!) {
      Page(page: $page, perPage: $pageSize) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        characters(search: $searchText) {
          id
          name {
            full
            native
            alternative
          }
          image {
            large
            medium
          }
        }
      }
    }
  `;

  const queryResult = await graphqlClient.request(query, {
    searchText,
    page,
    pageSize,
  });

  return queryResult.Page.characters as Array<Anilist.Character>;
};

const anilistService = {
  getUserByAccessToken,
  getMediaById,
  listMediaBySearchAndType,
  listCharacterBySearch,
};

export default anilistService;
