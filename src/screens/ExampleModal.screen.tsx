import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

import { useQuery } from 'urql';
import { RootStackParamList } from '~src/types';

const Story = `
  query getStory($id: Int!) {
    stories_by_pk(id: $id) {
      id
      author
      summary
      text
      title
    }
  }
`;

export const StoryDetailsModal: React.FC<{
  route: RouteProp<RootStackParamList, 'StoryDetailsModal'>;
}> = ({ route }) => {
  const [result] = useQuery({
    query: Story,
    variables: {
      id: route.params.id,
    },
  });

  if (result.fetching) {
    return <Text>Loading...</Text>;
  }

  if (result.error) {
    return <Text>Error: {result.error.message}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{result.data.stories_by_pk.title}</Text>
      <Text style={styles.author}>by {result.data.stories_by_pk.author}</Text>
      <Text style={styles.summary}>by {result.data.stories_by_pk.summary}</Text>
      <Text style={styles.text}>by {result.data.stories_by_pk.text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  container: {
    padding: 20,
  },
  author: {
    fontStyle: 'italic',
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 25,
    textAlign: 'justify',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 25,
    textAlign: 'justify',
  },
});
