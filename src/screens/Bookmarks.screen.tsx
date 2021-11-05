import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { gql } from 'urql';
import { StorySummaryFields } from '../graphql/fragments';
import { useQuery } from 'urql';
import {
  AllBookmarksQuery,
  AllBookmarksQueryVariables,
} from '../graphql/__generated__/operationTypes';
import { Story } from '../components/Story';

const BOOKMARKS_QUERY = gql`
  query AllBookmarks {
    bookmarks {
      id
      story {
        ...StorySummaryFields
      }
    }
  }

  ${StorySummaryFields}
`;

export const BookmarksScreen: React.FC = () => {
  const [{ data, error, fetching }] = useQuery<
    AllBookmarksQuery,
    AllBookmarksQueryVariables
  >({
    query: BOOKMARKS_QUERY,
  });

  if (fetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="grey" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      style={styles.flatList}
      data={data?.bookmarks}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <Story item={item.story} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flatList: {
    paddingHorizontal: 20,
  },
  flatListContainer: {
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 40,
  },
});
