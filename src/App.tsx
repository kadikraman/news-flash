import React from 'react';
import { createClient, Provider as UrqlProvider } from 'urql';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './screens/BottomTabs.navigator';

const client = createClient({
  url:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/graphql'
      : 'http://localhost:3000/graphql',
});

export const App: React.FC = () => {
  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <StatusBar hidden />
        <BottomTabNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};
