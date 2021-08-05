import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useQuery } from 'urql';
import { useRootNavigation } from '~src/hooks/useTypedNavigation';

const StoriesQuery = `
  query getStories {
    stories {
      id
      title
      summary
      author
    }
  }
`;

export const HomeTab = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [result, refreshStories] = useQuery({
    query: StoriesQuery,
  });

  const navigation = useRootNavigation();

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    refreshStories({ requestPolicy: 'network-only' });
  }, [refreshStories]);

  React.useEffect(() => {
    if (!result.fetching) {
      setIsRefreshing(false);
    }
  }, [result.fetching]);

  if (result.fetching && !isRefreshing) {
    return <Text>Loading...</Text>;
  }

  if (result.error) {
    return <Text>Error: {result.error.message}</Text>;
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
          <Pressable
            style={styles.readMore}
            onPress={() =>
              navigation.navigate('StoryDetailsModal', {
                id: item.id,
                title: item.title,
              })
            }>
            <Text style={styles.readMoreText}>Read More</Text>
          </Pressable>
        </View>
      )}
      data={result.data.stories}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  readMore: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  readMoreText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#6F2DBD',
  },
});
