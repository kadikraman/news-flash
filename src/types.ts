import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabsParamList>;
  StoryDetailsModal: {
    id: string;
    title: string;
  };
};

export type BottomTabsParamList = {
  HomeTab: undefined;
  BookmarkTab: undefined;
};
