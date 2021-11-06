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
} from './graphql/__generated__/operationTypes';
import { BOOKMARKS_QUERY } from './screens/Bookmarks.screen';

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
        },
      },
    }),
    fetchExchange,
  ],
});

export const App: React.FC = () => {
  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <StatusBar hidden />
        <RootNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};
