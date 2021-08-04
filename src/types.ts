import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  ExampleModal: undefined;
};

export type BottomTabsParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  OtherTab: undefined;
};

export type HomeStackParamList = {
  Stories: undefined;
  StoryDetails: {
    id: string;
    title: string;
  };
};
