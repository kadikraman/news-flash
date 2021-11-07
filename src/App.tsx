import React from 'react';
import {
  createClient,
  Provider as UrqlProvider,
  dedupExchange,
  fetchExchange,
} from 'urql';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './screens/Root.navigator';
import { cacheExchange } from '@urql/exchange-graphcache';
import schema from './graphql/graphql.schema.json';
import {
  AddBookmarkMutation,
  AllBookmarksQuery,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
} from './graphql/__generated__/operationTypes';
import { BOOKMARKS_QUERY } from './screens/Bookmarks.screen';
import { gql } from 'urql';
import { useNetInfo } from '@react-native-community/netinfo';
import { AppOfflinePage } from './components/AppOfflinePage';

/**
 * There are 3 levels of offline support:
 *
 * 0 - no support <-- everyone starts with this
 * 1 - blocking notification <-- we will add this
 * 2 - read-only offline support <-- we will add this
 * 3 - read-write offline support <-- not needed for most apps
 */

const client = createClient({
  url:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/graphql'
      : 'http://localhost:3000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      schema: schema as any,
      resolvers: {
        Query: {
          story: (_, args) => ({ __typename: 'Story', id: args.id }),
        },
      },
      updates: {
        Mutation: {
          addBookmark: (result: AddBookmarkMutation, args, cache) => {
            if (result.addBookmark) {
              cache.updateQuery(
                { query: BOOKMARKS_QUERY },
                (data: AllBookmarksQuery | null) => {
                  if (data && data.bookmarks && result.addBookmark) {
                    data.bookmarks.push(result.addBookmark);
                  }
                  return data;
                },
              );
            }
          },
          removeBookmark: (
            result: RemoveBookmarkMutation,
            args: RemoveBookmarkMutationVariables,
            cache,
          ) => {
            if (result.removeBookmark) {
              let storyId = null;

              cache.updateQuery(
                { query: BOOKMARKS_QUERY },
                (data: AllBookmarksQuery | null) => {
                  if (data?.bookmarks) {
                    storyId = data.bookmarks.find(
                      item => item.id === args.bookmarkId,
                    )?.story.id;
                    data.bookmarks = data.bookmarks.filter(
                      item => item.id !== args.bookmarkId,
                    );
                  }

                  return data;
                },
              );

              if (storyId) {
                const fragment = gql`
                  fragment _ on Story {
                    id
                    bookmarkId
                  }
                `;
                cache.writeFragment(fragment, {
                  id: storyId,
                  bookmarkId: null,
                });
              }
            }
          },
        },
      },
    }),
    fetchExchange,
  ],
});

export const App: React.FC = () => {
  const { isConnected } = useNetInfo();

  if (isConnected === false) {
    return <AppOfflinePage />;
  }

  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <StatusBar hidden />
        <RootNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};
