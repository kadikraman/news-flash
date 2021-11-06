import * as React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { StorySummaryFieldsFragment } from '../graphql/__generated__/operationTypes';
import { gql, useMutation } from 'urql';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
} from '../graphql/__generated__/operationTypes';
import { StorySummaryFields } from '../graphql/fragments';

const ADD_BOOKMARK_MUTATION = gql`
  mutation AddBookmark($storyId: ID!) {
    addBookmark(storyId: $storyId) {
      id
      story {
        ...StorySummaryFields
      }
    }
  }
  ${StorySummaryFields}
`;

export const Story: React.FC<{ item: StorySummaryFieldsFragment }> = ({
  item,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [{ fetching: isAddingBookmark }, addBookmark] = useMutation<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >(ADD_BOOKMARK_MUTATION);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetailsModal', {
          id: item.id,
          title: item.title,
        })
      }>
      <View style={styles.row}>
        <Text style={styles.title}>
          {item.title} {item.bookmarkId ? '🔖' : ''}
        </Text>
        {!item.bookmarkId && !isAddingBookmark ? (
          <Pressable onPress={() => addBookmark({ storyId: item.id })}>
            <Text>Add Bookmark</Text>
          </Pressable>
        ) : null}
        {isAddingBookmark ? <ActivityIndicator /> : null}
      </View>
      <Text style={styles.summary}>{item.summary}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
  },
  row: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
