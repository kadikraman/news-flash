import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppOfflineMessage: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom, marginTop: -insets.bottom / 2 },
      ]}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    color: 'white',
  },
});
