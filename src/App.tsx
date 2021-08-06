import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './screens/Root.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createClient, Provider as UrqlProvider } from 'urql';

const client = createClient({
  url: 'https://news-flash.hasura.app/v1/graphql',
});

export const App: React.FC = () => {
  return (
    <View style={{ backgroundColor: '#333138', flex: 1 }}>
      <UrqlProvider value={client}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </UrqlProvider>
    </View>
  );
};
