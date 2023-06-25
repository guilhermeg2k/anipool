import graphqlClient from '@libs/graphql';
import { gql } from 'graphql-request';
import { OptionType } from 'src/enums';

const getUser = async ({ accessToken }: Anilist.Credencials) => {
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

const getMediasByIds = async (ids: Array<number>) => {
  let page = 1;
  let hasNextPage = true;
  const medias: Anilist.Media[] = [];

  const paginatedRequest = async (ids: Array<number>, page: number) => {
    const query = gql`
      query getMedias($ids: [Int]!, $page: Int!) {
        Page(page: $page, perPage: 50) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(id_in: $ids) {
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
      }
    `;
    const queryResult = await graphqlClient.request(query, {
      ids,
      page,
    });

    return queryResult.Page;
  };

  while (hasNextPage) {
    const queryResult = await paginatedRequest(ids, page);
    medias.push(...(queryResult.media as Array<Anilist.Media>));
    page++;
    hasNextPage = queryResult.pageInfo.hasNextPage;
  }

  return medias;
};

const getCharactersByIds = async (ids: Array<number>) => {
  const query = gql`
    query getCharacters($ids: [Int]!, $size: Int!) {
      Page(page: 1, perPage: $size) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        characters(id_in: $ids) {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
        }
      }
    }
  `;
  const size = ids.length;

  const queryResult = await graphqlClient.request(query, {
    ids,
    size,
  });

  return queryResult.Page.characters as Array<Anilist.Character>;
};

const listMediaBySearchAndType = async (
  searchText: string,
  type: OptionType,
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
  getUser,
  getMediasByIds,
  getCharactersByIds,
  listMediaBySearchAndType,
  listCharacterBySearch,
};

export default anilistService;
