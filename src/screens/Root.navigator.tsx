import React from 'react';
import { Platform } from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { RootStackParamList } from '~src/types';
import { StoryDetailsModal } from './StoryDetailsModal.screen';
import { BottomTabsNavigator } from './BottomTabs.navigator';
import { StackNavigationOptions } from '@react-navigation/stack';

const RootStack = createStackNavigator<RootStackParamList>();

const modalScreenOptions: Partial<StackNavigationOptions> = {
  gestureDirection: 'vertical',
  gestureEnabled: true,
  cardOverlayEnabled: true,
  cardStyleInterpolator: Platform.select({
    ios: CardStyleInterpolators.forModalPresentationIOS,
    android: CardStyleInterpolators.forRevealFromBottomAndroid,
  }),
  headerBackTitleVisible: false,
};

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator initialRouteName="BottomTabs">
      <RootStack.Screen
        name="BottomTabs"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="StoryDetailsModal"
        component={StoryDetailsModal}
        options={({ route }) => ({
          ...modalScreenOptions,
          title: route.params.title,
        })}
      />
    </RootStack.Navigator>
  );
};
