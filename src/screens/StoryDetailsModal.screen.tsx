import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/core';
import { RootStackParamList } from '../types';
import { useQuery, gql } from 'urql';
import {
  StoryByIdQuery,
  StoryByIdQueryVariables,
} from '../graphql/__generated__/operationTypes';

const STORY_BY_ID = gql`
  query StoryById($id: ID!) {
    story(id: $id) {
      id
      title
      author
      summary
      text
    }
  }
`;

export const StoryDetailsModal: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryDetailsModal'>>();
  const [{ data, fetching, error }] = useQuery<
    StoryByIdQuery,
    StoryByIdQueryVariables
  >({
    query: STORY_BY_ID,
    variables: { id: route.params.id },
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

  if (!data?.story) {
    return (
      <View style={styles.container}>
        <Text>Story not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.author}>by {data.story.author}</Text>
      <Text style={styles.summary}>{data.story.summary}</Text>
      <Text style={styles.text}>{data.story.text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  scrollView: {
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
    lineHeight: 25,
    textAlign: 'justify',
  },
});
