import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { StorySummaryFieldsFragment } from '../graphql/__generated__/operationTypes';

export const Story: React.FC<{ item: StorySummaryFieldsFragment }> = ({
  item,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetailsModal', {
          id: item.id,
          title: item.title,
        })
      }>
      <Text style={styles.title}>{item.title}</Text>
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
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
  },
});
