import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const OfflineMessage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isInternetReachable, setIsInternetReachable] =
    React.useState<boolean | null>(null);

  const bottomInset = insets.bottom / 2;
  const sharedValue = useSharedValue(0);

  const open = React.useCallback(() => {
    sharedValue.value = withTiming(100);
  }, [sharedValue]);

  const close = React.useCallback(() => {
    sharedValue.value = withTiming(0);
  }, [sharedValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: sharedValue.value,
    marginTop: interpolate(sharedValue.value, [0, 100], [0, -bottomInset]),
  }));

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetReachable(state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (isInternetReachable === true) {
      close();
    }

    if (isInternetReachable === false) {
      open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternetReachable]);

  return (
    <Reanimated.View
      style={[
        styles.container,
        { paddingBottom: 10 + bottomInset },
        animatedStyle,
      ]}>
      <Text style={styles.text}>You are offline</Text>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
