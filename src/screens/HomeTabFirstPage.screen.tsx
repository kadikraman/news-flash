import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'urql';
import { FlatList } from 'react-native-gesture-handler';

const StoriesQuery = `
  query {
    stories {
      id
      title
      summary
      author
    }
  }
`;

export const HomeTabFirstPage = () => {
  const [result] = useQuery({
    query: StoriesQuery,
  });

  if (result.fetching) {
    return <Text>Loading...</Text>;
  }

  if (result.error) {
    return <Text>Error: {result.error.message}</Text>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
          <Pressable style={styles.readMore}>
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
