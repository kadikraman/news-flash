import { NavigatorScreenParams } from '@react-navigation/core';

export type BottomTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
};

export type RootStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  StoryDetailsModal: { id: string; title: string };
};
