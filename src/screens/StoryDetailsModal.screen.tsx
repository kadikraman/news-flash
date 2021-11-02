import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StoryDetailsModal: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Story Details</Text>
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
