import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text>Hello, world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
