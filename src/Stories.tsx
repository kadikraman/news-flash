import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { gql, useQuery } from 'urql';

const STORIES_QUERY = gql`
  query AllStories {
    stories {
      id
      title
      author
      summary
    }
  }
`;

export const Stories: React.FC = () => {
  const [{ data, error, fetching }] = useQuery({ query: STORIES_QUERY });

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
      data={data.stories}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 20,
  },
  flatListContainer: {
    paddingTop: 100, // temporary
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 40,
  },
});
