import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';

export const OfflineMessage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isInternetReachable, setIsInternetReachable] =
    React.useState<boolean | null>(false);

  const bottomInset = insets.bottom / 2;

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isInternetReachable) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: 10 + bottomInset,
          marginTop: -bottomInset,
        },
      ]}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
