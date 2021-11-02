import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabs.navigator';
import { StoryDetailsModal } from './StoryDetailsModal.screen';
import { RootStackParamList } from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="StoryDetailsModal"
        component={StoryDetailsModal}
        options={({ route }) => ({
          presentation: 'modal',
          title: route.params.title,
        })}
      />
    </RootStack.Navigator>
  );
};
