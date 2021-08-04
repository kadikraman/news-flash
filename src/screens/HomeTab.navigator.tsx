import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Stories } from './Stories.screen';
import { StoryDetails } from './StoryDetails.screen';
import { HomeStackParamList } from '~src/types';

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeTabNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator initialRouteName="Stories">
      <HomeStack.Screen
        name="Stories"
        component={Stories}
        options={{ title: 'Latest News' }}
      />
      <HomeStack.Screen
        name="StoryDetails"
        component={StoryDetails}
        options={({ route }) => ({ title: route.params.title })}
      />
    </HomeStack.Navigator>
  );
};
