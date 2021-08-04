import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './screens/Root.navigator';

import { createClient, Provider as UrqlProvider } from 'urql';

const client = createClient({
  url: 'https://news-flash.hasura.app/v1/graphql',
});

export const App: React.FC = () => {
  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};
