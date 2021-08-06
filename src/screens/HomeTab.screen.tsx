/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useQuery, UseQueryState } from 'urql';
import { useRootNavigation } from '~src/hooks/useTypedNavigation';

const StoriesQuery = `
  query getStories($offset: Int, $limit: Int) {
    stories_aggregate(offset: $offset, limit: $limit) {
      aggregate {
        count
      }
      nodes {
        id
        title
        summary
        author
      }
    }
  }
`;

export const usePagination = (result: UseQueryState<any>) => {
  const prevResult = React.useRef<any>();
  const [items, setItems] = React.useState<Story[]>([]);

  React.useEffect(() => {
    const source = result?.data?.stories_aggregate;
    if (!result.fetching && !result.stale && source) {
      if (
        prevResult.current &&
        prevResult.current.operation &&
        Number((result.operation?.variables as any)?.offset || 0) >
          Number(prevResult.current.operation.variables.offset || 0)
      ) {
        setItems([...items, ...source.nodes]);
      } else if (source) {
        setItems(source.nodes);
      }
      prevResult.current = result;
    }
  }, [result]);

  return items;
};

type Story = {
  id: number;
  title: string;
  summary: string;
  author: string;
};

const PAGE_SIZE = 2;

export const HomeTab = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [result, refreshStories] = useQuery({
    query: StoriesQuery,
    variables: {
      offset,
      limit: PAGE_SIZE,
    },
    requestPolicy: isRefreshing ? 'network-only' : 'cache-and-network',
  });

  const stories = usePagination(result);

  const navigation = useRootNavigation();

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setOffset(0);
  }, [refreshStories]);

  const onLoadMore = React.useCallback(() => {
    if (isLoadingMore) {
      return;
    }
    setIsLoadingMore(true);
    setOffset(val => val + PAGE_SIZE);
  }, [refreshStories, isLoadingMore]);

  React.useEffect(() => {
    setOffset(0);
  }, []);

  React.useEffect(() => {
    if (!result.fetching) {
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  }, [result]);

  if (result.fetching && !isRefreshing && !stories.length) {
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
      ListFooterComponent={() =>
        isLoadingMore ? (
          <ActivityIndicator />
        ) : (
          <Pressable onPress={onLoadMore} style={{ alignSelf: 'center' }}>
            <Text>Load More</Text>
          </Pressable>
        )
      }
      data={stories}
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
    color: '#D81E5B',
  },
});
