import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BookmarksScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmarks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
